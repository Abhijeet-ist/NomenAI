'use client'

import React from 'react'
import { Download, Sparkles } from 'lucide-react'

interface TopBarProps {
  onExportAll?: () => void
  onNewGeneration?: () => void
}

export function TopBar({ onExportAll, onNewGeneration }: TopBarProps) {
  return (
    <div
      className="h-18 flex items-center justify-between px-8 fixed top-0 left-16 right-0 z-40"
      style={{
        background: 'var(--background)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Left: Brand + Page Title */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(145deg, #2F4550 0%, #3A5562 100%)', border: '1px solid rgba(184, 219, 217, 0.3)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L9.5 6L15 8L9.5 10L8 15L6.5 10L1 8L6.5 6L8 1Z" fill="#B8DBD9" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--text-white)',
                letterSpacing: '0.02em',
              }}
            >
              NOMENAI
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: 'var(--text-secondary)',
              }}
            >
              AI Character Name Generator
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '32px',
              lineHeight: '38px',
              color: 'var(--text-white)',
              letterSpacing: '-0.02em',
              marginBottom: '4px',
            }}
          >
            Create Unforgettable Characters
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.01em',
            }}
          >
            Generate unique, meaningful names for your stories with the power of AI.
          </p>
        </div>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-3">
        {/* Export All — secondary ghost button */}
        <button
          id="export-all-btn"
          onClick={onExportAll}
          className="flex items-center gap-2 rounded-lg transition-colors duration-150 hover:opacity-90"
          style={{
            padding: '8px 18px',
            background: 'var(--hover-bg)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <Download size={15} strokeWidth={1.75} />
          <span>Export All</span>
        </button>

        {/* New Generation — Charcoal gradient button */}
        <button
          id="new-generation-btn"
          onClick={onNewGeneration}
          className="flex items-center gap-2 rounded-xl transition-all duration-150 hover:opacity-90 hover:shadow-lg"
          style={{
            padding: '9px 22px',
            background: 'linear-gradient(135deg, #2F4550 0%, #44627E 100%)',
            border: 'none',
            color: '#F4F4F9',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(47, 69, 80, 0.4)',
          }}
        >
          <Sparkles size={15} strokeWidth={1.75} />
          <span>New Generation</span>
        </button>
      </div>
    </div>
  )
}
