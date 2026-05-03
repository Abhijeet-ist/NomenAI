import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

if (!GROQ_API_KEY) {
  throw new Error('NEXT_PUBLIC_GROQ_API_KEY environment variable is not set')
}

interface GenerateNamesRequest {
  genre: string
  traits: string[]
  culture: string
  gender: string
  tone: string
  bookName: string
  nameStyle: string
  numberOfNames: number
}

interface GeneratedName {
  id: string
  name: string
  meaning: string
  description: string
  icon: 'crown' | 'flame' | 'sword' | 'sun' | 'leaf' | 'gem' | 'sparkle' | 'shield'
}

const ICON_OPTIONS: ('crown' | 'flame' | 'sword' | 'sun' | 'leaf' | 'gem' | 'sparkle' | 'shield')[] = [
  'crown',
  'flame',
  'sword',
  'sun',
  'leaf',
  'gem',
  'sparkle',
  'shield',
]

function getRandomIcon() {
  return ICON_OPTIONS[Math.floor(Math.random() * ICON_OPTIONS.length)]
}

async function generateNamesWithGroq(prompt: string, numberOfNames: number): Promise<GeneratedName[]> {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 2048,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Groq API error: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    // Parse the response and extract names
    const names = parseGeneratedNames(content, numberOfNames)
    return names
  } catch (error) {
    console.error('Error calling Groq API:', error)
    throw error
  }
}

function parseGeneratedNames(content: string, numberOfNames: number): GeneratedName[] {
  const lines = content.split('\n').filter((line) => line.trim())
  const names: GeneratedName[] = []

  const stripMarkdown = (value: string) =>
    value
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^\s*[-•]+\s*/g, '')
      .replace(/^"|"$/g, '')
      .trim()

  let nameCount = 0
  for (const line of lines) {
    if (nameCount >= numberOfNames) break

    const cleanedLine = stripMarkdown(line)

    // Prefer explicit "Meaning"/"Description" labels when present.
    const labeledMatch = cleanedLine.match(
      /^(?:\d+\.\s*)?(.+?)\s*-\s*Meaning:\s*(.+?)(?:\s*-\s*Description:\s*(.+))?$/i
    )

    // Fallback to "Name - Meaning" (with optional description)
    const fallbackMatch = cleanedLine.match(/^(?:\d+\.\s*)?(.+?)\s*-\s*(.+)$/)

    const match = labeledMatch || fallbackMatch
    if (match) {
      const rawName = match[1]
      const name = stripMarkdown(rawName)

      let meaning = ''
      let description = ''

      if (labeledMatch) {
        meaning = stripMarkdown(labeledMatch[2] || '')
        description = stripMarkdown(labeledMatch[3] || '')
      } else {
        const meaningAndDesc = stripMarkdown(match[2] || '')
        const meaningDescMatch = meaningAndDesc.match(/^(?:Meaning:\s*)?(.+?)(?:\s*-\s*Description:\s*(.+))?$/i)
        meaning = stripMarkdown(meaningDescMatch ? meaningDescMatch[1] : meaningAndDesc)
        description = stripMarkdown(meaningDescMatch && meaningDescMatch[2] ? meaningDescMatch[2] : '')
      }

      if (name && name.length > 0 && name.length < 50) {
        const safeMeaning = meaning || 'Meaning unavailable'
        const safeDescription = description || `A character of power and mystery with the name ${name}.`
        names.push({
          id: randomUUID(),
          name,
          meaning: safeMeaning,
          description: safeDescription,
          icon: getRandomIcon(),
        })
        nameCount++
      }
    }
  }

  // If we didn't parse enough names, create some default ones based on the content
  if (names.length < numberOfNames) {
    const words = content.match(/\b[A-Z][a-z]+\b/g) || []
    for (let i = names.length; i < numberOfNames && i < words.length; i++) {
      names.push({
        id: randomUUID(),
        name: words[i],
        meaning: 'A name of power',
        description: `A mysterious character bearing the name ${words[i]}.`,
        icon: getRandomIcon(),
      })
    }
  }

  return names
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateNamesRequest = await request.json()

    // Validate request
    if (!body.numberOfNames || body.numberOfNames < 1 || body.numberOfNames > 50) {
      return NextResponse.json({ error: 'Invalid number of names' }, { status: 400 })
    }

    // Build the prompt
    const prompt = buildPrompt(body)

    // Call Groq API
    const generatedNames = await generateNamesWithGroq(prompt, body.numberOfNames)

    return NextResponse.json({
      success: true,
      names: generatedNames,
    })
  } catch (error) {
    console.error('Error in generate-names API:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate names',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

function buildPrompt(body: GenerateNamesRequest): string {
  const traitsList = body.traits.join(', ')
  const bookNameContext = body.bookName ? ` The character names are for a book titled "${body.bookName}".` : ''

  const prompt = `You are a creative name generator for ${body.genre} characters with the following preferences:

**Character Details:**
- Genre: ${body.genre}
- Traits/Personality: ${traitsList}
- Cultural Influence: ${body.culture}
- Gender: ${body.gender}
- Tone: ${body.tone}
- Name Style: ${body.nameStyle}${bookNameContext}

Generate exactly ${body.numberOfNames} unique character names that fit these criteria. For each name, provide:
1. The character name
2. A short meaning or translation (one line)
3. A brief description of the character type (one line)

Format each name like this:
Name - Meaning: [brief meaning] - Description: [brief character description]

Generate creative, memorable names that match the specified tone, culture, and character traits. The names should feel authentic to the cultural influence and appropriate for the genre.`

  return prompt
}
