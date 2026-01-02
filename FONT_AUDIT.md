# Font Usage Audit & Configuration

## Font Strategy

The site uses **Vercel's Geist font family** with a strategic split:

- **Geist Sans**: Used for all body text, headings, navigation, CTAs, and general UI elements
- **Geist Mono**: Used for code blocks, technical numbers/stats, and monospace-specific content

## Font Configuration

### Layout (`src/app/layout.tsx`)
- Imports both `GeistSans` and `GeistMono` from `geist/font/*`
- Applies both font variables to the body: `${GeistSans.variable} ${GeistMono.variable}`
- CSS variables available:
  - `--font-geist-sans` for sans-serif text
  - `--font-geist-mono` for monospace text

### Tailwind Config (`tailwind.config.ts`)
- `font-sans`: Maps to Geist Sans (default body font)
- `font-mono`: Maps to Geist Mono (for code/technical content)
- `font-heading`: Maps to Geist Sans (for headings)
- `font-nav`: Maps to Geist Sans (for navigation)

### Global CSS (`src/app/globals.css`)

**Body Text:**
```css
body {
  font-family: var(--font-geist-sans), system-ui, ...;
  letter-spacing: -0.01em;
  line-height: 1.6;
}
```

**Headings:**
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-geist-sans), system-ui, ...;
  letter-spacing: -0.02em;
  line-height: 1.2;
  font-weight: 700;
}
```

**Prose (Blog Content):**
- Headings use Geist Sans with `-0.02em` letter spacing
- Code blocks use Geist Mono
- Body text uses Geist Sans

## Where Each Font Is Used

### Geist Sans (Primary Font)
✅ **Body text** - All paragraphs, descriptions, general content  
✅ **Headings** - All h1-h6 elements  
✅ **Navigation** - Site header, footer, mobile nav  
✅ **CTAs** - Buttons, links, call-to-action elements  
✅ **Forms** - Input fields, labels, form text  
✅ **Blog content** - Article text, descriptions, metadata  
✅ **UI elements** - Cards, badges, tooltips, etc.  
✅ **Persona pills** - Hero section persona selector buttons  
✅ **Availability banner** - "Available for new opportunities" pill  

### Geist Mono (Technical Font)
✅ **Code blocks** - Inline code, code blocks in blog posts  
✅ **Statistics/Numbers** - Hero section proof points (6+, 20+, 28%, etc.)  
✅ **Technical displays** - Numbers, metrics, data visualization  
✅ **Terminal/CLI content** - Command examples, technical snippets  

## Letter Spacing & Line Height

### Letter Spacing
- **Body text**: `-0.01em` (slight negative for modern look)
- **Headings**: `-0.02em` (tighter for larger text)
- **Code**: `0` (normal spacing for readability)
- **Navigation**: `-0.01em` (matches body)

### Line Height
- **Body text**: `1.6` (comfortable reading)
- **Headings**: `1.2` (tight, impactful)
- **Hero H1**: `1.15` (slightly tighter for large display text)
- **Prose paragraphs**: `1.75` (generous for long-form reading)

## Hero Section Optimization

### Changes Made to Reduce Busyness

1. **Reduced Spacing:**
   - Persona pills: `mb-3 sm:mb-4` (was `mb-4 sm:mb-5`)
   - Availability pill: `mb-4 sm:mb-5` (was `mb-6 sm:mb-8`)
   - H1: `mb-2 sm:mb-3` (was `mb-3 sm:mb-4`)
   - Subhead: `mb-5 sm:mb-6` (was `mb-6 sm:mb-7`)
   - CTA: `mb-6 sm:mb-8` (was `mb-6 sm:mb-8`)

2. **Reduced Text Sizes:**
   - H1: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl` (reduced from 7xl max)
   - Subhead: `text-sm sm:text-base md:text-lg` (reduced from `text-base sm:text-lg md:text-xl`)
   - Persona pills: `text-[10px] sm:text-xs` (smaller)
   - Availability pill: `text-xs` (smaller)

3. **Stats Section:**
   - Numbers: `text-lg sm:text-2xl lg:text-3xl` (reduced from `text-2xl sm:text-5xl lg:text-6xl`)
   - Labels: `text-[9px] sm:text-[10px] md:text-xs` (much smaller)
   - Gap: `gap-2.5 sm:gap-5 lg:gap-6` (tighter spacing)
   - Max width: `max-w-xl` (was `max-w-2xl`)
   - Opacity: `opacity-90` (slightly muted)

4. **Container:**
   - Max width: `max-w-3xl` (was `max-w-4xl`)
   - Added vertical padding: `py-8 sm:py-12` (prevents edge-to-edge on mobile)

## Mobile Optimizations

### Responsive Breakpoints
- **Mobile (< 640px)**: Smaller text, tighter spacing, 2-column grid for stats
- **Tablet (640px - 1024px)**: Medium sizes, flex layout for stats
- **Desktop (> 1024px)**: Full sizes, optimal spacing

### Mobile-Specific Adjustments
- Stats use 2-column grid on mobile (less overwhelming)
- Text sizes scale down appropriately
- Spacing reduces on smaller screens
- Persona pills are smaller and more compact

## Components Using Fonts

### Hero Component (`src/components/Hero.tsx`)
- **Persona pills**: `font-sans` (Geist Sans)
- **H1**: Inherits from global heading styles (Geist Sans)
- **Subhead**: Inherits from body (Geist Sans)
- **CTA button**: Inherits from body (Geist Sans)
- **Stats numbers**: `font-mono` (Geist Mono)
- **Stats labels**: `font-sans` (Geist Sans)

### Navigation (`src/components/SiteHeader.tsx`)
- Uses `font-nav` class (maps to Geist Sans)
- Font size: `0.875rem`
- Letter spacing: `-0.01em`
- Font weight: `500` for links, `700` for CTA

### Blog Components
- **BlogCard**: Uses `font-heading` for titles (Geist Sans)
- **PostContent**: Uses `font-mono` for code (Geist Mono)
- **Prose headings**: Use Geist Sans with optimized spacing

## Best Practices

1. **Use Geist Sans by default** - It's the primary font for all UI
2. **Use Geist Mono sparingly** - Only for code, technical numbers, or when monospace is specifically needed
3. **Maintain consistent letter spacing** - Use the defined values (-0.01em for body, -0.02em for headings)
4. **Optimize line heights** - 1.6 for body, 1.2 for headings, 1.75 for prose
5. **Mobile-first** - Always consider mobile experience when adjusting sizes

## Testing Checklist

- [x] Fonts load correctly on all pages
- [x] Body text uses Geist Sans
- [x] Headings use Geist Sans
- [x] Code blocks use Geist Mono
- [x] Stats/numbers use Geist Mono
- [x] Navigation uses Geist Sans
- [x] Letter spacing looks good
- [x] Line heights are readable
- [x] Mobile experience is optimized
- [x] Hero section is less busy
- [x] Build passes without errors

## Future Considerations

- Consider adding font-display: swap for better loading performance
- Monitor font loading performance
- Consider variable font weights if needed
- Review accessibility (contrast, readability)
