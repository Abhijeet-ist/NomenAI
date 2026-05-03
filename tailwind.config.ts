import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background:          'var(--background)',
        foreground:          'var(--foreground)',
        'surface-secondary': 'var(--surface-secondary)',
        'surface-primary':   'var(--surface-primary)',
        'card-bg':           'var(--card-bg)',
        'input-bg':          'var(--input-bg)',
        'hover-bg':          'var(--hover-bg)',
        'tag-bg':            'var(--tag-bg)',
        'primary-purple':    'var(--primary-purple)',
        'primary-light':     'var(--primary-light)',
        'accent-gold':       'var(--accent-gold)',
        'accent-gold-lt':    'var(--accent-gold-lt)',
        'accent-green':      'var(--accent-green)',
        'accent-blue':       'var(--accent-blue)',
        'gradient-start':    'var(--gradient-start)',
        'gradient-mid':      'var(--gradient-mid)',
        'gradient-end':      'var(--gradient-end)',
        'text-white':        'var(--text-white)',
        'text-primary':      'var(--text-primary)',
        'text-label':        'var(--text-label)',
        'text-secondary':    'var(--text-secondary)',
        'text-meaning':      'var(--text-meaning)',
        'text-description':  'var(--text-description)',
        'text-tag':          'var(--text-tag)',
        'border-subtle':     'var(--border-subtle)',
        'border-medium':     'var(--border-medium)',
        'border-active':     'var(--border-active)',
      },
      fontFamily: {
        sans:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      fontSize: {
        '10': ['10px', '14px'],
        '11': ['11px', '15px'],
        '12': ['12px', '16px'],
        '13': ['13px', '18px'],
        '14': ['14px', '20px'],
        '16': ['16px', '22px'],
        '20': ['20px', '26px'],
        '24': ['24px', '30px'],
        '32': ['32px', '38px'],
      },
    },
  },
  plugins: [],
}

export default config
