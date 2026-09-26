# Remove platform branding from the codebase

## Changes
- Rename the browser error-reporting file, types, and public helper to neutral project names while preserving the existing telemetry hook.
- Replace the branded Vite wrapper with an equivalent first-party TanStack/Vite configuration so development, SSR, routing, Tailwind, aliases, and production output continue working.
- Remove branded package/config references, duplicate ignore entries, and repository guidance; regenerate the dependency lockfile.
- Search all project-owned and generated files for remaining references, then verify compilation and the live exhibition on desktop and mobile without altering any visual code.

## Technical note
The browser telemetry property supplied by the hosting environment cannot be renamed at runtime. It will be accessed indirectly through a neutral adapter so the integration keeps working without a branded identifier appearing in source code.
