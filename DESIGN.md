# Urban Explorer

## Overview

A dark, adventurous design system built for urban exploration and location discovery. Urban Explorer uses a deep navy foundation with warm amber and terracotta accents, creating an atmosphere reminiscent of twilight city exploration — mysterious, grounded, and inviting. The design balances map-first functionality with readable card interfaces, making location data feel both actionable and atmospheric.

## Colors

- **Primary** (#254252): Deep navy — primary backgrounds, map interface foundation
- **Primary Light** (rgba(37, 66, 82, 0.9)): Semi-transparent overlays, location cards
- **Secondary** (#e37239): Terracotta — interactive borders, key accents, hover triggers
- **Tertiary** (#f9982f): Warm amber — secondary accents, visual emphasis
- **Quaternary** (#eab56f): Pale gold — body text, subtle highlights
- **Background** (#254252): Primary app background — Night Navy
- **Surface Overlay** (rgba(23, 28, 45, 0.5)): Subtle overlays, shadow definition
- **Text Primary** (#eab56f): Body text, labels, non-critical information — Pale Gold
- **Text Light** (#f8f9fa): Headlines, interactive text, high-priority content — Off White
- **Border** (#e37239): Terracotta — dividers, focus states, definition lines
- **Success** (#00a36c): Emerald — location found, successful loading states
- **Neutral** (#cacaca): Muted gray — secondary UI elements, disabled states

## Typography

- **Display Font**: Smooch Sans — loaded from Google Fonts (variable font)
- **Body Font**: Smooch Sans — loaded from Google Fonts
- **Fallback Stack**: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif

Smooch Sans provides a clean, geometric sans-serif with slightly condensed proportions — ideal for navigation interfaces and map overlays where space efficiency matters. Headlines use uppercase with weight 700 for bold, declarative statements that cut through visual complexity. Body text at weight 400 maintains readability against dark map backgrounds. All text appears in warm gold tones rather than pure white to reduce eye strain during extended map usage.

- **Hero**: Smooch Sans 2.986rem/1.2, weight 700, uppercase, letter-spacing 0.0165em
- **Section Title**: Smooch Sans 2.488rem/1.2, weight 700, uppercase
- **Card Title**: Smooch Sans 1rem/1.2, weight 700, uppercase, letter-spacing 0.035em
- **Body**: Smooch Sans 1rem/1.6, weight 400
- **Body Small**: Smooch Sans 0.833rem/1.6, weight 400
- **Button/Label**: Smooch Sans 0.95rem/1.2, weight 700, uppercase
- **Caption**: Smooch Sans 0.7rem/1.2, weight 400 (for dense data displays)

## Elevation

On map-first interfaces, elevation is expressed through semi-transparent overlays and border accents rather than traditional shadows. Level 0 uses pure #254252 (base map background). Level 1 uses rgba(37, 66, 82, 0.9) for location info cards and headers (9/10 opacity maintains readability while showing map context). Level 2 uses rgba(23, 28, 45, 0.5) for subtle shadow effects and transitional overlays. Interactive elements elevate through border-color changes (terracotta to emerald) rather than shadow depth. The map container sits at ground level with all UI elements floating above via semi-transparent surfaces.

## Components

- **Cards**: Location cards use semi-transparent background (rgba(37,66,82,0.9) or rgba(23,28,45,0.5)), terracotta bottom borders, 8px border-radius. Card titles centered with terracotta underline. Data displayed in definition lists with dashed terracotta borders — keys take 35% width (bold, uppercase), values take 65% (right-aligned). Hover transforms via link elements that invert colors (gold background, navy text).
- **Buttons**: Rounded rectangular (12px border-radius), #254252 background, 2px terracotta border, pale gold text, 10px/12px padding, uppercase weight 700. Hover changes border to emerald (#00a36c). Disabled state reduces opacity to 0.6. Icons (SVG) integrate inline with 15px/20px dimensions. Max-width 180px on desktop, full-width on mobile within constraints.
- **Select Dropdowns**: Custom-styled selects with same button aesthetic — 12px border-radius, 2px terracotta border, 9px/12px padding, uppercase weight 700. Focus state swaps border to emerald for accessibility. Width scales from 165px (mobile) to 280px (desktop).
- **Map Container**: Leaflet integration with custom popup styling. Popups use #254252 background, pale gold close button, 280px fixed width, 250px content width. Map height scales responsively: 480px base, 640px from 400px breakpoint, 720px on landscape tablets, full-height on portrait tablets.
- **Header**: Full-width, rgba(37,66,82,0.9) background, centered text, 1em padding. Contains title and subtitle. No bottom border — relies on content separation.
- **Footer**: Darker semi-transparent background (rgba(37,66,82,0.9)), centered text, 0.5em/1em padding, subtle top border (1px rgba(23,28,45,0.5)). Uppercase text maintains brand consistency.
- **Pre-Footer (SEO Section)** : Dark semi-transparent container featuring expandable content with inline SVG icons. Headers have controlled margins (1em top, 0.5em bottom). List items display as flex with icon alignment. Max-width 960px, centered, 2.5em top padding.
- **Location Info Toast**: Semi-transparent floating notification (rgba(37,66,82,0.9)), 12px border-radius, 1em padding, centered absolute positioning. On mobile: top-aligned, 95vw max-width. On desktop: bottom-aligned, 960px max-width. Text larger on desktop (1.3rem). Emerald green text for success states.
- **Loading Indicator**: Centered, emerald color, animated opacity pulsing (0% → 100% in 3-phase cycle). Includes optional icon with right margin.

## Layout

- **Grid System**: CSS Grid layout with explicit areas: 'header', 'main', 'section', 'footer'. Rows: auto, 1fr, auto, auto — main content takes remaining space. Min-height 100vh ensures footer stays at bottom.
- **Container Width**: Full-width flex containers with centered content. Cards use auto-fill grid: minmax(280px, 1fr) with 12px gap.
- **List Header Controls**: Absolute-positioned control bar containing buttons and selects. On mobile: bottom-aligned (0.5em from bottom), centered, gap 8px. On desktop: top-aligned (1em auto), padding 0 2em, gap 16px, z-index 1001 to float above map.
- **Breakpoints**:
  - 400px: Button/select expansion, map height increase
  - 768px: Typography scales up (hero 2.986rem), background image swaps (bg_large.webp), control bar repositions to top
  - 1024px: Conditional map height based on orientation (landscape: 720px, portrait: 100%)
- **Spacing Scale**: Uses rem-based spacing with 18px root font size. Common values: 0.25em, 0.5em, 0.75em, 1em, 1.5em, 2.5em. Gap spacing: 8px, 12px, 16px.

## Border Radius

- **4px**: No explicit usage (inherited browser defaults minimal)
- **6px**: Link buttons within cards
- **8px**: Location info cards, general containers
- **12px**: Buttons, selects, primary interactive controls
- **9999px**: Not used — design favors rounded rectangles over pills

## Background & Imagery

- **Mobile**: `bg_small.webp` — optimized for performance on smaller screens
- **Desktop**: `bg_large.webp` — higher resolution for larger displays
- **Behavior**: Fixed positioning, center-center alignment, cover sizing, no-repeat
- **Overlay Colors**: All UI surfaces use semi-transparent navy overlays (0.5 to 0.9 opacity) allowing background imagery to show through while maintaining readability

## Accessibility

- **Reduced Motion**: Media query detecting `prefers-reduced-motion` — disables all animations by forcing 0.01ms durations, removing transitions, and setting scroll-behavior to auto. Applied globally to all elements and pseudo-elements.
- **Focus States**: Select dropdowns and interactive elements display emerald border on focus, replacing terracotta for clear focus indication.
- **Color Contrast**: Pale gold (#eab56f) against navy (#254252) meets WCAG AA standards for body text. Off-white (#f8f9fa) against navy exceeds standards for headlines.
- **Responsive Typography**: Uses rem units and scales at breakpoints to maintain readability across devices.

## Do's and Don'ts

- Do design for map-first contexts — UI elements use semi-transparent backgrounds that let map imagery show through
- Don't use pure white text — pale gold and off-white reduce eye strain against dark navy backgrounds
- Do use uppercase typography sparingly for headers, buttons, and labels to establish visual hierarchy
- Don't rely on shadows for depth — use border colors and opacity layers instead
- Do respect reduced motion preferences — animations should degrade gracefully
- Don't forget the 18px root font size — all spacing scales from this foundation
- Do use terracotta as the primary accent color — emerald is reserved for success states only
- Don't make cards fully opaque — 0.9 opacity maintains connection to the map below
- Do test map interaction — controls must have sufficient z-index (1000-1001) to float above Leaflet layers
- Don't use complex animations on loading states — simple opacity pulses are sufficient and respectful of user preferences
