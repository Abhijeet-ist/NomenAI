<div align="center">

# 🎭 NOMENAI
#### *AI-Powered Character Name Generation Platform*

<p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 14"/></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS"/></a>
    <a href="https://www.radix-ui.com/"><img src="https://img.shields.io/badge/Radix-UI-161618?style=for-the-badge&logo=radix-ui" alt="Radix UI"/></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"/></a>
</p>

> ✨ **Harness the power of AI to generate unique, creative, and meaningful character names instantly.** NOMENAI combines intelligent algorithms with an elegant, intuitive interface to revolutionize the way you create fictional character names.

</div>

---

## 🌟 Overview

**NOMENAI** is a sophisticated, modern web application designed for writers, game developers, screenwriters, and creative professionals. It leverages cutting-edge AI technology to generate contextually relevant character names with an emphasis on **creativity, quality, and user experience**.

Built with modern web technologies, NOMENAI delivers a **blazingly fast**, **type-safe**, and **accessible** platform for name generation with a stunning dark-themed interface.

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🤖 Intelligent Generation
- **AI-Powered Algorithms** - Advanced name generation using machine learning
- **Context-Aware** - Generate names based on character traits, culture, and style
- **Diverse Results** - Unlimited unique name suggestions at your fingertips

</td>
<td width="50%">

### 🎯 Smart Controls
- **Fine-Tuned Filtering** - Narrow results by criteria (origin, style, gender, etc.)
- **Advanced Search** - Quickly find names matching your specific needs
- **Batch Generation** - Create multiple names in one operation

</td>
</tr>
<tr>
<td width="50%">

### 💾 Save & Organize
- **Favorites System** - Bookmark and save your top picks
- **Generation History** - Track all previously generated names
- **Collections** - Organize names into custom categories

</td>
<td width="50%">

### 🌈 Premium UX
- **Responsive Design** - Seamless experience on desktop, tablet, and mobile
- **Dark/Light Themes** - Beautiful theme system with multiple color schemes
- **Real-time Feedback** - Instant generation with smooth animations

</td>
</tr>
<tr>
<td width="50%">

### ⚡ High Performance
- **Instant Processing** - Sub-second name generation
- **Optimized Loading** - Lightning-fast page loads and interactions
- **Streaming Results** - Real-time result streaming for better UX

</td>
<td width="50%">

### ♿ Accessibility & Quality
- **WCAG Compliant** - Full accessibility support for all users
- **Keyboard Navigation** - Complete keyboard support throughout the app
- **Type-Safe Code** - 100% TypeScript for reliability and developer experience

</td>
</tr>
</table>

### Technical Achievements
✅ **Server-Side Rendering (SSR)** for SEO optimization  
✅ **RESTful API** with well-documented endpoints  
✅ **Component Architecture** with 40+ reusable UI components  
✅ **Real-time Processing** with streaming capabilities  
✅ **Persistent Storage** integration-ready  
✅ **Vercel Analytics** for performance monitoring  

---

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `18.17` or higher
- **pnpm** `8.0+` (recommended) or **npm** / **yarn**

```bash
# Check your Node.js version
node --version

# Install pnpm globally (if not already installed)
npm install -g pnpm
```

### 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/NOMENAI.git
cd NOMENAI

# 2. Install dependencies
pnpm install

# 3. Create environment configuration (if needed)
cp .env.example .env.local

# 4. Start development server
pnpm dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser. The application will reload automatically as you make changes.

### 🏗️ Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Create optimized production bundle
pnpm build && pnpm start
```

---

## 📁 Project Architecture

```
NOMENAI/
│
├── 📂 app/                              # Next.js App Router (T3 Stack)
│   ├── layout.tsx                      # Root layout & metadata
│   ├── page.tsx                        # Home page component
│   ├── globals.css                     # Global styles
│   ├── design-system/                  # Design system documentation
│   │   └── index.ts
│   └── api/                            # API Routes
│       └── generate-names/
│           └── route.ts                # POST endpoint for name generation
│
├── 📂 components/                       # React Components (Reusable & Page-specific)
│   ├── main-layout.tsx                 # Main content wrapper
│   ├── input-panel.tsx                 # Name generation input controls
│   ├── output-panel.tsx                # Results display area
│   ├── sidebar.tsx                     # Navigation sidebar
│   ├── topbar.tsx                      # Top navigation bar
│   ├── theme-provider.tsx              # Theme context provider
│   └── 📂 ui/                          # UI Component Library (40+)
│       ├── button.tsx                  # Button components
│       ├── input.tsx                   # Input field
│       ├── card.tsx                    # Card container
│       ├── dialog.tsx                  # Modal dialogs
│       ├── form.tsx                    # Form wrapper
│       ├── select.tsx                  # Select dropdown
│       ├── tabs.tsx                    # Tab navigation
│       ├── tooltip.tsx                 # Tooltip component
│       ├── badge.tsx                   # Badge labels
│       └── ... (35+ more components)
│
├── 📂 context/                          # React Context API
│   ├── ThemeContext                    # Theme state management
│   └── GeneratorContext                # Name generation state
│
├── 📂 hooks/                            # Custom React Hooks
│   ├── use-mobile.ts                   # Mobile responsiveness hook
│   └── use-toast.ts                    # Toast notifications hook
│
├── 📂 lib/                              # Utility Functions & Helpers
│   ├── utils.ts                        # Common utility functions
│   └── 📂 utils/                       # Organized utilities
│
├── 📂 public/                           # Static Assets
│   ├── favicon.ico
│   └── ... (other static files)
│
├── 📂 styles/                           # Global & Component Styles
│   └── globals.css
│
├── 📄 tailwind.config.ts                # Tailwind CSS configuration
├── 📄 next.config.mjs                   # Next.js configuration
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 postcss.config.mjs                # PostCSS configuration
├── 📄 package.json                      # Dependencies & scripts
└── 📄 components.json                   # shadcn/ui configuration
```

### Directory Responsibilities

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js routing, pages, and API endpoints |
| `components/` | Reusable React components and UI library |
| `context/` | Global state management using React Context |
| `hooks/` | Custom React hooks for shared logic |
| `lib/` | Utility functions, helpers, and constants |
| `public/` | Static assets (images, fonts, favicons) |
| `styles/` | Global CSS styles and Tailwind configuration |

---

## 🛠️ Technology Stack

### Frontend Framework
- **[Next.js 14](https://nextjs.org/)** - React meta-framework with App Router, SSR, and optimization
- **[React 18+](https://react.dev/)** - UI library with hooks and concurrent features
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type-safe JavaScript development

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives (15+ components)
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon library (564+ icons)
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching without flash

### Form & Data
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation resolvers
- **[cmdk](https://cmdk.paco.sh/)** - Fast command/search component
- **[input-otp](https://input-otp.js.org/)** - OTP input component
- **[date-fns](https://date-fns.org/)** - Date utility library

### Additional Libraries
- **[@vercel/analytics](https://vercel.com/analytics)** - Performance monitoring
- **[embla-carousel-react](https://www.embla-carousel.com/)** - Carousel component
- **[class-variance-authority](https://cva.style/)** - CSS class composition utility
- **[clsx](https://github.com/lukeed/clsx)** - Class name concatenation

### Development Tools
- **[ESLint](https://eslint.org/)** - Code quality and consistency
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixes
- **[pnpm](https://pnpm.io/)** - Fast, efficient package manager

---

## 📋 Available Scripts

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint to check code quality
pnpm lint

# Format code with prettier (if configured)
pnpm format
```

---

## 🎨 Design System

NOMENAI features a carefully crafted design system with:

### Color Palette
- **Primary:** `#8C5CE7` (Purple) - Main actions and interactions
- **Accent:** `#F5A623` (Gold) - Highlights and CTAs
- **Accent Alt:** `#00D4AA` (Teal) - Secondary accents
- **Background:** `#000E14` (Deep Dark) - Application background
- **Surface:** `#14151C` (Dark Navy) - Cards and panels
- **Text:** `#FFFFFF` (White) - Primary text

### Component Library
40+ pre-built, accessible UI components including:
- Form elements (input, select, checkbox, radio, toggle)
- Navigation (menu, tabs, breadcrumb, pagination)
- Feedback (alert, toast, skeleton, progress)
- Content (card, accordion, carousel, table)
- Overlay (dialog, drawer, popover, tooltip)

---

## 🔌 API Endpoints

### Name Generation
```http
POST /api/generate-names
Content-Type: application/json

{
  "context": "fantasy",
  "gender": "neutral",
  "style": "traditional",
  "count": 10
}
```

**Response:**
```json
{
  "success": true,
  "names": ["Elara", "Thoren", "Lysandra", ...],
  "metadata": {
    "context": "fantasy",
    "generatedAt": "2024-05-04T12:00:00Z"
  }
}
```

---

## 📱 Responsive Design

NOMENAI is built mobile-first with breakpoints for:
- **Mobile** - 320px and up (smartphones)
- **Tablet** - 768px and up (tablets)
- **Desktop** - 1024px and up (laptops)
- **Wide** - 1280px and up (large screens)

All components and layouts respond gracefully across all screen sizes.

---

## ♿ Accessibility

NOMENAI is committed to **WCAG 2.1 AA compliance**:
- ✅ Keyboard navigation support
- ✅ Screen reader optimization
- ✅ Color contrast ratios (4.5:1 minimum)
- ✅ ARIA labels and descriptions
- ✅ Focus indicators and management
- ✅ Semantic HTML structure

---

## 🚀 Performance Optimization

- **Code Splitting** - Automatic route-based code splitting
- **Image Optimization** - Next.js Image component with lazy loading
- **CSS Optimization** - Tailwind CSS purging unused styles
- **Tree Shaking** - Removal of unused dependencies
- **Caching** - Strategic browser and server caching
- **Vercel Analytics** - Real-time performance monitoring

---

## 📚 Development Guidelines

### Code Style
- Use **TypeScript** for type safety
- Follow **ESLint** rules for consistency
- Use **Tailwind CSS** for styling
- Implement **semantic HTML**

### Component Guidelines
- Keep components small and focused
- Use **React Hooks** for state management
- Implement proper **error boundaries**
- Add **TypeScript types** to props

### File Naming
- Components: `PascalCase` (e.g., `InputPanel.tsx`)
- Utilities: `camelCase` (e.g., `formatName.ts`)
- Directories: `kebab-case` (e.g., `ui-components/`)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Before Submitting
- Run `pnpm lint` to ensure code quality
- Test your changes thoroughly
- Update documentation if needed
- Follow the existing code style

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙋 Support & Feedback

Have questions or suggestions? We'd love to hear from you!

- 📧 **Email** - contact@nomenai.dev
- 🐛 **Issues** - [GitHub Issues](https://github.com/yourusername/NOMENAI/issues)
- 💬 **Discussions** - [GitHub Discussions](https://github.com/yourusername/NOMENAI/discussions)
- 📝 **Documentation** - [Full Docs](https://docs.nomenai.dev)

---

## 📈 Project Stats

- ✨ **40+** Pre-built UI Components
- 📦 **15+** Radix UI Components
- 🎨 **Custom** Color Themes
- ♿ **WCAG 2.1 AA** Accessibility Compliant
- 🚀 **Optimized** for Performance
- 📱 **Fully** Responsive

---

<div align="center">

### 🌟 If you find this project helpful, please consider giving it a star! ⭐

**Built with ❤️ by the NOMENAI Team**

[Website](#) • [Documentation](#) • [GitHub](https://github.com/yourusername/NOMENAI)

</div>