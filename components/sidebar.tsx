'use client'

import React, { useState } from 'react'
import { Home, Sparkles, Bookmark, Clock, MessageCircle, Moon, Sun } from 'lucide-react'

interface NavItem {
  icon: React.ElementType
  label: string
  id: string
}

const topNavItems: NavItem[] = [
  { icon: Home,      label: 'Home',     id: 'home'     },
  { icon: Sparkles,  label: 'Generate', id: 'generate' },
  { icon: Bookmark,  label: 'Saved',    id: 'saved'    },
  { icon: Clock,     label: 'History',  id: 'history'  },
  { icon: MessageCircle, label: 'Chat', id: 'chat'   },
]

const bottomNavItems: NavItem[] = [
  { icon: Moon, label: 'Theme', id: 'theme' },
]

interface SidebarProps {
  activePage?: 'home' | 'generate' | 'saved' | 'history' | 'chat'
  onPageChange?: (page: 'home' | 'generate' | 'saved' | 'history' | 'chat') => void
  darkMode?: boolean
  onThemeToggle?: () => void
}

export function Sidebar({ activePage = 'home', onPageChange, darkMode = true, onThemeToggle }: SidebarProps) {
  const [localActive, setLocalActive] = useState(activePage)
  const [localDarkMode, setLocalDarkMode] = useState(darkMode)

  const handlePageChange = (id: string) => {
    if (id === 'home' || id === 'generate' || id === 'saved' || id === 'history' || id === 'chat') {
      setLocalActive(id)
      if (onPageChange) {
        onPageChange(id)
      }
    }
  }

  const handleThemeToggle = () => {
    setLocalDarkMode(!localDarkMode)
    if (onThemeToggle) onThemeToggle()
  }

  return (
    <aside
      className="w-16 flex flex-col items-center py-5 gap-0 min-h-screen fixed left-0 top-0 z-50"
      style={{ background: 'var(--surface-secondary)', borderRight: '1px solid var(--border-subtle)' }}
    >
      {/* Logo box — matches reference: dark purple square with 4-pointed star */}
      <div className="mb-6 flex items-center justify-center">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: 'linear-gradient(145deg, #1E1030 0%, #16102A 100%)', border: '1px solid rgba(140,92,231,0.3)' }}
        >
          {/* 4-pointed sparkle star */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M11 2L13 9L20 11L13 13L11 20L9 13L2 11L9 9L11 2Z"
              fill="#8C5CE7"
              fillOpacity="0.9"
            />
            <path
              d="M11 2L13 9L20 11L13 13L11 20L9 13L2 11L9 9L11 2Z"
              stroke="#9D7CFF"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>

      {/* Top nav */}
      <nav className="flex flex-col items-center gap-2 w-full px-2">
        {topNavItems.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => handlePageChange(id)}
            title={label}
            className="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-150"
            style={{
              background: localActive === id ? 'rgba(255,255,255,0.04)' : 'transparent',
              color:      localActive === id ? 'var(--primary-purple)' : 'var(--text-secondary)',
            }}
          >
            <Icon
              size={20}
              strokeWidth={localActive === id ? 2 : 1.75}
              style={{ color: localActive === id ? 'var(--primary-purple)' : 'var(--text-secondary)' }}
            />
          </button>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom nav */}
      <nav className="flex flex-col items-center gap-2 w-full px-2 mb-2">
        {bottomNavItems.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => {
              if (id === 'theme') handleThemeToggle()
              else handlePageChange(id)
            }}
            title={label}
            className="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-150"
            style={{
              background: localActive === id ? 'rgba(255,255,255,0.04)' : 'transparent',
              color:      localActive === id ? 'var(--primary-purple)' : 'var(--text-secondary)',
            }}
          >
            {id === 'theme' ? (
              localDarkMode ? (
                <Moon size={20} strokeWidth={1.75} style={{ color: 'var(--text-secondary)' }} />
              ) : (
                <Sun size={20} strokeWidth={1.75} style={{ color: 'var(--text-secondary)' }} />
              )
            ) : (
              <Icon
                size={20}
                strokeWidth={localActive === id ? 2 : 1.75}
                style={{ color: localActive === id ? 'var(--primary-purple)' : 'var(--text-secondary)' }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* User avatar */}
      <div className="mt-2 mb-1 flex flex-col items-center gap-1">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #8C5CE7 0%, #F5A623 100%)' }}
          title="Arnav"
        >
          A
        </div>
      </div>
    </aside>
  )
}
