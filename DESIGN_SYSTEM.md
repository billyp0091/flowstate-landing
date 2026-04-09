# FlowState Design System
## Style: Soft UI Evolution with Electric Indigo

---

### Color Palette

| Token            | Value                              | Usage                          |
|------------------|------------------------------------|--------------------------------|
| brand-500        | #6366F1                            | Primary CTA, accent            |
| brand-400        | #818CF8                            | Hover states, gradient ends    |
| brand-600        | #4F46E5                            | Pressed states, emphasis       |
| surface-base     | #0F0B1A                            | Page background                |
| surface-raised   | rgba(255,255,255,0.05)             | Glass panel fill               |
| surface-border   | rgba(255,255,255,0.10)             | Panel edge definition          |
| copy-primary     | #F1F0FB                            | Headings, body text            |
| copy-secondary   | #A5A2C8                            | Supporting copy, labels        |
| Accent gradient  | linear-gradient(135deg, #6366F1, #A855F7) | Hero CTA, highlights    |

### Typography (Inter, Major Third 1.25 scale)

| Level     | Size   | Weight | Tracking | Line Height |
|-----------|--------|--------|----------|-------------|
| Display   | 64px   | 700    | -0.02em  | 1.1         |
| H2        | 40px   | 600    | -0.01em  | 1.2         |
| H3        | 24px   | 600    | 0        | 1.3         |
| Body      | 16px   | 400    | 0        | 1.6         |
| Caption   | 14px   | 500    | 0.02em   | 1.5         |

### Spacing (8px base grid)

| Token          | Value  | Usage                   |
|----------------|--------|-------------------------|
| section-y      | 96px   | Vertical section padding|
| card-padding   | 32px   | Inner card padding      |
| component-gap  | 24px   | Between components      |
| inline-gap     | 8-16px | Inline element spacing  |

### Glass Effect Recipe

```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.10);
border-radius: 24px;
```

### Micro-Interactions

- **Card Hover:** translateY(-4px) + box-shadow glow (brand-500/8%)
- **Hero Entrance:** fadeInUp, 0.6s ease, 30px travel, stagger 0.15s
- **Bento Entrance:** fadeIn on scroll (viewport trigger), 0.5s, stagger 0.1s
- **Nav Scroll:** transparent → frosted glass transition (300ms)
- **Glow Pulse:** ambient background orbs, 4s ease infinite
