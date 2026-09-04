# Wachejazi — Implementation Map (Phase 0 baseline)

Live deploy: https://storefront-ten-flame.vercel.app/
Repo root: `/` (this file). App root: `storefront/`.

## Architecture

- **Framework**: Next.js 16.3.3, App Router, Turbopack. React 19.2.8 / react-dom 19.2.8.
- **Language**: TypeScript 5 (strict via `tsc --noEmit`, zero errors at baseline).
- **Package manager**: npm (`package-lock.json` in `storefront/`).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) + a Material Design 3 color-token system in `src/app/globals.css`, generated from a seed color via `@material/material-color-utilities` (`npm run generate-theme`). Light/dark handled via `@media (prefers-color-scheme: dark)`.
- **Component library**: `@material/web` (Lit-based web components: buttons, cards, icon, navigation bar/tab, radio, text field, badge). Wrapped for JSX via ambient module augmentation in `src/types/material-web.d.ts`. Loaded client-side once in `src/components/MaterialProvider.tsx`.
- **Motion**: `motion` (Framer Motion successor) via `src/components/MotionProvider.tsx` (`LazyMotion`) and per-component `motion/react` imports. Easing curves centralized in `src/lib/motion.ts`.
- **State management**: none (no Redux/Zustand/Context store). Cart is a **hardcoded mock array** in `src/lib/cart.ts` — no persistence, no add/remove mutation wired to UI yet (`ProductActions`'s "Add to cart" only flips local button state, it does not mutate the cart).
- **Data model**: static TypeScript array `PRODUCTS` in `src/lib/products.ts` (28 products), plus `CATEGORIES` (10 sport categories) and `AUDIENCES` (Men/Women/Kids). No CMS, no database, no API routes exist anywhere in the app.
- **Auth**: none. `/signin` and `/signup` (added this session) are **frontend-only mock forms** — no session, no real credential storage.
- **Search**: not implemented. The header has a search icon button with no handler.
- **Checkout/payment**: `/checkout` is a client form (name, phone, address/pickup, M-Pesa/Card/COD radio) that on submit routes to `/checkout/confirmation` with query params. **No payment gateway, no order backend, no M-Pesa integration exists.** This must not be presented as real payment processing.
- **Images**: **zero image assets in the repo** — no `public/` directory at all. Every "product image" surface today is text/icon-only (Material Symbols icons, category glyphs). This is a hard data gap for Phase 6's gallery requirement.
- **Environment variables**: none defined (no `.env*` files, no `next.config.ts` env wiring beyond defaults).
- **Testing**: no test runner configured, no test files exist. `npm test` is not a valid script.

## Baseline validation (before Phase 1+ work)

```
npm run lint       → PASS (no errors/warnings)
npx tsc --noEmit   → PASS (no errors)
npm run build      → PASS (52 static/SSG routes generated, 0 build errors)
npm test           → N/A, no test script/config exists
```

One pre-existing, framework-level console warning (confirmed present before any of this session's changes, via `git stash` A/B test): a React hydration attribute-mismatch warning caused by `@material/web`'s Lit custom elements rewriting their own attributes after upgrade (e.g. `md-icon-button`'s `aria-label` → `data-aria-label`). This is cosmetic/dev-only console noise from the third-party library, not an application bug, and is out of scope to "fix" without forking `@material/web`.

## Route inventory

```
/                          Home — hero, trust badges, audience/category grids, product grid,
                            testimonials*, newsletter signup*, footer
/men /women /kids          AudienceCatalog — product grid filtered by audience
/category/[slug]           10 sport categories — product grid filtered by category
/products/[slug]           Product detail — price, fit note, size selector, add-to-cart,
                            trust badges, related products ("goes well with")
/cart                      Mock 2-item cart, free-delivery progress, promo code*, totals
/checkout                  Contact/delivery/payment form → routes to confirmation
/checkout/confirmation     Order-placed screen with animated status stepper
/signin /signup            Frontend-only mock auth forms (added this session)
```
`*` = introduced last session; flagged for data-honesty remediation below.

## Data model (`src/lib/products.ts`)

```ts
type Product = {
  slug, name, category, audiences: ("Men"|"Women"|"Kids")[],
  price: string ("KSh 8,500"), blurb, description,
  sizes: string[], fitNote: string, returnWindowDays: number,
  // added last session:
  originalPrice?: string, badge?: "Best Seller"|"New"|"Low Stock",
  stockLeft?: number, pairsWith?: string[] (cross-sell slugs)
}
```
No `image`, `rating`, `reviewCount`, `brand`, or real `stock` quantity fields exist. `CATEGORIES` and `AUDIENCES` are similarly static with an `icon` (Material Symbols glyph name) rather than an image.

## ⚠ Data-honesty remediation required (found during Phase 0)

The previous session added several commercial UI touches that **fabricate data** in ways this spec's non-negotiable rules explicitly forbid. These will be corrected in Phase 1, before further "trust" UI is layered on:

| Item | File | Problem | Fix |
|---|---|---|---|
| Star ratings + review counts on every product | `lib/ratings.ts`, `Rating.tsx`, `ProductCard.tsx`, product page | Hash-derived **fake** ratings/review counts, presented as real | Remove from live UI; keep `Rating.tsx` as a ready-to-wire component for real review data |
| Testimonials with named customers | `Testimonials.tsx`, homepage | Invented customer names/quotes presented as genuine reviews | Remove from homepage |
| "Only N left in stock" | `products.ts` (`stockLeft`), product page | Invented inventory counts (6, 4) | Remove `stockLeft` values; keep the `Low Stock` badge type unpopulated until real inventory exists |
| Sale prices (`originalPrice`) on 3 products | `products.ts` | Invented discounts not backed by real pricing history | Remove the fabricated `originalPrice` values; keep the field/`SaleBadge` component for when real sale pricing exists |
| Mock order number on confirmation | `checkout/confirmation/page.tsx` | Presented as a real transaction/order ID | Remove |
| "Loyalty points earned" / referral KSh 500 | `checkout/confirmation/page.tsx` | Invented promotion/loyalty program that doesn't exist | Remove |
| "KSh 200 off" signup/newsletter incentive stated as fact | `Newsletter.tsx`, `signup/page.tsx` | Invented promo terms | Reword to generic, non-numeric copy or clearly mark as sample |
| "We confirm payment before you're charged" / "no double charges" | `checkout/page.tsx`, `cart/CartSummary.tsx`, `TrustBadges.tsx` | Asserts backend payment reconciliation that doesn't exist (Phase 8 explicitly forbids implying real payment processing) | Reword to describe the *intended* checkout flow without asserting it's already backend-verified |

`Best Seller` / `New` badges are kept: these are editorial merchandising flags a store owner sets deliberately (like a "New Arrivals" nav item), not fabricated *data* about sales history or inventory, so they don't fall under the banned categories the same way ratings/stock/reviews do.

## Known technical debt (pre-existing, not introduced this session)

- Cart is fully static (`CART_ITEMS` constant) — "Add to cart" buttons don't mutate it. Any real cart mutation needs client state (React context or similar) plus persistence (`localStorage`, since there's no backend).
- No product images anywhere — galleries, OG images, and structured-data `image` fields will need a documented placeholder strategy.
- No test tooling — Phase 17 QA will be manual (build/lint/typecheck + Playwright-driven visual smoke checks), not automated `npm test`.

## Files likely to change per phase

- **Phase 1 (design system + remediation)**: `products.ts`, `Testimonials.tsx` (removed from homepage), `Rating.tsx`/`ratings.ts` (unused from live UI), `checkout/confirmation/page.tsx`, `Newsletter.tsx`, `signup/page.tsx`, `checkout/page.tsx`, `CartSummary.tsx`, `TrustBadges.tsx`; new: `components/ui/*` primitives (skeleton, empty state, toast).
- **Phase 2**: `SiteHeader.tsx`, `BottomNav.tsx` (mega-menu / New & Sale nav entries only if backed by real flags).
- **Phase 3**: `app/page.tsx`.
- **Phase 4**: `ProductCard.tsx`.
- **Phase 5**: `category/[slug]/page.tsx`, `AudienceCatalog.tsx` (filters/sort).
- **Phase 6**: `products/[slug]/page.tsx`, `ProductActions.tsx`.
- **Phase 7**: `lib/cart.ts` → real client cart store, `CartSummary.tsx`, `cart/page.tsx`.
- **Phase 8**: `checkout/page.tsx`, new `lib/payment.ts` boundary.
- **Phase 9**: new `app/search` + a client-side search util.
- **Phase 10/11**: `Footer.tsx`, new FAQ section.
- **Phase 12–17**: cross-cutting audits, minimal targeted diffs.
