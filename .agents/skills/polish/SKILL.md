---
name: polish
description: "Final quality and finesse pass for UI. Refines spacing, icon alignments, micro-interactions, border definitions, typography scales, and responsive behavior. Part of the impeccable design suite."
---

# Polish (Impeccable Design Suite)

Polish is refinement, craft, and precision. It turns a working UI into a world-class interface.

## Core Passes

1. **Alignment & Spacing Finesse**:
   - Check icon vertical centering relative to adjacent text.
   - Standardize margin/padding scales across cards and page shells.
   - Refine subtle borders (`border-slate-200/90` or `border-slate-100`) rather than thick harsh borders.

2. **Typography Calibration**:
   - Ensure headings, tags, prices, and captions have distinctive weights (e.g. `font-bold` vs `font-medium`) and appropriate letter-spacing (`tracking-tight` on headings).
   - Use tabular figures or proper layout for numbers and prices so items align cleanly.

3. **Touch Feedback & Ergonomics**:
   - Add snappy tap feedback: `active:scale-[0.98]` or `active:bg-slate-100`.
   - Ensure sticky elements (header, bottom nav) blur cleanly (`backdrop-blur-md bg-white/90`) without content leaking awkwardly behind them.
