# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All commands should be run from the `app/` directory:

```bash
cd app/
```

### Common Development Tasks
- **Development server**: `npm run dev` (or `npm run dev -- --open` to auto-open browser)
- **Build production**: `npm run build`
- **Preview build**: `npm run preview`
- **Type checking**: `npm run check` (or `npm run check:watch` for watch mode)
- **Linting**: `npm run lint`
- **Formatting**: `npm run format`
- **Unit tests**: `npm run test:unit` (or `npm run test:unit -- --run` for single run)
- **E2E tests**: `npm run test:e2e`
- **All tests**: `npm run test`

### Deployment
- **Deploy to Cloudflare**: `npm run deploy`
- **Local Cloudflare preview**: `npm run preview:local` (runs on port 8788)

## Project Architecture

This is a **Planning Poker application** designed to streamline sprint planning for engineering teams with Backlog integration.

### Technology Stack
- **Frontend**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Cloudflare Pages (via `@sveltejs/adapter-cloudflare`)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Internationalization**: Paraglide JS with English, Japanese, Vietnamese support
- **Backend/Database**: Supabase (PostgreSQL + Realtime + Auth)
- **Integration**: Backlog OAuth API for issue management

### Key Directories
- `src/routes/` - SvelteKit pages and API routes
- `src/lib/` - Shared components and utilities, including Paraglide i18n setup
- `messages/` - Translation files (en.json, ja.json, vi.json)
- `e2e/` - Playwright end-to-end tests
- `static/` - Static assets

### Configuration Files
- `svelte.config.js` - SvelteKit configuration with Cloudflare adapter
- `wrangler.toml` - Cloudflare deployment configuration
- `paraglide.config.js` - Internationalization configuration
- `project.inlang/settings.json` - Translation project settings

### Business Context
This application solves a real workflow problem: eliminating manual CSV export/import between planning sessions and Backlog, reducing Scrum Master overhead by ~90% (from 2.5 hours to 15 minutes per sprint). The system enables:

1. **Real-time collaborative voting** on story points
2. **Automatic Backlog synchronization** via OAuth API
3. **Multi-team session management** for Scrum Masters
4. **Estimation rationale capture** for institutional knowledge

### Development Patterns
- Uses SvelteKit's file-based routing
- Configured for Cloudflare Pages deployment with specific route handling
- Internationalization handled through Paraglide with message format plugins
- TypeScript throughout with strict checking enabled
- ESLint + Prettier for code quality

### Testing Strategy
- Unit tests with Vitest and Testing Library
- E2E tests with Playwright
- Tests run against production build (`npm run build && npm run preview`)

### Quality Gates
The project aims for SonarQube Cloud integration with targets:
- Maintainability Rating: A
- Reliability Rating: A  
- Security Rating: A
- Technical Debt Ratio: <5%

Always run `npm run lint` and `npm run check` before committing to ensure code quality standards.