# NOMENAI — AI Character Name Generator
## Complete Design System & UI Reference Document
> Analyzed from design mockup images for coding implementation

---

## PROJECT OVERVIEW

- **App Name:** NOMENAI
- **Tagline:** AI Character Name Generator
- **Purpose:** Generate unique, meaningful names for fictional characters using AI
- **Theme:** Dark UI with purple primary, gold accent
- **Layout:** Sidebar navigation + two-panel main content

---

## 01. ICON SET

### Navigation Icons (Top-level sidebar nav)
| Label     | Icon Type       | Notes                        |
|-----------|-----------------|------------------------------|
| Home      | House outline   | Standard home icon           |
| Generate  | Sparkle/Star ✦  | 4-pointed sparkle star       |
| Saved     | Bookmark outline| Ribbon bookmark              |
| History   | Clock/Timer     | Circular clock               |
| Theme     | Crescent Moon   | Moon icon for dark/light     |
| Profile   | Person/User     | Circular person silhouette   |

### Action Icons (Toolbar / button icons)
| Label    | Icon Type          | Notes                       |
|----------|--------------------|-----------------------------|
| Add      | Plus (+)           | Thin cross                  |
| Edit     | Pencil             | Diagonal pencil             |
| Delete   | Trash can          | Open-top bin                |
| Search   | Magnifying glass   | Circle + handle             |
| Filter   | Funnel             | Triangle funnel             |
| Download | Arrow down + tray  | Download icon               |
| Share    | Share/Nodes        | Branching share icon        |
| Copy     | Double-page        | Stacked pages               |

### UI Icons (Content/Feature icons)
| Label    | Icon Type          | Color / Style               |
|----------|--------------------|-----------------------------|
| Bookmark | Ribbon bookmark    | Outline                     |
| Copy     | Double-page        | Outline                     |
| Star     | 5-pointed star     | Outline / filled            |
| Sparkle  | 4-pointed sparkle  | Purple accent               |
| Shield   | Shield shape       | Outline                     |
| Fire     | Flame              | Orange/red flame            |
| Sword    | Vertical sword     | Purple/teal                 |
| Leaf     | Single leaf        | Green                       |
| Sun      | Circle + rays      | Gold/yellow                 |
| Moon     | Crescent           | Outline                     |
| Crown    | Royal crown        | Gold                        |
| Gem      | Diamond shape      | Blue/purple                 |
| Magic    | Wand/sparkle       | Purple                      |
| Book     | Open book          | Outline                     |
| User     | Person silhouette  | Outline                     |
| Settings | Gear/Cog           | Outline                     |

---

## 02. COLOR PALETTE

### Primary Colors
```
Purple (Primary)  : #8C5CE7
Light Purple      : #9D7CFF
Gold/Orange       : #F5A623
Light Gold/Yellow : #FFDB70
```

### Secondary Colors
```
Dark Navy         : #1E1F2B
Dark Gray         : #2A2D3E
Medium Dark       : #3B3F52
Teal/Accent       : #00D4AA
```

### Neutrals (Dark to Light)
```
Deepest Dark      : #000E14  (near black, background base)
Very Dark         : #14151C  (sidebar background)
Dark Gray         : #1A1D26  (card background)
Medium Dark       : #242B35  (elevated surfaces)
Mid Gray          : #8AB8F3  (borders/dividers — approximate)
Light Gray        : #6E7EB8  (muted text — approximate)
White             : #FFFFFF  (primary text)
```

### Gradients
```
Purple Gradient   : #8C5CE7  →  #9D7CFF   (primary actions)
Gold Gradient     : #F5A623  →  #FFDB70   (highlights / CTA)
Teal Gradient     : #00D4AA  →  #00BB94   (accent)
```

### Design Color Rules
- Purple  → Primary actions, buttons, active states
- Gold    → Highlights, CTA buttons, "Generate Names"
- Dark Neutrals → Backgrounds, cards, surfaces
- White   → Primary body text
- Teal    → Special accent / success states

---

## 03. TYPOGRAPHY

### Primary Font: Playfair Display
Used for headings and display text (H1, H2)
- Style: Serif, elegant, classic fantasy feel
- Characters: A–Z, a–z, 0–9, special chars: !@#$%^&*()_+

### Secondary Font: Inter
Used for body, UI labels, captions (H3, Body, Small, Caption)
- Style: Sans-serif, modern, highly readable

### Type Scale
| Style      | Font             | Size  | Weight | Use Case      |
|------------|------------------|-------|--------|---------------|
| H1         | Playfair Display | 32px  | 700    | Page titles   |
| H2         | Playfair Display | 24px  | 600    | Section heads |
| H3         | Inter            | 20px  | 600    | Sub-sections  |
| Body Large | Inter            | 16px  | 400    | Primary copy  |
| Body       | Inter            | 14px  | 400    | General text  |
| Small      | Inter            | 12px  | 400    | Labels, tags  |
| Caption    | Inter            | 11px  | 400    | Captions, hints|

---

## 04. BUTTONS

### Primary Buttons (Full-width / Large)

#### Button 1 — "New Generation"
```
Background : Purple gradient (#8C5CE7 → #9D7CFF)
Icon       : ✦ Sparkle (left of label)
Text       : "New Generation"
Text Color : #FFFFFF
Border     : None
Border-radius : ~8px
Padding    : 12px 24px
```

#### Button 2 — "Generate Names" (CTA / Main action)
```
Background : Gold gradient (#F5A623 → #FFDB70), left-to-right
Icon       : ✦ Sparkle (left of label)
Text       : "Generate Names"
Text Color : #1A1D26 (dark, for contrast on gold)
Border     : None
Border-radius : ~8px
Padding    : 14px 24px
Width      : 100% (full panel width)
```

### Secondary Buttons (Outlined)
```
Background : Transparent
Border     : 1px solid #3B3F52
Text Color : #FFFFFF
Border-radius : ~6px
Padding    : 10px 18px

Examples:
  - "Export All" (with download icon ↓)
  - "Save"       (with bookmark icon)
```

### Icon Buttons (Small, square)
```
Background : #2A2D3E (dark card)
Border     : 1px solid #3B3F52
Size       : ~36x36px
Border-radius : ~6px
Icons used : Bookmark, Copy, Edit (pencil), Delete (trash), Share, Ellipsis (...)
```

### Toggle / Pills
```
Active State:
  Background : #8C5CE7 (purple)
  Text       : #FFFFFF
  Border-radius : 999px (fully rounded)
  Padding    : 6px 16px

Inactive State:
  Background : Transparent
  Border     : 1px solid #3B3F52
  Text       : #6E7EB8 (muted)

Archetype Pills (with icons):
  Hero    → Fire icon (gold/amber)
  Villain → Fire icon (red)
  Neutral → Leaf icon (green)
```

---

## 05. INPUTS

### Text Input
```
Placeholder  : "Enter character trait..."
Background   : #1A1D26
Border       : 1px solid #3B3F52
Border-radius: 6px
Text Color   : #FFFFFF
Padding      : 10px 14px
Right Icon   : Magnifying glass (search)
```

### Dropdown (Single Select)
```
Label example : "Select Genre"
Background    : #1A1D26
Border        : 1px solid #3B3F52
Border-radius : 6px
Right Icon    : Chevron ▾
Padding       : 10px 14px
Text Color    : #FFFFFF
```

#### Dropdown Options (Genre)
- Dark Fantasy (gem icon)
- Indian + Persian (gem icon)
- [Other genres not shown]

### Multi-Select (Trait Chips)
```
Selected chip style:
  Background    : #2A2D3E
  Border        : 1px solid #8C5CE7
  Text Color    : #FFFFFF
  Border-radius : 999px
  Remove icon   : × (right side of chip)
  Padding       : 4px 12px

Example chips: "Ruthless ×", "Intelligent ×", "Mysterious ×"
Add button    : "+ Add" (ghost/outlined)
```

### Gender Select (Segmented Control)
```
Options       : Male | Female
Active        : Background #2A2D3E, left icon (person)
Inactive      : Transparent
Border-radius : 6px
Border        : 1px solid #3B3F52
```

### Number / Range Input (Stepper)
```
Label         : "Number of Names"
Left button   : − (minus)
Center value  : "10" (editable)
Right button  : + (plus)
Background    : #1A1D26
Border        : 1px solid #3B3F52
Border-radius : 6px
```

### Toggle Switch (Dark Mode)
```
Track (ON)    : #8C5CE7 (purple)
Track (OFF)   : #3B3F52 (dark gray)
Thumb         : #FFFFFF (white circle)
Size          : ~44px wide × 24px tall
```

---

## 06. CARDS

### Featured Name Card (Large)
```
Background     : #1A1D26
Border         : 1px solid #2A2D3E
Border-radius  : 10px
Padding        : 16px 20px

Structure:
  [Icon Circle] [Name + Meaning + Description]   [Bookmark] [Copy]

Icon Circle:
  Size          : ~56px diameter
  Background    : #0E0E14 (very dark)
  Border-radius : 50%
  Icon          : Character emblem (colored illustration)

Name Text:
  Font          : Playfair Display or similar
  Size          : 22–24px
  Color         : #FFFFFF
  Weight        : 700

Meaning Text:
  Prefix        : "Meaning: "
  Color         : #9D7CFF (purple) or #8AB8F3 (muted)
  Size          : 13px

Description Text:
  Color         : #8AB8F3 or #6E7EB8
  Size          : 13–14px
  Max-lines     : 2
```

### Character Icon Emblems (Per card)
| Character   | Icon          | Icon Color        |
|-------------|---------------|-------------------|
| Zorvath     | Crown/Skull   | Gold (#F5A623)    |
| Ardahan     | Flame         | Red-Orange        |
| Vireen Kael | Sword         | Purple/Lavender   |
| Rohitash    | Sun/Rays      | Gold (#FFDB70)    |
| Zahrivan    | Crystal/Tree  | Teal/Green        |

### Mini Cards (4-column grid, Design System view)
```
Same structure as featured card but compact
Width         : ~25% of container
Padding       : 12px
Description   : Omitted (name + meaning only in grid)
```

---

## 07. SIDEBAR NAVIGATION

### Left Sidebar (Collapsed State)
```
Width         : ~64px (icon-only)
Background    : #14151C
Border-right  : 1px solid #2A2D3E

Top:
  - Logo icon (sparkle ✦, purple, square rounded background)

Middle nav icons (centered, vertical stack):
  - Home      (active: #2A2D3E card bg, rounded)
  - Generate  (sparkle icon)
  - Saved     (bookmark icon)
  - History   (clock icon)

Bottom:
  - Theme     (moon icon)
  - User avatar (circular photo)
```

### Left Sidebar (Expanded State — seen in design system panel)
```
Width         : ~200px
Background    : #14151C

Header:
  - Sparkle icon + "NOMENAI" (purple text)

Nav items:
  Format: [Icon] [Label]
  - Home      (house icon)   ← active: highlighted background
  - Generate  (sparkle icon)
  - Saved     (bookmark icon)
  - History   (clock icon)

Bottom nav:
  - Settings      (gear icon)
  - Help & Support (question mark icon)

User section (bottom):
  - Avatar circle (user photo)
  - Name: "Arnav"
  - Plan: "Premium Plan" (subdued text)
  - Chevron ▾
```

---

## 08. BADGES & TAGS

### Badges
| Label   | Background          | Border             | Icon     |
|---------|---------------------|--------------------|----------|
| New     | #8C5CE7 (purple)    | None               | None     |
| Popular | Gold gradient       | None               | ⭐ Star  |
| Premium | Transparent         | 1px solid #8C5CE7  | ✦ Sparkle|
| Saved   | Transparent         | 1px solid #00D4AA  | Bookmark |

```
Badge style:
  Border-radius : 999px
  Padding       : 4px 12px
  Font-size     : 12px
  Font-weight   : 500
```

### Tags (Flat Chips)
```
Examples      : "Dark Fantasy", "Mythical", "Ancient", "Royalty", "Warrior"
Background    : #2A2D3E
Border        : 1px solid #3B3F52
Border-radius : 6px
Padding       : 4px 12px
Text Color    : #FFFFFF
Font-size     : 12px
```

---

## 09. ALERTS / NOTIFICATIONS

### Alert Variants
| Type    | Icon      | Border/Accent Color | Background      |
|---------|-----------|---------------------|-----------------|
| Success | ✓ Check   | #00D4AA (teal/green)| Dark green tint |
| Warning | ⚠ Triangle| #F5A623 (gold)      | Dark amber tint |
| Error   | ✕ X       | Red (#E74C3C)       | Dark red tint   |
| Info    | ℹ Circle  | #9D7CFF (purple)    | Dark purple tint|

### Alert Content Examples
```
Success : "Names generated successfully!"
Warning : "Please select at least one trait."
Error   : "Something went wrong. Try again."
Info    : "Generation may take a few seconds."
```

### Alert Structure
```
[Icon] [Message text]                        [× Close]

Background    : Translucent dark + left accent border (3–4px)
Border-radius : 6px
Padding       : 12px 16px
Text Color    : #FFFFFF
Close button  : Top-right ×
```

---

## 10. PROGRESS & LOADING STATES

### Progress Bar
```
Track Background : #2A2D3E
Fill Color       : #8C5CE7 (purple)
Height           : 6–8px
Border-radius    : 999px
Example value    : 72% shown
Label            : Percentage shown right of bar ("72%")
```

### Loading Spinner
```
Type          : Circular arc (indeterminate)
Color         : #8C5CE7 (purple)
Size          : ~32px
Animation     : Rotate 360° continuously
```

### Skeleton Loader
```
3 horizontal placeholder bars
Background    : #2A2D3E
Border-radius : 4px
Heights       : Varied (simulate text lines)
Animation     : Shimmer/pulse (opacity fade)
```

---

## 11. MISCELLANEOUS COMPONENTS

### Tooltip
```
Background    : #2A2D3E (dark surface)
Text Color    : #FFFFFF
Border-radius : 6px
Padding       : 8px 12px
Font-size     : 12px
Example text  : "Generate unique character names using AI."
Position      : Appears on hover (top/bottom of trigger)
```

### Divider
```
Color         : #3B3F52
Height        : 1px
Width         : 100%
Margin        : 12px 0
```

### Pagination
```
Pages shown   : Previous | 1 | [2] | 3 | Next
Active page   : Background #8C5CE7, text white
Inactive      : Transparent, text #6E7EB8
Border-radius : 4–6px
Size          : ~32x32px per button
```

---

## 12. FULL APP SCREEN — LAYOUT BREAKDOWN

### Screen: "Create Unforgettable Characters" (Main/Home)

#### Top Bar
```
Left  : [Sparkle icon] "NOMENAI" | "AI Character Name Generator" (subtitle)
Right : [Export All button] [New Generation button]
```

#### Main Page Title
```
Heading    : "Create Unforgettable Characters"
            Font: Playfair Display, ~36–40px, white
Subtitle   : "Generate unique, meaningful names for your stories with the power of AI."
            Font: Inter, 16px, muted gray (#8AB8F3 approx)
```

#### Left Panel — Input Form (approx 45% width)

**Section 1: "Tell us about your character"**
```
Step indicator : Numbered circle "1" (outline style)
Section title  : "Tell us about your character" (bold)
Subtitle       : "The more details you provide, the better we generate."
```

Form Fields (top to bottom):
```
1. Genre (Dropdown)
   Label        : "Genre"
   Selected     : "Dark Fantasy" [gem icon]
   Chevron      : ▾

2. Traits / Personality (Multi-chip select)
   Label        : "Traits / Personality"
   Chips        : [Ruthless ×] [Intelligent ×] [Mysterious ×] [+ Add]

3. Cultural Influence (Dropdown)
   Label        : "Cultural Influence"
   Selected     : "Indian + Persian" [gem icon]
   Chevron      : ▾

4. Gender — Optional (Dropdown, half-width, left)
   Label        : "Gender (Optional)"
   Selected     : "Male" [person icon]
   Chevron      : ▾

5. Tone (Dropdown, half-width, right)
   Label        : "Tone"
   Selected     : "Dark & Powerful" [waveform icon]
   Chevron      : ▾
```

**Section 2: "Advanced Preferences"**
```
Step indicator : Numbered circle "2"
Section title  : "Advanced Preferences"
Subtitle       : "Fine-tune the style and output."
```

Form Fields:
```
1. Name Style (Dropdown, half-width left)
   Label        : "Name Style"
   Selected     : "Ancient & Mythical" [leaf icon]

2. Number of Names (Stepper, half-width right)
   Label        : "Number of Names"
   Control      : [+] [10] [▾]
```

**CTA Button (bottom of left panel)**
```
Text           : "Generate Names"
Icon           : ✦ Sparkle (left)
Background     : Gold-to-purple gradient
               : #F5A623 (left) → #8C5CE7 (right) or similar
Width          : 100% of panel
Height         : ~52–56px
Border-radius  : 8px
Font-size      : 16px
Font-weight    : 600
```

#### Right Panel — Generated Names (approx 55% width)

**Header Row**
```
Left  : [✦ icon] "Generated Names" (H2 style)
Right : "10 Names Generated" (small, muted text)
```

**Name Card List (scrollable, full panel height)**
Each card structure:
```
┌─────────────────────────────────────────────────────────┐
│  [ICON]   Name (H2 size)                    [🔖] [📋] │
│           Meaning: [meaning text]                       │
│           [Description text — 1-2 lines]                │
└─────────────────────────────────────────────────────────┘

Card spacing  : 2–4px gap between cards
Card padding  : 16px
Border-bottom : 1px solid #2A2D3E (separator)
```

**Generated Name Cards Data**
```
1. Zorvath
   Meaning     : "Shadow Emperor" (Image 1) / "Meaning: Shadow Emperor" (Image 2)
   Description : "A cunning ruler who thrives in chaos and commands loyalty through fear."
   Icon        : Gold crown/skull emblem

2. Ardahan
   Meaning     : "Sacred Fire"
   Description : "A brilliant strategist with a burning ambition and an icy exterior."
   Icon        : Red/orange flame emblem

3. Vireen Kael
   Meaning     : "Lord of the Veiled Blade" (Image 2) / "Veiled Blade" (Image 1)
   Description : "A mysterious assassin whose past is lost in shadows and blood."
   Icon        : Purple sword emblem

4. Rohitash
   Meaning     : "One who rules the sun"
   Description : "A fallen prince seeking redemption in a world that betrayed him."
   Icon        : Gold sun/rays emblem

5. Zahrivan
   Meaning     : "King of the Ancient"
   Description : "An ageless sorcerer who whispers to forgotten gods."
   Icon        : Teal/green crystal or tree emblem
```

---

## 13. DROPDOWN OPTION VALUES

### Genre Options (visible/implied)
- Dark Fantasy
- Fantasy
- Sci-Fi
- Historical
- [Others not shown]

### Traits / Personality Tags
Shown as multi-select chips:
- Ruthless
- Intelligent
- Mysterious
- [Expandable — more options via "+ Add"]

### Cultural Influence Options
- Indian + Persian
- [Others not shown]

### Gender Options
- Male
- Female
- [Possibly non-binary / any]

### Tone Options
- Dark & Powerful
- [Others not shown]

### Name Style Options
- Ancient & Mythical
- [Others not shown]

---

## 14. CSS VARIABLES REFERENCE (for implementation)

```css
:root {
  /* Primary Colors */
  --color-primary:          #8C5CE7;
  --color-primary-light:    #9D7CFF;
  --color-gold:             #F5A623;
  --color-gold-light:       #FFDB70;
  --color-teal:             #00D4AA;

  /* Backgrounds */
  --bg-base:                #000E14;
  --bg-sidebar:             #14151C;
  --bg-card:                #1A1D26;
  --bg-elevated:            #2A2D3E;
  --bg-surface:             #3B3F52;

  /* Text */
  --text-primary:           #FFFFFF;
  --text-muted:             #8AB8F3;
  --text-subtle:            #6E7EB8;

  /* Borders */
  --border-default:         #3B3F52;
  --border-active:          #8C5CE7;

  /* Gradients */
  --gradient-purple:        linear-gradient(135deg, #8C5CE7, #9D7CFF);
  --gradient-gold:          linear-gradient(135deg, #F5A623, #FFDB70);
  --gradient-teal:          linear-gradient(135deg, #00D4AA, #00BB94);
  --gradient-cta:           linear-gradient(90deg, #F5A623, #8C5CE7);

  /* Typography */
  --font-heading:           'Playfair Display', serif;
  --font-body:              'Inter', sans-serif;

  /* Font Sizes */
  --text-h1:                32px;
  --text-h2:                24px;
  --text-h3:                20px;
  --text-body-lg:           16px;
  --text-body:              14px;
  --text-small:             12px;
  --text-caption:           11px;

  /* Spacing */
  --radius-sm:              4px;
  --radius-md:              6px;
  --radius-lg:              8px;
  --radius-xl:              10px;
  --radius-full:            999px;

  /* Transitions */
  --transition-default:     0.2s ease;
}
```

---

## 15. LAYOUT STRUCTURE (HTML/Component Hierarchy)

```
<App>
  ├── <Sidebar>                   ← Left sidebar (collapsed or expanded)
  │     ├── <Logo>
  │     ├── <NavItem> × N
  │     └── <UserProfile>
  │
  └── <MainContent>               ← Right of sidebar
        ├── <TopBar>
        │     ├── <AppTitle>
        │     └── <ActionButtons> (Export All, New Generation)
        │
        ├── <PageHeading>         ← "Create Unforgettable Characters"
        │
        └── <TwoPanelLayout>
              ├── <LeftPanel>     ← Form inputs (~45% width)
              │     ├── <FormSection step="1">
              │     │     ├── <Dropdown> (Genre)
              │     │     ├── <MultiChipSelect> (Traits)
              │     │     ├── <Dropdown> (Cultural Influence)
              │     │     ├── <Dropdown> (Gender) [half]
              │     │     └── <Dropdown> (Tone) [half]
              │     │
              │     ├── <FormSection step="2">
              │     │     ├── <Dropdown> (Name Style) [half]
              │     │     └── <Stepper> (Number of Names) [half]
              │     │
              │     └── <CTAButton> "Generate Names"
              │
              └── <RightPanel>    ← Results (~55% width)
                    ├── <PanelHeader> "Generated Names" + count
                    └── <NameCardList> (scrollable)
                          └── <NameCard> × N
                                ├── <CharacterIcon>
                                ├── <NameText>
                                ├── <MeaningText>
                                ├── <DescriptionText>
                                └── <CardActions> (Bookmark, Copy)
```

---

## 16. COMPONENT STATE NOTES

### Buttons
- Hover: Slight brightness increase (filter: brightness(1.1))
- Active/Press: Scale down slightly (transform: scale(0.98))
- Disabled: Opacity 0.4, cursor not-allowed

### Input Fields
- Default: Border #3B3F52
- Focus: Border #8C5CE7, subtle glow (box-shadow: 0 0 0 2px rgba(140,92,231,0.3))
- Error: Border red

### Name Cards
- Default: Background #1A1D26
- Hover: Background #2A2D3E, slight border highlight
- The bookmark icon fills on save action

### Sidebar Nav Items
- Default: Transparent background
- Active: Background #2A2D3E, rounded corners
- Hover: Background rgba(255,255,255,0.05)

---

## 17. DESIGN SYSTEM TIP (from image)

> "Use purple for primary actions, gold for highlights, and dark neutrals for backgrounds."

Application Usage Pattern:
- **Primary Action** → Purple gradient button (e.g., "New Generation")
- **Secondary Action** → Dark outlined button (e.g., "Export All")
- **Accent / Main CTA** → Gold gradient button (e.g., "Generate Names")
