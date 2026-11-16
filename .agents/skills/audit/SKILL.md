---
name: audit
description: "Comprehensive UI/UX audit tool that evaluates accessibility, performance, visual hierarchy, mobile ergonomics, and consistency. Part of the impeccable design suite."
---

# Audit (Impeccable Design Suite)

Systematic UX, accessibility, and visual audit for web & mobile interfaces:

1. **Accessibility (WCAG AA)**:
   - Text contrast >= 4.5:1 against background.
   - Interactive targets >= 44x44px.
   - Screen-reader labels (`aria-label`) on icon-only buttons.

2. **Mobile Ergonomics**:
   - Thumb zone accessibility for frequent actions.
   - No horizontal scroll accidents.
   - Proper input viewport scaling (`maximum-scale=1.0` avoided or handled safely).

3. **Performance & States**:
   - Zero layout shifts during data fetch (skeleton states match actual card size).
   - Graceful offline and error fallbacks.
