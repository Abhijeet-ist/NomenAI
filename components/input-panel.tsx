'use client'

import React, { useState } from 'react'
import { Plus, X, ChevronDown, User, BookOpen } from 'lucide-react'

/* ── SelectWithIcon ──────────────────────────────────────── */
function SelectWithIcon({
  value,
  onChange,
  options,
  icon,
  id,
}: {
  value: string
  onChange: (v: string) => void
  options: { label: string; value: string }[]
  icon?: React.ReactNode
  id?: string
}) {
  return (
    <div className="relative flex items-center">
      {icon && (
        <span
          className="absolute left-3 pointer-events-none flex items-center z-10"
          style={{ color: 'var(--primary-purple)' }}
        >
          {icon}
        </span>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none cursor-pointer focus:outline-none transition-colors duration-150"
        style={{
          background: 'var(--input-bg)',
          border: '1px solid var(--border-medium)',
          borderRadius: '8px',
          color: 'var(--text-primary)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          padding: icon ? '8px 28px 8px 30px' : '8px 28px 8px 12px',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary-purple)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ background: 'var(--input-bg)' }}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 pointer-events-none"
        style={{ color: 'var(--text-secondary)' }}
      />
    </div>
  )
}

/* ── Icons ─────────────────────────────────────────────── */
const GenreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.5 5.5L7 3L9.5 5.5M4.5 8.5L7 11L9.5 8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

const CultureIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1 7h12M7 1c-2 2-2 8 0 12M7 1c2 2 2 8 0 12" stroke="currentColor" strokeWidth="1.25" />
  </svg>
)

const LeafIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 12C2 12 4 10 7 10C10 10 12 8 12 5C12 2 9 1 7 1C4 1 2 4 4 7C5 9 2 12 2 12Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2 12L7 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

const WaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1 7h2l1.5-4L7 11l2-7 1.5 3H13"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const BookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 2C2 1.44772 2.44772 1 3 1H11C11.5523 1 12 1.44772 12 2V12C12 12.5523 11.5523 13 11 13H3C2.44772 13 2 12.5523 2 12V2Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2 3H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M5 5H9M5 7H9M5 9H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

/* ── SectionHeader ──────────────────────────────────────── */
function SectionHeader({
  num,
  title,
  subtitle,
  active,
}: {
  num: number
  title: string
  subtitle: string
  active?: boolean
}) {
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--text-label)',
    letterSpacing: '0.01em',
  }

  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold shadow-md"
          style={{
            background: active ? 'linear-gradient(135deg, #2F4550 0%, #44627E 100%)' : 'var(--hover-bg)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            color: active ? '#F4F4F9' : 'var(--text-secondary)',
            boxShadow: active ? '0 4px 12px rgba(47, 69, 80, 0.35)' : 'none',
          }}
        >
          {num}
        </div>
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h2>
      </div>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          paddingLeft: '40px',
          lineHeight: '1.4',
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}

/* ── InputPanel ─────────────────────────────────────────── */
export function InputPanel({
  onGenerate,
  isLoading,
}: {
  onGenerate: (formData: {
    genre: string
    traits: string[]
    culture: string
    gender: string
    tone: string
    bookName: string
    nameStyle: string
    numberOfNames: number
  }) => Promise<void>
  isLoading: boolean
}) {
  const [traits, setTraits] = useState<string[]>(['Ruthless', 'Intelligent', 'Mysterious'])
  const [newTrait, setNewTrait] = useState('')
  const [genre, setGenre] = useState('dark-fantasy')
  const [culture, setCulture] = useState('indian-persian')
  const [gender, setGender] = useState('male')
  const [bookName, setBookName] = useState('')
  const [tone, setTone] = useState('dark-powerful')
  const [nameStyle, setNameStyle] = useState('ancient-mythical')
  const [numberOfNames, setNumberOfNames] = useState(10)

  const addTrait = () => {
    const t = newTrait.trim()
    if (t && !traits.includes(t)) {
      setTraits([...traits, t])
      setNewTrait('')
    }
  }
  const removeTrait = (trait: string) => setTraits(traits.filter((t) => t !== trait))

  const handleGenerateClick = async () => {
    await onGenerate({
      genre,
      traits,
      culture,
      gender,
      tone,
      bookName,
      nameStyle,
      numberOfNames,
    })
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--text-label)',
    marginBottom: '6px',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '0.01em',
  }

  const GENRES = [
    { value: 'dark-fantasy', label: 'Dark Fantasy' },
    { value: 'high-fantasy', label: 'High Fantasy' },
    { value: 'sci-fi', label: 'Science Fiction' },
    { value: 'urban-fantasy', label: 'Urban Fantasy' },
    { value: 'horror', label: 'Horror' },
    { value: 'historical', label: 'Historical' },
  ]

  const CULTURES = [
    { value: 'indian-persian', label: 'Indian + Persian' },
    { value: 'nordic', label: 'Nordic' },
    { value: 'celtic', label: 'Celtic' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'greek', label: 'Greek' },
    { value: 'arabic', label: 'Arabic' },
  ]

  const TONES = [
    { value: 'dark-powerful', label: 'Dark & Powerful' },
    { value: 'heroic-noble', label: 'Heroic & Noble' },
    { value: 'mysterious', label: 'Mysterious' },
    { value: 'romantic', label: 'Romantic' },
  ]

  const GENDERS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'neutral', label: 'Neutral' },
  ]

  const NAME_STYLES = [
    { value: 'ancient-mythical', label: 'Ancient & Mythical' },
    { value: 'modern-edgy', label: 'Modern & Edgy' },
    { value: 'romantic-lyrical', label: 'Romantic & Lyrical' },
    { value: 'short-punchy', label: 'Short & Punchy' },
  ]

  return (
    <div
      id="input-panel"
      className="flex flex-col overflow-y-auto shrink-0"
      style={{
        width: '400px',
        background: 'var(--surface-primary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '24px',
      }}
    >
      {/* ── SECTION 1 ─────────────────────────────────── */}
      <SectionHeader
        num={1}
        title="Tell us about your character"
        subtitle="The more details you provide, the better we generate."
        active
      />

      {/* Genre */}
      <div className="mb-4">
        <label htmlFor="genre-select" style={labelStyle}>Genre</label>
        <SelectWithIcon
          id="genre-select"
          value={genre}
          onChange={setGenre}
          options={GENRES}
          icon={<GenreIcon />}
        />
      </div>

      {/* Traits */}
      <div className="mb-4">
        <label style={labelStyle}>Traits / Personality</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {traits.map((trait) => (
            <div
              key={trait}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-200"
              style={{
                background: 'var(--surface-primary)',
                border: '2px solid var(--primary-purple)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-tag)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            >
              {trait}
              <button
                onClick={() => removeTrait(trait)}
                className="flex items-center transition-opacity hover:opacity-70"
                style={{ color: 'var(--text-secondary)', lineHeight: 1, fontSize: '14px' }}
                aria-label={`Remove ${trait}`}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => setNewTrait('')}
            className="flex items-center gap-1 px-3 py-2 rounded-full transition-all hover:opacity-80"
            style={{
              background: 'transparent',
              border: '1.5px dashed var(--border-medium)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <Plus size={12} />
            <span>Add</span>
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTrait}
            onChange={(e) => setNewTrait(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTrait()}
            placeholder="Type a trait and press Enter…"
            id="trait-input"
            className="flex-1 focus:outline-none transition-colors duration-150"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--border-medium)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              padding: '7px 12px',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary-purple)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
          />
          <button
            onClick={addTrait}
            id="add-trait-btn"
            className="flex items-center justify-center rounded-lg transition-colors hover:opacity-90"
            style={{
              width: '34px',
              background: 'var(--primary-purple)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
            aria-label="Add trait"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* Cultural Influence */}
      <div className="mb-4">
        <label htmlFor="culture-select" style={labelStyle}>Cultural Influence</label>
        <SelectWithIcon
          id="culture-select"
          value={culture}
          onChange={setCulture}
          options={CULTURES}
          icon={<CultureIcon />}
        />
      </div>

      {/* Gender + Tone */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <label htmlFor="gender-select" style={labelStyle}>Gender (Optional)</label>
          <SelectWithIcon
            id="gender-select"
            value={gender}
            onChange={setGender}
            options={GENDERS}
            icon={<User size={14} />}
          />
        </div>
        <div>
          <label htmlFor="tone-select" style={labelStyle}>Tone</label>
          <SelectWithIcon
            id="tone-select"
            value={tone}
            onChange={setTone}
            options={TONES}
            icon={<WaveIcon />}
          />
        </div>
      </div>

      {/* Book Name Field */}
      <div className="mb-5">
        <label htmlFor="book-name-input" style={labelStyle}>Book Name (Optional)</label>
        <div className="relative flex items-center">
          <span
            className="absolute left-3 pointer-events-none flex items-center"
            style={{ color: 'var(--primary-purple)' }}
          >
            <BookOpen size={14} />
          </span>
          <input
            id="book-name-input"
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Enter your book title…"
            className="w-full focus:outline-none transition-colors duration-150"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--border-medium)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              padding: '8px 28px 8px 30px',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary-purple)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
          />
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', marginBottom: '20px' }} />

      {/* ── SECTION 2 ─────────────────────────────────── */}
      <SectionHeader
        num={2}
        title="Advanced Preferences"
        subtitle="Fine-tune the style and output."
      />

      {/* Name Style + Number of Names — 2-col grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label htmlFor="name-style-select" style={labelStyle}>Name Style</label>
          <SelectWithIcon
            id="name-style-select"
            value={nameStyle}
            onChange={setNameStyle}
            options={NAME_STYLES}
            icon={<LeafIcon />}
          />
        </div>
        <div>
          <label style={labelStyle}>Number of Names</label>
          <div
            className="flex items-center"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--border-medium)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <button
              id="dec-names-btn"
              onClick={() => setNumberOfNames(Math.max(1, numberOfNames - 1))}
              className="flex items-center justify-center transition-colors hover:opacity-70"
              style={{
                width: '32px',
                height: '36px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 300,
                flexShrink: 0,
              }}
            >
              −
            </button>
            <input
              id="num-names-input"
              type="number"
              value={numberOfNames}
              onChange={(e) => setNumberOfNames(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 text-center focus:outline-none"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                padding: 0,
                minWidth: 0,
              }}
            />
            <button
              id="inc-names-btn"
              onClick={() => setNumberOfNames(Math.min(50, numberOfNames + 1))}
              className="flex items-center justify-center transition-colors hover:opacity-70"
              style={{
                width: '32px',
                height: '36px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 300,
                flexShrink: 0,
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* ── Generate Names CTA ─────────────────────────── */}
      <button
        id="generate-names-btn"
        onClick={handleGenerateClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 rounded-xl transition-all duration-150 hover:opacity-95 hover:shadow-xl active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          padding: '13px',
          background: 'linear-gradient(90deg, #2F4550 0%, #3A5562 50%, #44626E 100%)',
          border: 'none',
          color: '#F4F4F9',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          boxShadow: '0 6px 24px rgba(47, 69, 80, 0.35)',
          letterSpacing: '0.01em',
        }}
      >
        {isLoading ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" strokeOpacity="0.2" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5"
              />
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
                fill="white"
                fillOpacity="0.95"
              />
            </svg>
            Generate Names
          </>
        )}
      </button>
    </div>
  )
}
