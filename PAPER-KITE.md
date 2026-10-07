# Paper Kite Studio

Paper Kite Studio is the client portal for **Paper Kite**, an AI-powered creative
agency for local businesses in the Netherlands (cafés, florists, barbers, yoga
studios). Clients use it to see, approve and schedule the posts we make for them
under our "Social & Ads" service.

It is a fork of [Postiz](https://github.com/gitroomhq/postiz-app) (AGPL-3.0).
Because of the AGPL, the code we deploy must stay open source and be offered to
every user. See [NOTICE.md](./NOTICE.md) for attribution and the list of changes.

Public source: https://github.com/bro-xuan/paper-kite-studio (`origin`, branch
`main`). Remote `upstream` points to gitroomhq/postiz-app. Push to `origin`
before every deploy so the published source matches what users run.

## Run it locally

Requirements: Node **22.x** (the repo pins `>=22.12 <23`; newer versions only
warn), pnpm 10 (via corepack), Docker.

```bash
# 1. Postgres, Redis and Temporal (plus pgAdmin / RedisInsight / Temporal UI)
pnpm run dev:docker        # = docker compose -f docker-compose.dev.yaml up -d

# 2. Env file
cp .env.example .env       # then edit, see below

# 3. Install, create the DB schema, run everything
pnpm install
pnpm run prisma-db-push
pnpm dev                   # frontend :4200, backend :3000, orchestrator, extension
```

Open http://localhost:4200. Temporal UI is at http://localhost:8080.

### Env vars that matter

Required (already in `.env.example` with working local defaults):

| Var | Local value |
| --- | --- |
| `DATABASE_URL` | `postgresql://postiz-user:postiz-password@localhost:5432/postiz-db-local` |
| `REDIS_URL` | `redis://localhost:6379` |
| `JWT_SECRET` | any long random string |
| `FRONTEND_URL` | `http://localhost:4200` |
| `NEXT_PUBLIC_BACKEND_URL` / `BACKEND_INTERNAL_URL` | `http://localhost:3000` |
| `IS_GENERAL` | `"true"` (keeps the modern UI) |
| `STORAGE_PROVIDER` | `local` (set `UPLOAD_DIRECTORY` too) |
| `TEMPORAL_ADDRESS` | defaults to `localhost:7233` |

Added by Paper Kite:

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SOURCE_CODE_URL` | **Required in production (AGPL section 13).** Target of the "Source code" menu item. Falls back to https://github.com/bro-xuan/paper-kite-studio. Keep that repo up to date with whatever is deployed. |
| `NEXT_PUBLIC_TERMS_URL`, `NEXT_PUBLIC_PRIVACY_URL` | Terms/privacy links on the sign-up form. The sentence is hidden until both are set. Set them before opening sign-up to clients. |
| `NEXT_PUBLIC_TUTORIAL_VIDEO_URL` | Embed URL for the onboarding video. If unset, a "your Paper Kite team will walk you through it" note is shown. |
| `PLAUSIBLE_DOMAIN`, `DATAFAST_DOMAIN` | Optional analytics. Unset means no Plausible and no Datafast domain. |

Leave these **unset** unless you mean it:

- `STRIPE_PUBLISHABLE_KEY` / `STRIPE_*`: setting them turns on Postiz's
  in-app billing (pricing wall, affiliate link, "Make UGC" upsell, billing FAQ).
  We bill through the agency, so keep them off. That UI still has upstream
  marketing copy (user counts, "$2 hold") that must be rewritten if it is ever
  enabled.
- `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_FACEBOOK_PIXEL`,
  `NEXT_PUBLIC_SENTRY_DSN`, `CHATBASE_TOKEN`: all optional. No upstream keys are
  hardcoded; each is off until we set our own.
- `POSTIZ_GENERIC_OAUTH`: any non-empty value (even `"false"`) shows a
  "Sign in with ..." button. Comment it out unless you configure SSO.
- `EMAIL_FROM_NAME="Paper Kite Studio"`, `EMAIL_FROM_ADDRESS`, `RESEND_API_KEY`:
  set these for transactional email. The sender name is also printed in each
  email's footer.

## Pull upstream fixes

```bash
git fetch upstream
git merge upstream/main          # on the paper-kite branch
```

Conflicts will mostly be in the files listed below. After a merge, check for new
user-facing "Postiz" strings and new purple literals:

```bash
grep -rn "Postiz" apps/frontend/src --include='*.tsx' | grep -v "Postiz CLI\|Postiz skill"
grep -rniI "#612bd3\|#fc69ff" apps/frontend/src
```

For translations, the rename was mechanical. Re-run it on new strings with:

```bash
grep -rlI --null "Postiz" apps/frontend/src libraries/react-shared-libraries/src/translation/locales \
  | xargs -0 perl -pi -e 's/(?<![#\w])Postiz(?![\w]| CLI| skill| Cloud| instance| version)/Paper Kite Studio/g'
```

Review the diff afterwards: it also catches code comments and marketing claims
that shouldn't be renamed (see the testimonials note in NOTICE.md).

Internal package names (`postiz-frontend`, `@gitroom/*`), code identifiers,
`POSTIZ_*` env vars and docker service names are deliberately **unchanged** so
upstream merges stay clean.

## Branding files touched

- Logo/mark: `apps/frontend/src/components/new-layout/logo.tsx`,
  `apps/frontend/src/components/ui/logo-text.component.tsx`
- Assets: `apps/frontend/public/paper-kite-mark.svg`,
  `apps/frontend/public/paper-kite-wordmark.svg`, `favicon.ico`, `favicon.png`
  (upstream `postiz*.svg` / `logo*.svg` are left in place, unused)
- Theme: `apps/frontend/src/app/colors.scss` (cobalt `#2F4FE0`, hover/secondary
  `#4062EF`, tangerine `#FF7A2F`, AI button `#E8611A`), plus purple literals in
  ~40 components and `global.scss`
- Runtime config: `libraries/react-shared-libraries/src/helpers/variable.context.tsx`,
  `apps/frontend/src/app/(app)/layout.tsx`
- Source-code link: `apps/frontend/src/components/layout/top.menu.tsx`
- Auth screen: `apps/frontend/src/app/(app)/auth/layout.tsx`,
  `apps/frontend/src/components/auth/register.tsx`
- Public post preview: `apps/frontend/src/app/(app)/(preview)/p/[id]/page.tsx`
- Onboarding: `apps/frontend/src/components/onboarding/onboarding.modal.tsx`
- Copy: page `metadata` titles under `apps/frontend/src/app/(app)/`, ~20
  components, all 16 `translation.json` locales
- Backend copy: `libraries/nestjs-libraries/src/services/email.service.ts`
  (email colors), users/organization services, Facebook/Threads/TikTok/Mastodon
  providers, MCP server name (`chat/start.mcp.ts`), agent tool prompts, Listmonk
  welcome subject, `apps/orchestrator/src/workflows/digest.email.workflow.ts`
  (digest subject; safe here because we have no in-flight workflows. Upstream's
  rule is to never edit deployed workflows, so don't repeat this kind of edit
  after we're live)

Not rebranded yet: the browser extension (`apps/extension`), the Node SDK
(`apps/sdk`, published upstream as `@postiz/node`), MCP UI widgets, and the
`docs.postiz.com` links in the developer settings (still the correct API docs).

## Next: integrate with the Paper Kite marketing site

The marketing site lives in `../small-business-marketing` (Next.js).

1. **Create posts from our portal.** The backend has a public API at
   `{BACKEND_URL}/public/v1` (header `Authorization: <org API key>`, from
   Settings > Developers / Public API). Endpoints cover `integrations` (list a
   client's connected channels), `upload` / `upload-from-url` (media) and
   `posts` (create, list, delete; supports `type: "draft"` so clients approve
   before publishing). The SDK in `apps/sdk` (`@postiz/node`) wraps it; to
   point it at our instance, pass our backend URL as the second constructor
   argument. Plan: our content pipeline calls `POST /public/v1/posts` with
   drafts per client, and the client approves in the Studio calendar or via the
   preview link (`/p/:id`).
2. **One org per client.** Map each Paper Kite client to an Organization and
   keep its API key server-side in our portal, never in the browser.
3. **SSO.** Use the generic OIDC login (`POSTIZ_GENERIC_OAUTH`,
   `POSTIZ_OAUTH_*` and the `NEXT_PUBLIC_POSTIZ_OAUTH_*` display vars) against
   one identity provider shared with the marketing site (e.g. Authentik, Zitadel
   or Clerk via OIDC), so "Log in" on the marketing site lands clients in the
   Studio already signed in. Set `DISABLE_REGISTRATION=true` once SSO works, so
   only invited clients get accounts.
4. **Providers that matter for local NL businesses**, in priority order:
   - Instagram (`instagram.provider.ts` via Facebook login, or
     `instagram.standalone.provider.ts`) needs `FACEBOOK_APP_ID/SECRET` and Meta
     app review for `instagram_content_publish`.
   - Facebook Pages (`facebook.provider.ts`) uses the same Meta app. Boosted
     posts ("Ads") are **not** in Postiz; they need the Marketing API in our
     own service.
   - Google Business Profile (`gmb.provider.ts`) needs
     `GOOGLE_GMB_CLIENT_ID/SECRET` and Google's Business Profile API access
     request (it can take weeks, so apply early).
   - TikTok (`tiktok.provider.ts` / `tiktok.business.provider.ts`) needs
     `TIKTOK_CLIENT_ID/SECRET` and TikTok app audit before public posting.
   - LinkedIn (`linkedin.provider.ts`, `linkedin.page.provider.ts`) needs
     `LINKEDIN_CLIENT_ID/SECRET`. Company pages need the Community Management
     API.

   Use `HIDDEN_PROVIDERS` to hide the other ~30 channels from the add-channel
   screen so clients only see these five.
5. **Publish the source** (public repo for this branch), set
   `NEXT_PUBLIC_SOURCE_CODE_URL`, and link "Source code" from the marketing site
   footer as well.
