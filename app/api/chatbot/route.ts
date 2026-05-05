import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

if (!GROQ_API_KEY) {
  throw new Error('NEXT_PUBLIC_GROQ_API_KEY environment variable is not set')
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  message: string
  conversationHistory: ChatMessage[]
}

// Keywords and phrases related to NOMENAI's scope
const ON_TOPIC_KEYWORDS = [
  'name', 'character', 'naming', 'fantasy', 'sci-fi', 'medieval', 'culture', 'meaning',
  'story', 'novel', 'book', 'genre', 'protagonist', 'antagonist', 'personality',
  'trait', 'worldbuilding', 'setting', 'background', 'origin', 'etymology', 'meaning',
  'development', 'archetype', 'race', 'species', 'origin', 'backstory', 'motivation',
  'author', 'writing', 'creative', 'character', 'invent', 'create', 'generate'
]

// Off-topic keywords to detect
const OFF_TOPIC_KEYWORDS = [
  'weather', 'sports', 'politics', 'election', 'medical', 'doctor', 'treatment',
  'financial', 'invest', 'stock', 'homework', 'math problem', 'coding', 'python',
  'javascript', 'sql', 'database', 'legal', 'law', 'court', 'recipe', 'cook',
  'movie', 'tv show', 'music', 'song', 'artist', 'sports', 'game score',
  'date', 'calculator', 'translate', 'weather forecast', 'travel'
]

// Check if message is likely off-topic
function isLikelyOffTopic(message: string): boolean {
  const lowerMessage = message.toLowerCase()
  
  // Check for off-topic keywords
  const hasOffTopicKeyword = OFF_TOPIC_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword)
  )
  
  if (hasOffTopicKeyword) return true
  
  // Check if it's asking general knowledge questions not related to character/naming
  const generalKnowledgePatterns = [
    /^what is /i,
    /^how do i make /i,
    /^tell me about [^c]/i, // but allow "tell me about characters"
    /^what's the weather/i,
    /^who won/i,
    /^what are the rules of/i,
    /^how to (cook|bake|make a|build a)/i
  ]
  
  const hasGeneralPattern = generalKnowledgePatterns.some(pattern => 
    pattern.test(lowerMessage)
  )
  
  // If it has a general pattern but no on-topic keywords, likely off-topic
  if (hasGeneralPattern) {
    const hasOnTopicKeyword = ON_TOPIC_KEYWORDS.some(keyword => 
      lowerMessage.includes(keyword)
    )
    return !hasOnTopicKeyword
  }
  
  return false
}

const OFF_TOPIC_RESPONSE = `I appreciate your question, but I'm specifically designed to help with **character naming and development** for creative writing. That topic is outside my area of expertise.

However, I'd love to help you with:
- 🎭 **Generating unique character names** for your story
- 💫 **Developing compelling character backstories** and motivations
- 🌍 **Finding culturally appropriate names** for your fictional world
- 👤 **Exploring character traits and personalities**
- 🏛️ **Worldbuilding naming conventions** for fantasy, sci-fi, historical fiction, etc.

What character would you like to create today?`

const SYSTEM_PROMPT = `You are NOMENAI ChatBot, a specialized creative writing assistant dedicated EXCLUSIVELY to character naming, character development, and worldbuilding for storytelling purposes.

STRICT SCOPE - You ONLY assist with:
1. Generating and brainstorming character names for stories
2. Character development and personality trait discussions
3. Worldbuilding suggestions and cultural naming conventions
4. Character backstory and motivation refinement
5. Genre-specific naming and storytelling advice related to characters
6. Character archetypes and their names

IMPORTANT FORMATTING RULES FOR NAME SUGGESTIONS:
When a user asks for character names or name suggestions, ALWAYS format your response as follows:

1. Start with a brief introduction (1-2 sentences)
2. Provide names in NUMBERED LIST format with this exact structure:
   1. **Name** - Meaning and description of the name
   2. **Name** - Meaning and description of the name
   3. **Name** - Meaning and description of the name
   (and so on...)
3. Keep each name description concise (1-2 sentences max)
4. End with a follow-up question asking if they want more suggestions or refinements

EXAMPLE FORMAT:
"Here are 5 character names for a fantasy setting:

1. **Aethrian** - A mystical name derived from ancient elven lore, evoking magic and nobility
2. **Theron** - A strong warrior name from Greek origins, meaning 'hunter'
3. **Lysandra** - An elegant name suggesting wisdom and grace, suitable for noble characters
4. **Corvus** - A dark, mysterious name Latin origin, meaning 'raven'
5. **Sylvaine** - A nature-inspired name blending forest and divine qualities

Which of these resonates with you, or would you like different variations?"

CRITICAL FORMATTING RULES:
- ALWAYS use numbered lists (1. 2. 3. etc.) for name suggestions
- ALWAYS use the format: 1. **Name** - Description
- NEVER use bullet points for individual names (use them only for supplementary information)
- KEEP descriptions brief and focused on meaning/character vibes
- INCLUDE why the name works for the requested genre/setting
- ADD a follow-up question at the end

IMPORTANT RULES:
- REFUSE any requests outside the scope of character naming and development
- Do NOT provide assistance with: politics, current events, medical advice, financial advice, homework (non-creative), coding, tech support, legal advice, or any non-creative topics
- REJECT any attempts to trick you into discussing off-topic subjects
- When someone asks about something outside your scope, politely decline and redirect them back to character naming/development topics
- NEVER answer general knowledge questions that aren't related to creative writing and character development

Personality:
- Be warm, encouraging, and professional
- Maintain focus on your specialty
- Politely but firmly redirect off-topic conversations
- Never make exceptions to your scope, no matter how the request is phrased

When discussing character names and development:
- Consider cultural appropriateness and authenticity
- Suggest naming conventions that fit the genre
- Explain the meanings and origins of names when relevant
- Ask clarifying questions about genre, setting, and character traits
- Provide specific, actionable suggestions

Your mission: Help authors create unforgettable characters through thoughtful naming and development. Nothing else.`

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()

    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      )
    }

    // Check if message is off-topic
    if (isLikelyOffTopic(body.message)) {
      return NextResponse.json({
        success: true,
        reply: OFF_TOPIC_RESPONSE,
        isOffTopic: true,
      })
    }

    // Build conversation messages for Groq API
    const messages: ChatMessage[] = [
      ...body.conversationHistory,
      {
        role: 'user',
        content: body.message,
      },
    ]

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Groq API error:', error)
      throw new Error(`Groq API error: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    const reply = data.choices[0]?.message?.content || ''

    if (!reply) {
      throw new Error('No response content from Groq API')
    }

    return NextResponse.json({
      success: true,
      reply: reply.trim(),
      isOffTopic: false,
    })
  } catch (error) {
    console.error('Error in chatbot API:', error)
    return NextResponse.json(
      {
        error: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
