'use client'

import React, { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { TopBar } from '@/components/topbar'
import { InputPanel } from '@/components/input-panel'
import { OutputPanel } from '@/components/output-panel'
import { ChatBot } from '@/components/chatbot'

export interface GeneratedName {
  id: string
  name: string
  meaning: string
  description: string
  icon: 'crown' | 'flame' | 'sword' | 'sun' | 'leaf' | 'gem' | 'sparkle' | 'shield'
  bookmarked?: boolean
}

export function MainLayout() {
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(true)
  const [activePage, setActivePage] = useState<'home' | 'generate' | 'saved' | 'history' | 'chat'>('generate')
  const [history, setHistory] = useState<GeneratedName[]>([])

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('nomenai_bookmarks')
    if (savedBookmarks) {
      try {
        const bookmarked = JSON.parse(savedBookmarks)
        setGeneratedNames((prev) =>
          prev.map((name) => ({
            ...name,
            bookmarked: bookmarked.includes(name.id),
          }))
        )
      } catch (err) {
        console.error('Failed to load bookmarks:', err)
      }
    }

    // Load history
    const savedHistory = localStorage.getItem('nomenai_history')
    if (savedHistory) {
      try {
        const hist = JSON.parse(savedHistory)
        setHistory(hist)
      } catch (err) {
        console.error('Failed to load history:', err)
      }
    }
  }, [])

  // Load and apply theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('nomenai_theme')
    const isDark = savedTheme ? savedTheme === 'dark' : true
    setDarkMode(isDark)
    applyTheme(isDark)
  }, [])

  const applyTheme = (isDark: boolean) => {
    const root = document.documentElement
    if (isDark) {
      // Dark theme - using new palette (Charcoal, Payne's Gray, Light Blue, Ghost White)
      root.style.setProperty('--background', '#1A1F24')
      root.style.setProperty('--surface-secondary', '#252D35')
      root.style.setProperty('--surface-primary', '#2F3A44')
      root.style.setProperty('--card-bg', '#333D47')
      root.style.setProperty('--input-bg', '#3A4652')
      root.style.setProperty('--hover-bg', '#404A55')
      root.style.setProperty('--tag-bg', '#3A4652')
      root.style.setProperty('--text-white', '#F4F4F9')
      root.style.setProperty('--text-primary', '#E8E8F0')
      root.style.setProperty('--text-secondary', '#B8DBD9')
      root.style.setProperty('--text-label', '#D4E0DE')
      root.style.setProperty('--text-tag', '#F4F4F9')
      root.style.setProperty('--text-meaning', '#B8DBD9')
      root.style.setProperty('--text-description', '#A0B8B6')
      root.style.setProperty('--border-subtle', '#404A55')
      root.style.setProperty('--border-medium', '#4A5662')
      root.style.setProperty('--border-active', '#B8DBD9')
      root.style.setProperty('--primary-purple', '#2F4550')
      document.body.style.background = '#1A1F24'
      document.body.style.color = '#E8E8F0'
    } else {
      // Light theme - new palette with Charcoal buttons and Ghost White background
      root.style.setProperty('--background', '#F4F4F9')
      root.style.setProperty('--surface-secondary', '#F8F8FB')
      root.style.setProperty('--surface-primary', '#FFFFFF')
      root.style.setProperty('--card-bg', '#FAFBFC')
      root.style.setProperty('--input-bg', '#F6F7FA')
      root.style.setProperty('--hover-bg', '#EFF0F5')
      root.style.setProperty('--tag-bg', '#E8E9F0')
      root.style.setProperty('--text-white', '#2F4550')
      root.style.setProperty('--text-primary', '#3D505B')
      root.style.setProperty('--text-secondary', '#586F7C')
      root.style.setProperty('--text-label', '#4A5F6B')
      root.style.setProperty('--text-tag', '#2F4550')
      root.style.setProperty('--text-meaning', '#586F7C')
      root.style.setProperty('--text-description', '#667A87')
      root.style.setProperty('--border-subtle', '#E0E2E8')
      root.style.setProperty('--border-medium', '#D5D8E0')
      root.style.setProperty('--border-active', '#2F4550')
      root.style.setProperty('--primary-purple', '#2F4550')
      // Gradient background using palette colors
      document.body.style.background = 'linear-gradient(135deg, #B8DBD9 0%, #C5E0DE 20%, #D2E5E3 40%, #DFE9E7 60%, #F0F2F6 80%, #F4F4F9 100%)'
      document.body.style.color = '#3D505B'
    }
  }

  const handleToggleTheme = () => {
    const newTheme = !darkMode
    setDarkMode(newTheme)
    localStorage.setItem('nomenai_theme', newTheme ? 'dark' : 'light')
    applyTheme(newTheme)
  }

  const handleGenerateNames = async (formData: {
    genre: string
    traits: string[]
    culture: string
    gender: string
    tone: string
    bookName: string
    nameStyle: string
    numberOfNames: number
  }) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/generate-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate names')
      }

      const data = await response.json()
      const namesWithBookmarks = (data.names || []).map((name: GeneratedName) => ({
        ...name,
        bookmarked: false,
      }))
      setGeneratedNames(namesWithBookmarks)
      
      // Add to history
      const updatedHistory = [...namesWithBookmarks, ...history]
      setHistory(updatedHistory)
      localStorage.setItem('nomenai_history', JSON.stringify(updatedHistory))
      
      setActivePage('generate')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      console.error('Error generating names:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookmarkToggle = (id: string) => {
    setGeneratedNames((prev) =>
      prev.map((name) => {
        if (name.id === id) {
          const updated = { ...name, bookmarked: !name.bookmarked }
          // Persist to localStorage
          const bookmarkedIds = prev
            .filter((n) => (n.id === id ? !name.bookmarked : n.bookmarked))
            .map((n) => n.id)
          localStorage.setItem('nomenai_bookmarks', JSON.stringify(bookmarkedIds))
          return updated
        }
        return name
      })
    )
  }

  const handleExportAll = () => {
    const bookmarkedNames = generatedNames.filter((n) => n.bookmarked)
    if (bookmarkedNames.length === 0) {
      alert('No bookmarked names to export')
      return
    }

    // CSV format
    const headers = ['Name', 'Meaning', 'Description']
    const rows = bookmarkedNames.map((n) => [n.name, n.meaning, n.description])
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')

    // Download
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nomenai-names-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleNewGeneration = () => {
    setGeneratedNames([])
    setError(null)
    setActivePage('generate')
  }

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Fixed sidebar — 64 px wide */}
      <Sidebar activePage={activePage} onPageChange={setActivePage} darkMode={darkMode} onThemeToggle={handleToggleTheme} />

      {/* Main content area, offset by sidebar width */}
      <div className="flex-1" style={{ marginLeft: '64px' }}>
        {/* Fixed topbar */}
        <TopBar onExportAll={handleExportAll} onNewGeneration={handleNewGeneration} />

        {/* Content below topbar */}
        <div
          className="flex overflow-hidden"
          style={{
            marginTop: '72px',
            height: 'calc(100vh - 72px)',
          }}
        >
          {/* Conditional rendering based on active page */}
          {activePage === 'generate' && (
            <div className="flex gap-5 w-full p-5" style={{ overflow: 'hidden' }}>
              {/* Left — Input Panel */}
              <InputPanel onGenerate={handleGenerateNames} isLoading={isLoading} />
              {/* Right — Output Panel */}
              <OutputPanel names={generatedNames} isLoading={isLoading} error={error} onBookmarkToggle={handleBookmarkToggle} />
            </div>
          )}

          {activePage === 'saved' && (
            <div className="w-full p-5" style={{ overflow: 'auto' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--text-white)',
                    marginBottom: '24px',
                  }}
                >
                  Saved Names
                </h1>
                {generatedNames.filter((n) => n.bookmarked).length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '60px 20px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                      No bookmarked names yet. Generate names and bookmark your favorites!
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {generatedNames
                      .filter((n) => n.bookmarked)
                      .map((name) => (
                        <div
                          key={name.id}
                          style={{
                            padding: '16px',
                            background: 'var(--surface-primary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '12px',
                          }}
                        >
                          <h3
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: '20px',
                              fontWeight: 700,
                              color: 'var(--text-white)',
                              marginBottom: '8px',
                            }}
                          >
                            {name.name}
                          </h3>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            <strong>Meaning:</strong> {name.meaning}
                          </p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-description)' }}>
                            {name.description}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activePage === 'history' && (
            <div className="w-full p-5" style={{ overflow: 'auto' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--text-white)',
                    marginBottom: '24px',
                  }}
                >
                  Generation History
                </h1>
                {history.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '60px 20px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                      No generation history yet. Start generating names to see them here!
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {history.map((name) => (
                      <div
                        key={name.id}
                        style={{
                          padding: '16px',
                          background: 'var(--surface-primary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '12px',
                          opacity: name.bookmarked ? 1 : 0.7,
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '20px',
                            fontWeight: 700,
                            color: 'var(--text-white)',
                            marginBottom: '8px',
                          }}
                        >
                          {name.name}
                        </h3>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                          <strong>Meaning:</strong> {name.meaning}
                        </p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-description)', marginBottom: '8px' }}>
                          {name.description}
                        </p>
                        {name.bookmarked && (
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'var(--primary-purple)' }}>★ Bookmarked</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activePage === 'home' && (
            <div className="w-full p-5" style={{ overflow: 'auto' }}>
              <div
                style={{
                  maxWidth: '800px',
                  margin: '60px auto',
                  textAlign: 'center',
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '48px',
                    fontWeight: 700,
                    color: 'var(--text-white)',
                    marginBottom: '16px',
                  }}
                >
                  Welcome to NOMENAI
                </h1>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: 'var(--text-secondary)',
                    marginBottom: '32px',
                    lineHeight: '1.6',
                  }}
                >
                  Generate unique, meaningful names for your fictional characters using the power of AI. Click the "Generate" tab to get started, bookmark your favorites, and revisit them anytime.
                </p>
                <button
                  onClick={() => setActivePage('generate')}
                  style={{
                    padding: '12px 32px',
                    background: 'linear-gradient(135deg, #8C5CE7 0%, #9D7CFF 100%)',
                    border: 'none',
                    color: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Start Generating
                </button>
              </div>
            </div>
          )}

          {activePage === 'chat' && (
            <div className="w-full h-full" style={{ overflow: 'hidden' }}>
              <ChatBot />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
