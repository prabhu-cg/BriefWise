# BriefWise

Turn vague briefs into clear direction. AI-assisted UX/product brief refiner.

## Develop

```bash
npm install
npm run dev
```

## Architecture

- `app/` — landing (`/`), Refiner (`/refiner`), About (`/about`), `POST /api/refine`
- `lib/types.ts` — `RefinedBrief` result model
- `lib/refiner/` — `BriefRefiner` interface and implementations:
  - `ai.ts` — Vercel AI Gateway via the AI SDK, structured output validated by `schema.ts`
  - `preview.ts` — labelled placeholder used when no AI credentials are configured
  - `prompt.ts` — system prompt (know / assume / still need to know)
- `lib/rate-limit.ts` — best-effort per-IP limiter

## AI configuration

Requests run server-side only. Set `GROQ_API_KEY` (direct Groq, default `openai/gpt-oss-120b`), or `AI_GATEWAY_API_KEY` (see `.env.example`), or deploy
to Vercel with the project linked (OIDC). Without credentials the app serves the
clearly labelled preview result. Submitted text is never logged.

No database, auth, payments or integrations. The draft is kept in `localStorage`.
