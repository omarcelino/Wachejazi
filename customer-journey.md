# Wachejazi Customer Journey

Eight stages a sports shopper moves through on Wachejazi, before the tech stack is chosen. Each stage lists what the customer touches, what they're thinking, where the trip stalls, and what the site should do about it.

**Working persona** — a weekend player who needs the right gear before a specific match or session, not someday. Most of the calls below assume that time pressure, since it's what separates sport retail from general shopping.

## Confidence across the trip

Self-reported confidence at each stage, 1–10:

| Stage | Confidence |
|---|---|
| 01 Discover | 6/10 |
| 02 Browse & Search | 7/10 |
| 03 Product Detail | 7/10 |
| 04 Cart | 6/10 |
| 05 Checkout | 5/10 |
| 06 Payment | **4/10 — lowest point** |
| 07 Delivery & Confirmation | 8/10 |
| 08 Post-Purchase & Retention | 9/10 |

The dip at payment is the single highest-leverage fix on this map.

---

## 01. Discover

**Touchpoints**
- Search for a specific item ("size 44 running shoes")
- Instagram/TikTok ad for a new boot drop
- A teammate's WhatsApp link to a product

**Customer is thinking**
> "Is this a real shop, or another page that never ships?"

**Where it stalls**
The ad or search result lands on the homepage instead of the item shown, and price or stock can't be checked before clicking through.

**What the site should do**
Every ad and search snippet deep-links straight to the item pictured, with price and delivery estimate visible on first load.

## 02. Browse & Search

**Touchpoints**
- Homepage and sport categories: football, running, gym & training, team kits
- Filters — size, brand, price, in stock only

**Customer is thinking**
> "Show me what actually fits and is in stock, don't make me guess."

**Where it stalls**
Filtering by size still surfaces items out of stock in that size. Category names don't match how people actually search ("boots" vs. "cleats").

**What the site should do**
Treat size and stock as one filter, not two. Index the local terms people search with, alongside the catalogue's own naming.

## 03. Product Detail

**Touchpoints**
- Photos from multiple angles, size chart, reviews mentioning fit
- "Goes with this" — shin guards, grip socks, laces

**Customer is thinking**
> "Will this actually run true to size, and can I send it back if not?"

**Where it stalls**
One generic size chart is applied to every brand, even though a 42 in one boot runs differently than a 42 in another. Return window is buried in a footer policy page.

**What the site should do**
Put brand-specific fit notes ("runs half a size small") next to the size selector, and state the return window right there too.

## 04. Cart

**Touchpoints**
- Cart drawer with saved items
- Shipping estimate, promo code field

**Customer is thinking**
> "How much is delivery, and will this actually arrive before Saturday's match?"

**Where it stalls**
Delivery cost and arrival date only appear once checkout has already started — a common point to abandon the cart entirely.

**What the site should do**
Show delivery cost and an estimated arrival date directly in the cart, before checkout begins.

## 05. Checkout

**Touchpoints**
- Guest checkout or account creation
- Delivery address, method — doorstep or pickup point

**Customer is thinking**
> "I just want to pay — don't make me create an account for a football shirt."

**Where it stalls**
Account creation is forced before payment. Address forms are long, and there's no pickup-point option for people who aren't home during the day.

**What the site should do**
Guest checkout by default, address autofill, and a pickup-point option wherever doorstep delivery is unreliable.

## 06. Payment — lowest point

**Touchpoints**
- Payment method choice — mobile money, card, cash on delivery
- OTP or confirmation step

**Customer is thinking**
> "Is this actually secure — and if it goes through but the order doesn't show up, what then?"

**Where it stalls**
Payment can succeed with the provider while the order fails to register on the site, raising fear of a double charge. Too few methods for shoppers without a card.

**What the site should do**
Reconcile the provider's payment confirmation with the order record server-side before showing "paid," and lead with whichever method most of the audience actually uses.

## 07. Delivery & Confirmation

**Touchpoints**
- Order confirmation screen, SMS or email with tracking
- Courier handoff, unboxing

**Customer is thinking**
> "Did this actually get dispatched — and where is it right now?"

**Where it stalls**
Tracking links that don't update, or a courier call from an unfamiliar number with no order context attached.

**What the site should do**
One order-status page with live courier status, not just an email — and the courier's contact pre-loaded with the order number.

## 08. Post-Purchase & Retention

**Touchpoints**
- Review request, size exchange, restock alerts for consumables (grip socks, laces, tape)
- Loyalty points or repeat-order incentive

**Customer is thinking**
> "If the exchange is painless, I'll come back before the next match — no need to look elsewhere."

**Where it stalls**
A wrong size is treated as a fresh return-and-reorder, with no fast path for "same item, different size."

**What the site should do**
A one-tap size-exchange flow, and re-engagement timed to when consumables actually run out — not a generic newsletter schedule.

---

## Where to focus first

Ranked by how much confidence each fix recovers on the chart above.

1. **Fix payment-to-order reconciliation** — the single lowest point on the journey. Confirming the order server-side before showing "paid" removes the double-charge fear that drives cart abandonment at the worst possible moment.
2. **Surface delivery cost in the cart** — moving cost and arrival date earlier removes the most common reason a full cart never reaches checkout.
3. **Default to guest checkout** — removing forced account creation shortens the walk from "ready to pay" to paid, where hesitation is already highest.
