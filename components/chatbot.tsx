'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Loader2, AlertCircle, MessageCircle, Sparkles } from 'lucide-react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Component to format and render AI responses beautifully
function FormattedResponse({ content, timestamp }: { content: string; timestamp: Date }) {
  // Helper function to strip and parse markdown
  const parseMarkdown = (text: string) => {
    // Remove markdown bold syntax and return styled text
    return text.replace(/\*\*/g, '')
  }

  // Parse content for better formatting
  const parseContent = (text: string) => {
    // First, clean up the content
    let cleanText = parseMarkdown(text)
    
    // Split by double newlines for paragraph separation
    const paragraphs = cleanText.split('\n\n').filter(p => p.trim())
    
    return paragraphs.map((para, idx) => {
      const trimmedPara = para.trim()
      
      // Check if it's a numbered list
      if (/^\d+\.\s/.test(trimmedPara)) {
        const items = para.split('\n').filter(line => /^\d+\.\s/.test(line.trim()))
        return (
          <div key={`list-${idx}`} style={{ marginBottom: '16px' }}>
            {items.map((item, itemIdx) => {
              // Try to match pattern: "1. **Name** - Description" or "1. Name - Description"
              let match = item.match(/^\d+\.\s*(.+?)\s*[-–—]\s*(.+)$/)
              
              if (match) {
                const name = parseMarkdown(match[1].trim())
                const description = parseMarkdown(match[2].trim())
                
                // Only render if both name and description exist and name is reasonable length
                if (name && name.length > 0 && name.length < 100 && description && description.length > 0) {
                  return (
                    <div
                      key={`item-${itemIdx}`}
                      style={{
                        marginBottom: '14px',
                        paddingLeft: '44px',
                        position: 'relative',
                        animation: 'slideIn 0.4s ease-out',
                      }}
                    >
                      <div style={{ position: 'absolute', left: 0, top: '0px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #8C5CE7 0%, #9D7CFF 100%)',
                            color: '#FFFFFF',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: 700,
                            boxShadow: '0 2px 8px rgba(140, 92, 231, 0.4)',
                          }}
                        >
                          {itemIdx + 1}
                        </span>
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '16px',
                            fontWeight: 700,
                            color: 'var(--text-white)',
                            margin: '0 0 6px 0',
                            wordBreak: 'break-word',
                          }}
                        >
                          {name}
                        </p>
                        <p
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            color: 'var(--text-primary)',
                            margin: 0,
                            lineHeight: '1.6',
                            letterSpacing: '0.3px',
                          }}
                        >
                          {description}
                        </p>
                      </div>
                    </div>
                  )
                }
              }
              return null
            })}
          </div>
        )
      }
      
      // Check for section headers (lines that are bold and end with colon or are short)
      if (/^[A-Za-z\s]+$/.test(trimmedPara) && trimmedPara.length < 50 && trimmedPara.length > 3) {
        // Could be a section header
        const lines = para.split('\n')
        if (lines.length === 1 && /^[A-Z]/.test(trimmedPara)) {
          return (
            <div key={`header-${idx}`} style={{ marginBottom: '12px', marginTop: idx > 0 ? '16px' : '0' }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#8C5CE7',
                  margin: 0,
                  paddingBottom: '8px',
                  borderBottom: '2px solid rgba(140, 92, 231, 0.2)',
                }}
              >
                {trimmedPara}
              </h3>
            </div>
          )
        }
      }
      
      // Check for bullet points
      if (/^[-•]\s/.test(trimmedPara)) {
        const items = para.split('\n').filter(line => /^[-•]\s/.test(line.trim()))
        return (
          <div key={`bullet-${idx}`} style={{ marginBottom: '12px' }}>
            {items.map((item, itemIdx) => {
              const cleanItem = parseMarkdown(item.replace(/^[-•]\s/, '').trim())
              return (
                <div
                  key={`bullet-item-${itemIdx}`}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      color: '#8C5CE7',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      marginTop: '2px',
                      fontSize: '16px',
                    }}
                  >
                    ✦
                  </span>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: 'var(--text-primary)',
                      margin: 0,
                      lineHeight: '1.6',
                      letterSpacing: '0.2px',
                    }}
                  >
                    {cleanItem}
                  </p>
                </div>
              )
            })}
          </div>
        )
      }

      // Regular paragraph
      const cleanPara = parseMarkdown(trimmedPara)
      return (
        <p
          key={`para-${idx}`}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: 'var(--text-primary)',
            margin: idx === paragraphs.length - 1 ? 0 : '0 0 12px 0',
            lineHeight: '1.7',
            letterSpacing: '0.3px',
          }}
        >
          {cleanPara}
        </p>
      )
    })
  }

  return (
    <div style={{ padding: '16px' }}>
      <div>{parseContent(content)}</div>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: 'var(--text-secondary)',
          display: 'block',
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  )
}

export function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome-' + Date.now(),
      role: 'assistant',
      content: 'Welcome to NOMENAI ChatBot! 🎭 I\'m here to help you with character name generation, worldbuilding advice, story ideas, and creative writing tips. How can I assist you today?',
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: 'assistant-' + Date.now(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMsg)
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: 'var(--background)',
        overflow: 'hidden',
      }}
    >
      {/* Chat Header */}
      <div
        className="border-b"
        style={{
          borderColor: 'var(--border-subtle)',
          padding: '16px 20px',
          background: 'var(--surface-secondary)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #8C5CE7 0%, #F5A623 100%)',
            }}
          >
            <MessageCircle size={20} color="white" />
          </div>
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--text-white)',
                margin: 0,
              }}
            >
              NOMENAI ChatBot
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                margin: '2px 0 0 0',
              }}
            >
              Your creative writing assistant
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        className="flex-1 overflow-y-auto p-5"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex"
            style={{
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              animation: 'slideIn 0.3s ease-out',
            }}
          >
            {message.role === 'user' ? (
              // User message - simple styled bubble
              <div
                style={{
                  maxWidth: '65%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #8C5CE7 0%, #9D7CFF 100%)',
                  wordBreak: 'break-word',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#FFFFFF',
                    margin: 0,
                    lineHeight: '1.5',
                  }}
                >
                  {message.content}
                </p>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.6)',
                    display: 'block',
                    marginTop: '6px',
                  }}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ) : (
              // Assistant message - formatted with better structure
              <div
                style={{
                  maxWidth: '75%',
                  borderRadius: '12px',
                  background: 'var(--surface-primary)',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                }}
              >
                <FormattedResponse content={message.content} timestamp={message.timestamp} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div
              style={{
                borderRadius: '12px',
                background: 'var(--surface-primary)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '16px', minWidth: '250px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <Sparkles
                    size={18}
                    style={{
                      color: '#8C5CE7',
                      animation: 'spin 2s linear infinite',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--text-white)',
                      margin: 0,
                    }}
                  >
                    Model is thinking...
                  </p>
                </div>
                
                {/* Animated dots */}
                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                    justifyContent: 'flex-start',
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#8C5CE7',
                        animation: `bounce 1.4s infinite`,
                        animationDelay: `${dot * 0.2}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Generating text animation */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    margin: '12px 0 0 0',
                    animation: 'fadeInOut 2s infinite',
                  }}
                >
                  Generating response...
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div
            className="flex justify-center"
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={16} color="#EF4444" />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#EF4444',
              }}
            >
              {error}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        className="border-t"
        style={{
          borderColor: 'var(--border-subtle)',
          padding: '16px 20px',
          background: 'var(--surface-secondary)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-end',
            background: 'var(--input-bg)',
            borderRadius: '10px',
            padding: '8px',
            border: '1px solid var(--border-subtle)',
            transition: 'all 0.3s ease',
          }}
        >
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about character names, storytelling, worldbuilding..."
            disabled={isLoading}
            style={{
              flex: 1,
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              padding: '10px 12px',
              border: 'none',
              borderRadius: '6px',
              background: 'transparent',
              color: 'var(--text-primary)',
              resize: 'none',
              maxHeight: '120px',
              minHeight: '40px',
              outline: 'none',
              opacity: isLoading ? 0.5 : 1,
              cursor: isLoading ? 'not-allowed' : 'text',
            }}
            onFocus={(e) => {
              e.currentTarget.parentElement!.style.borderColor = 'var(--primary-purple)'
              e.currentTarget.parentElement!.style.boxShadow = '0 0 0 2px rgba(140, 92, 231, 0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.parentElement!.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.parentElement!.style.boxShadow = 'none'
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            style={{
              padding: '10px 14px',
              background: inputValue.trim() && !isLoading
                ? 'linear-gradient(135deg, #8C5CE7 0%, #9D7CFF 100%)'
                : 'rgba(140, 92, 231, 0.3)',
              border: 'none',
              borderRadius: '6px',
              cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.2s',
              height: '40px',
              flexShrink: 0,
              boxShadow: inputValue.trim() && !isLoading 
                ? '0 4px 12px rgba(140, 92, 231, 0.3)' 
                : 'none',
            }}
          >
            {isLoading ? (
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <>
                <Send size={16} />
              </>
            )}
          </button>
        </div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            margin: '8px 0 0 12px',
          }}
        >
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          40% {
            transform: translateY(-10px);
            opacity: 0.8;
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
