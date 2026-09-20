# Anime Cel Atelier

## Goal
Add one premium anime-inspired chapter without disturbing the exhibition’s existing pacing or visual language.

## What will change
- Add a lightweight “Cel Atelier” section using layered CSS perspective, SVG linework, and an existing official character image.
- Let pointer movement gently separate the ink, color, and light layers; touch devices receive a composed static version.
- Add restrained anime details: registration marks, frame numbering, translucent cel edges, a hand-drawn eye-line, and a short bilingual caption.
- Animate only while the section is visible and fully respect reduced-motion settings.
- Place the chapter in the existing story sequence and add it to the chapter navigation.

## Technical details
- No WebGL, 3D library, video, or new large asset.
- Reuse the current image set and Framer Motion already in the project.
- Use GPU-friendly transforms and opacity only; cap pointer updates with `requestAnimationFrame`.
- Keep colors in semantic design tokens and preserve horizontal overflow protection.
- Verify desktop and mobile layouts, interaction, console output, and animation performance in the browser.
