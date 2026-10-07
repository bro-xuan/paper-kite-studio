# NOTICE

**Paper Kite Studio** is a modified version of **Postiz**
(https://github.com/gitroomhq/postiz-app), created by Gitroom and its
contributors.

Postiz is licensed under the GNU Affero General Public License v3.0. Paper Kite
Studio is distributed under the same license; see [LICENSE](./LICENSE). All
upstream copyright notices are kept intact.

"Postiz" is a name used by its original authors. Paper Kite Studio is not
affiliated with or endorsed by Gitroom or the Postiz project. The Postiz name
has been removed from the user-facing interface. It still appears in internal
package names, code identifiers and import paths (left unchanged so upstream
fixes can be merged), and where the UI refers to upstream tools by name (for
example the `postiz` CLI on npm).

## Source code (AGPL-3.0 section 13)

Every user who interacts with Paper Kite Studio over a network can get the
complete corresponding source code from the "Source code" item in the app's
left menu. That link points to `NEXT_PUBLIC_SOURCE_CODE_URL`. Operators **must**
set it to a public repository containing the exact code they deploy, including
local modifications.

## Modifications

Based on upstream commit `a194e3f4` (2026-10-07). Changes made by Paper Kite:

- **Branding:** user-facing product name changed from "Postiz" to "Paper Kite
  Studio" in UI copy, page titles, translations (all locales), transactional
  email subjects and bodies, provider error messages and the MCP server name.
- **Logo and favicon:** new kite mark and wordmark
  (`apps/frontend/src/components/new-layout/logo.tsx`,
  `apps/frontend/src/components/ui/logo-text.component.tsx`,
  `apps/frontend/public/paper-kite-mark.svg`,
  `apps/frontend/public/paper-kite-wordmark.svg`, `favicon.ico`,
  `favicon.png`).
- **Theme:** primary color changed from purple (#612bd3) to cobalt (#2f4fe0),
  with tangerine (#ff7a2f) accents, in `apps/frontend/src/app/colors.scss` and
  in hardcoded color literals across the frontend. The email wrapper colors
  were updated to match.
- **Auth screen:** the upstream user-count claim and the Postiz testimonials
  were replaced with Paper Kite copy.
- **Removed Postiz-hosted links:** the Terms and Privacy links now come from
  `NEXT_PUBLIC_TERMS_URL` / `NEXT_PUBLIC_PRIVACY_URL` and are hidden when those
  are unset. The onboarding tutorial video comes from
  `NEXT_PUBLIC_TUTORIAL_VIDEO_URL`. Analytics domains (Plausible, Datafast)
  come from `PLAUSIBLE_DOMAIN` / `DATAFAST_DOMAIN` instead of being hardcoded
  to postiz.com.
- **AGPL source link:** added the "Source code" menu item described above.
- **Docs:** added `NOTICE.md` and `PAPER-KITE.md`.
