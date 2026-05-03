'use client'

import React, { useState } from 'react'
import { Bookmark, Copy, Check } from 'lucide-react'

/* ──────────────────────────────────────────────────────── */
/* Data                                                     */
/* ──────────────────────────────────────────────────────── */
type IconKey = 'crown' | 'flame' | 'sword' | 'sun' | 'leaf' | 'gem' | 'sparkle' | 'shield'

interface GeneratedName {
  id: string
  name: string
  meaning: string
  description: string
  icon: IconKey
  bookmarked?: boolean
}

/* ── Coloured circle avatars matching reference image ── */
const AVATAR_CONFIG: Record<IconKey, { bg: string; fg: string; svg: React.ReactNode }> = {
  crown: {
    bg: '#1C1200',
    fg: '#F5A623',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 17L6 8L12 13L18 8L21 17H3Z" stroke="#F5A623" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 20H22" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="3"  cy="8"  r="1.5" fill="#F5A623" />
        <circle cx="12" cy="8"  r="1.5" fill="#F5A623" />
        <circle cx="21" cy="8"  r="1.5" fill="#F5A623" />
      </svg>
    ),
  },
  flame: {
    bg: '#1A0A00',
    fg: '#E8732A',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C12 2 7 8 7 13C7 16.3 9.2 19 12 19C14.8 19 17 16.3 17 13C17 10.5 15 8 15 8C15 8 14.5 10 12 10C9.5 10 9 8 12 2Z"
          stroke="#E8732A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="15" r="2" fill="#E8732A" fillOpacity="0.6" />
      </svg>
    ),
  },
  sword: {
    bg: '#000C1A',
    fg: '#9D7CFF',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 19L19 5M19 5H14M19 5V10" stroke="#9D7CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 19L8 17M5 19L7 16" stroke="#9D7CFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  sun: {
    bg: '#1A1400',
    fg: '#FFDB70',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="#FFDB70" strokeWidth="1.5" />
        <path
          d="M12 3V5M12 19V21M3 12H5M19 12H21M5.64 5.64L7.05 7.05M16.95 16.95L18.36 18.36M5.64 18.36L7.05 16.95M16.95 7.05L18.36 5.64"
          stroke="#FFDB70"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  leaf: {
    bg: '#001A10',
    fg: '#00D4AA',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 19C5 19 7 15 12 15C17 15 19 11 19 7C19 3 15 2 12 2C8 2 5 6 8 10C10 13 5 19 5 19Z"
          stroke="#00D4AA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5 19L12 12" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  gem: {
    bg: '#0D001A',
    fg: '#C084FC',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 3H16L21 9L12 21L3 9L8 3Z" stroke="#C084FC" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 9H21M8 3L12 9L16 3" stroke="#C084FC" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  sparkle: {
    bg: '#001A1A',
    fg: '#67E8F9',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" stroke="#67E8F9" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  shield: {
    bg: '#001010',
    fg: '#34D399',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 7V13C4 17.4 7.4 21.5 12 22C16.6 21.5 20 17.4 20 13V7L12 3Z" stroke="#34D399" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
}

const MOCK_NAMES: GeneratedName[] = [
  {
    id: '1',
    name: 'Zorvath',
    meaning: 'Shadow Emperor',
    description: 'A cunning ruler who thrives in chaos and commands loyalty through fear.',
    icon: 'crown',
    bookmarked: false,
  },
  {
    id: '2',
    name: 'Ardahan',
    meaning: 'Sacred Fire',
    description: 'A brilliant strategist with a burning ambition and an icy exterior.',
    icon: 'flame',
    bookmarked: false,
  },
  {
    id: '3',
    name: 'Vireen Kael',
    meaning: 'Lord of the Veiled Blade',
    description: 'A mysterious assassin whose past is lost in shadows and blood.',
    icon: 'sword',
    bookmarked: false,
  },
  {
    id: '4',
    name: 'Rohitash',
    meaning: 'One who rules the sun',
    description: 'A fallen prince seeking redemption in a world that betrayed him.',
    icon: 'sun',
    bookmarked: false,
  },
  {
    id: '5',
    name: 'Zahrivan',
    meaning: 'King of the Ancient',
    description: 'An ageless sorcerer who whispers to forgotten gods.',
    icon: 'leaf',
    bookmarked: false,
  },
]

/* ──────────────────────────────────────────────────────── */
/* Avatar component                                         */
/* ──────────────────────────────────────────────────────── */
function IconAvatar({ icon }: { icon: IconKey }) {
  const cfg = AVATAR_CONFIG[icon]
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-full"
      style={{
        width: '56px',
        height: '56px',
        background: '#0E0E14',
        border: `1.5px solid ${cfg.fg}33`,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), 0 6px 16px rgba(0,0,0,0.35)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `inset 0 0 0 1px rgba(255,255,255,0.06), 0 10px 24px ${cfg.fg}2E`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.04), 0 6px 16px rgba(0,0,0,0.35)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {cfg.svg}
    </div>
  )
}

/* ──────────────────────────────────────────────────────── */
/* NameCard                                                 */
/* ──────────────────────────────────────────────────────── */
function NameCard({
  data,
  onBookmark,
  onCopy,
  isCopied,
}: {
  data: GeneratedName
  onBookmark: () => void
  onCopy: () => void
  isCopied: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex items-center gap-4 rounded-xl transition-all duration-200 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '16px',
        background: hovered ? 'rgba(255,255,255,0.02)' : 'var(--card-bg)',
        border: `1px solid ${hovered ? 'var(--border-medium)' : 'var(--border-subtle)'}`,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
      }}
    >
      {/* Avatar */}
      <IconAvatar icon={data.icon} />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text-white)',
            marginBottom: '4px',
            letterSpacing: '-0.01em',
          }}
        >
          {data.name}
        </h3>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            marginBottom: '6px',
            fontWeight: 500,
          }}
        >
          Meaning: <span style={{ color: 'var(--text-meaning)' }}>{data.meaning}</span>
        </p>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'var(--text-description)',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.4',
          }}
        >
          {data.description}
        </p>
      </div>

      {/* Actions — always visible */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onBookmark}
          title="Bookmark"
          aria-label="Bookmark"
          className="flex items-center justify-center rounded-lg transition-all duration-200"
          style={{
            width: '32px',
            height: '32px',
            background: 'var(--hover-bg)',
            border: `1px solid ${data.bookmarked ? 'var(--primary-purple)' : 'var(--border-medium)'}`,
            cursor: 'pointer',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          <Bookmark
            size={15}
            strokeWidth={1.75}
            style={{
              color: data.bookmarked ? 'var(--primary-purple)' : 'var(--text-secondary)',
              fill: data.bookmarked ? 'var(--primary-purple)' : 'none',
            }}
          />
        </button>

        <button
          onClick={onCopy}
          title="Copy name"
          aria-label="Copy name"
          className="flex items-center justify-center rounded-lg transition-all duration-200"
          style={{
            width: '32px',
            height: '32px',
            background: 'var(--hover-bg)',
            border: `1px solid ${isCopied ? 'var(--accent-green)' : 'var(--border-medium)'}`,
            cursor: 'pointer',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          {isCopied ? (
            <Check size={16} strokeWidth={2} style={{ color: 'var(--accent-green)' }} />
          ) : (
            <Copy size={16} strokeWidth={1.75} style={{ color: 'var(--text-secondary)' }} />
          )}
        </button>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────── */
/* OutputPanel                                              */
/* ──────────────────────────────────────────────────────── */
interface OutputPanelProps {
  names?: GeneratedName[]
  isLoading?: boolean
  error?: string | null
  onBookmarkToggle?: (id: string) => void
}

export function OutputPanel({ names: propNames = [], isLoading = false, error = null, onBookmarkToggle }: OutputPanelProps) {
  const [names, setNames] = useState<GeneratedName[]>(propNames)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Update local state when prop changes
  React.useEffect(() => {
    setNames(propNames)
  }, [propNames])

  const handleCopy = (id: string, name: string) => {
    navigator.clipboard.writeText(name).catch(() => {})
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleBookmark = (id: string) => {
    setNames((prev) => prev.map((n) => (n.id === id ? { ...n, bookmarked: !n.bookmarked } : n)))
    if (onBookmarkToggle) onBookmarkToggle(id)
  }

  return (
    <div
      id="output-panel"
      className="flex-1 flex flex-col overflow-hidden"
      style={{
        background: 'var(--surface-primary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
      }}
    >
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2">
          {/* sparkle icon */}
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(140,92,231,0.15)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z"
                fill="var(--primary-purple)"
              />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            Generated Names
          </h2>
        </div>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'var(--text-secondary)',
          }}
        >
          {names.length} Names Generated
        </span>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto p-4" style={{ gap: '8px', display: 'flex', flexDirection: 'column' }}>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="animate-spin">
              <circle cx="12" cy="12" r="10" stroke="var(--primary-purple)" strokeWidth="2" fill="none" strokeOpacity="0.2" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                stroke="var(--primary-purple)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5"
              />
            </svg>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'var(--text-secondary)',
              }}
            >
              Generating names...
            </p>
          </div>
        ) : error ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--accent-red)" strokeWidth="1.5" fill="none" />
              <path d="M12 7V13" stroke="var(--accent-red)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="17" r="0.5" fill="var(--accent-red)" />
            </svg>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  marginBottom: '4px',
                }}
              >
                Error generating names
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                }}
              >
                {error}
              </p>
            </div>
          </div>
        ) : names.length === 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                textAlign: 'center',
              }}
            >
              Fill in the form and click "Generate Names" to see results here
            </p>
          </div>
        ) : (
          names.map((nameData, index) => (
            <div key={nameData.id} style={{
              animation: `slideInCard 0.4s ease-out ${index * 0.05}s backwards`,
            }}>
              <NameCard
                data={nameData}
                onBookmark={() => handleBookmark(nameData.id)}
                onCopy={() => handleCopy(nameData.id, nameData.name)}
                isCopied={copiedId === nameData.id}
              />
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        @keyframes slideInCard {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
