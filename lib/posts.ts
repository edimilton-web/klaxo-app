export type Post = {
  slug: string
  title: string
  date: string
  readTime: string
  description: string
  content: string
}

export const posts: Post[] = [
  {
    slug: "why-you-underestimate-subscription-spending",
    title: "The 89% Problem: Why Almost Everyone Underestimates What They Spend on Subscriptions",
    date: "July 17, 2026",
    readTime: "7 min read",
    description: "A 2,500-person US study found 89% got their subscription spending wrong. UK and EU data show the same blind spot. Here's why — and how to fix it.",
    content: `Ask someone how much they spend on subscriptions each month and they'll give you a number. Ask them to actually add it up, and the number changes. It always goes up, and usually by more than they'd guess.

## The study that measured the gap

In 2021, the consulting firm West Monroe surveyed 2,500 US consumers for its "State of Subscription Services Spending" report. Each person estimated their monthly subscription spend, then itemized it service by service.

- **89%** underestimated what they actually spent
- **66%** were off by more than $200 a month
- **13%** were off by more than $400 a month

West Monroe ran the same survey in 2018, and the gap had gotten wider by 2021 — not narrower. People weren't getting better at tracking this. They were getting worse, even as they spent more.

The study is US-based, so the dollar amounts won't translate directly to a European budget. But the underlying mechanism — confidently underestimating recurring costs — isn't a US quirk. It shows up wherever subscriptions do.

## The UK numbers aren't any better

Citizens Advice, the UK's national consumer rights charity, found that 13 million people in the UK have been charged for a subscription they didn't mean to sign up for, wasting an estimated £800 million between them. Separately, 47% of Brits said they'd been caught out by a forgotten annual subscription — the kind that renews once a year and is easy to lose track of between charges.

Widen the lens to Europe and it holds. YouGov surveyed subscribers across 17 markets and found only 38% had used all of their active subscriptions in the past six months. Put differently: for most subscribers, something on their card was billing quietly while going completely unused.

## Why this happens to careful people too

This isn't a discipline problem. It's a design problem.

Individual charges are too small to register. A €9.99 line item doesn't feel like real money the way a €300 purchase does — but ten of those add up to nearly €100 a month without a single charge ever feeling significant on its own.

Billing dates are scattered across the calendar and across payment methods. One renews on the 3rd, another in November, a third through the App Store instead of a card. There's rarely one statement where the full picture shows up at once.

Cancelling is harder than signing up, on purpose. Signup is one click. Cancelling often means hunting through settings menus or sitting through a "wait, are you sure?" flow built to make you give up halfway. That friction protects revenue, and services know it.

And free trials convert silently. A two-week trial that felt free turns into a real charge the moment nobody remembers to cancel it, and by the second month it's just another line nobody questions anymore.

None of this requires anyone to be careless. It just requires a normal amount of inattention applied to a system built to reward it.

## What the gap actually costs

Take the West Monroe number: 66% of people off by more than $200 a month. Even assuming the real gap in Europe runs smaller, this isn't a rounding error — it's a spending category large enough to matter.

A €150 monthly gap is €1,800 a year. Most households would notice that instantly if it landed as one annual bill. It goes unnoticed only because it never does.

## Closing the gap

The fix isn't complicated. It just requires doing the one thing most people skip: putting every subscription in front of you, in one place, at the same time.

Pull the last 60-90 days of bank and card statements and list every recurring charge, no matter how small. Check the App Store and Google Play separately — these rarely show up clearly on bank statements and are one of the easiest categories to forget entirely. Add up the annual cost, not the monthly one; a €4.99 charge looks negligible until it's €59.88 a year. Flag anything not used in the last month — on its own, this filter catches most of the obviously wasted spend. Then set a recurring check-in, quarterly is enough, because the West Monroe data shows the gap grows over time as new subscriptions pile onto old ones nobody cancelled.

Doing this once fixes today's problem. The habit is what keeps it fixed.

---

The 89% figure isn't really about financial discipline. It's what happens by default when recurring costs are split across a dozen services, a dozen billing dates, and two or three payment methods, with nothing forcing them into one view.

Most of that gap closes the moment someone actually sees the full list.
`,
  },
  {
    slug: "subscription-fatigue-europe",
    title: "Subscription Fatigue: Why Europeans Are Spending More Than Ever (Without Noticing)",
    date: "May 23, 2026",
    readTime: "6 min read",
    description: "The average European pays for 8-12 subscriptions but guesses four. Here's why the math is invisible — and how to fix it.",
    content: `You didn't sign up to spend €200 a year on subscriptions you don't use. Nobody does.

But if you're like most Europeans, that's roughly what's happening. Not because you made bad decisions — because the math is designed to be invisible.

---

## The €2 Problem

Individual subscriptions are cheap. That's the point.

€9.99 for Spotify. €8.99 for Netflix basic. €2.99 for iCloud. €15.99 for NOS. None of these feel like a big deal when you sign up. And none of them feel like a big deal when the charge hits your account months later, buried in a bank statement between the supermarket and the pharmacy.

This is price creep — not one big expense, but dozens of small ones that quietly compound.

The average European household now pays for 8 to 12 active subscriptions. Most people, when asked to guess, say four or five.

---

## How It Happens

Subscriptions are built to be forgotten. That's not an accident.

Free trials convert to paid plans on a specific date, usually buried in the confirmation email you didn't read. Annual plans renew automatically with no notification. Prices go up by €1 or €2 — small enough to miss, consistent enough to matter.

Streaming services have been especially aggressive about this. Netflix, Disney+, and Amazon Prime have all raised prices in European markets multiple times since 2021. Each increase was announced. Most subscribers didn't notice until weeks later, if at all.

Vodafone, NOS, and MEO bundles follow the same pattern. The promotional rate expires. The standard rate kicks in. The difference on your direct debit is subtle enough that most people assume it's normal variation.

It isn't.

---

## The Real Cost

Run the numbers on a typical European household:

- Streaming video (Netflix + Disney+): €22/month
- Music (Spotify family): €17/month
- Cloud storage (iCloud 200GB): €3/month
- Mobile operator extras: €10/month
- Productivity software (Microsoft 365): €7/month
- News or reading apps: €10/month
- Fitness or wellness app: €10/month
- One forgotten free trial still charging: €8/month

That's €87/month — just over €1,000 per year — before you count anything you've genuinely stopped using.

Most households have at least two or three subscriptions in that last category.

---

## Why It's Hard to Track

Banks don't help. Most banking apps group recurring charges under vague labels like "services" or "digital." You can see that €9.99 left your account. You can't easily see that it's the same charge that quietly went from €7.99 six months ago.

Spreadsheets work, but barely. You have to update them manually, remember to check them, and know what you're even looking for. Most people set one up, use it for a week, and never open it again.

The problem isn't discipline. Tracking subscriptions manually requires more effort than the saving feels worth — right up until you actually add it all up.

---

## What's Changed in Europe

The subscription model has expanded well beyond streaming. In Portugal, Spain, and across northern Europe, people are now paying monthly for:

- News publications that used to be free
- Fitness apps that replaced gym memberships (and sometimes run alongside them)
- Software that used to be a one-time purchase
- Cloud storage that grows in small increments
- Mobile and broadband bundles with add-ons that auto-renew quietly

Open Banking regulations (PSD2) have made it easier for apps to connect to bank accounts and surface this data automatically. That's genuinely new. A few years ago, the only way to find forgotten subscriptions was to go through your statements line by line.

---

## The Fix Is Simple, If Annoying

The first step is visibility. Most people who actually audit their subscriptions — even once, even manually — cancel something. Usually more than one thing.

The second step is a system that doesn't require constant maintenance. A dedicated tracker with renewal dates and euro amounts is more useful than a spreadsheet because you don't have to remember to update it.

The third step is a habit. Reviewing your subscriptions once a quarter takes about ten minutes. It's one of the few financial checks that consistently finds money you didn't know you were losing.

---

## Klaxo

Klaxo is a subscription tracker built for the European market. It shows all your subscriptions in euros, tracks renewal dates, and alerts you before you're charged for something you forgot about.

No dollar conversions. No features built around US-only services. Just a clear view of what you're paying and when.

[Track your subscriptions free at klaxo.app](https://klaxo.app)
`,
  },
  {
    slug: "bobby-app-alternative-europe",
    title: "Bobby App Alternative: What Europeans Should Use Instead",
    date: "May 17, 2026",
    readTime: "7 min read",
    description: "Bobby works. It just hasn't changed in years — and it was never built for Europe.",
    content: `Bobby has been around since 2015. For a while, it was the best option for tracking personal subscriptions on iPhone — clean design, simple concept, no unnecessary features. You added your subscriptions manually, set the billing dates, and Bobby reminded you before they renewed.

That was the pitch. It still works, more or less. The problem is that very little has changed since then.

---

## What Bobby does well

To be fair: Bobby is genuinely good at what it does. The interface is clean. Adding a subscription takes about 30 seconds. It supports multiple currencies, which matters if you're in Europe. The notifications work.

For someone who wants a basic list of their subscriptions with renewal reminders, Bobby is fine.

The issue isn't what Bobby does. It's what Bobby doesn't do — and what it hasn't added in years.

---

## Why Bobby falls short for European users in 2026

### No automatic detection.
Every subscription in Bobby is manual. That's not inherently bad — some people prefer it. But when you forget you even have a subscription (which is the whole point of tracking them), manual entry doesn't help. You can only add what you remember.

### iOS only.
If you use Android, Bobby doesn't exist for you. There's no web version either. Your subscriptions live on one device, in one app, with no way to access them from a browser or share them with a partner.

### No bank connection.
Bobby has no Open Banking integration, no ability to scan your bank statements, no way to detect subscriptions you've missed. In the US, apps like Rocket Money can do this automatically. In Europe, PSD2 makes it technically possible — but Bobby hasn't built it.

### Stagnant development.
The app's last significant update was years ago. The core feature set hasn't changed. In a space where European banking infrastructure (PSD2, Open Banking) is becoming more capable, Bobby is standing still.

### One-time payment model.
Bobby charges a one-time fee to unlock full functionality. That sounds like a good deal — and it was, in 2018. The problem is that a one-time payment model doesn't fund ongoing development. There's no recurring revenue incentive to add features, fix bugs, or integrate with new banking APIs.

---

## Who actually needs a Bobby alternative

Not everyone. If you're on iPhone, you only have a handful of subscriptions, and you're happy entering them manually, Bobby works fine.

You probably need something different if:

- You're on Android and Bobby isn't an option
- You want to access your subscriptions from a browser, not just your phone
- You want automatic detection of recurring charges (or at least a clearer path to it)
- You want a product that's still being actively developed
- You need something that works correctly with European banks, currencies, and data protection requirements

---

## The alternatives — what's actually available

### Subtrack (iOS and macOS)
Subtrack is the closest thing to Bobby on Apple devices — simple, manual, focused on subscription tracking. It looks good, supports multiple currencies, and handles the basics.

The limitations are similar: no bank connection, no Android, no web version. If you're in the Apple ecosystem and Bobby doesn't work for you, Subtrack is worth trying. Outside the Apple ecosystem, it's not an option.

### ReSubs (iOS, Android, Web)
ReSubs is the most complete dedicated subscription tracker available right now. It works across platforms, supports multiple currencies, has trial reminders and cancel guides, and gives you a proper breakdown of your spending.

The downsides: it's not free. The premium tier is required for full functionality, and it's priced higher than most alternatives. There's also no bank connection — everything is still manual.

For someone who wants the most capable manual tracker and doesn't mind paying more, ReSubs is the best option currently available.

### Rocket Money (US only)
Rocket Money is what the European market is missing. It automatically detects subscriptions by connecting to your bank account, can negotiate bills on your behalf, and has a genuinely powerful feature set.

It also requires a US bank account. For European users, it's completely unusable. It's listed here because it represents what's possible — and what European users don't currently have access to.

### Klaxo (Web, iOS, Android — built for Europe)
Klaxo was built to fill the gap that Rocket Money left in Europe. The starting point is similar to Bobby — add your subscriptions manually, get notified before renewals, see your real monthly cost. But the roadmap and infrastructure are different.

**What Klaxo does now:**
- Manual subscription tracking across all platforms (web, iOS, Android)
- Renewal alerts via email, 5 days before every charge
- Monthly spending summaries
- Dashboard showing total monthly and annual cost by category
- Euro support with full GDPR compliance
- Free plan for up to 5 subscriptions

**What's coming:**
- Open Banking integration via PSD2 — automatic detection of subscriptions from European bank accounts
- Price increase alerts when a service raises its rates
- Shared subscription tracking for couples and households

The key difference from Bobby isn't just the feature set — it's the development trajectory. Klaxo is a product being actively built for the European market, with bank integration as a planned feature rather than something that was never considered.

**Pricing:** Free for up to 5 subscriptions. Pro is €3,99/month or €29/year.

---

## Which one to choose

**If you're on iPhone only and want something simple and free:** Bobby still works. It's not being developed, but it functions.

**If you're on Android or want a web version:** Bobby isn't an option. Try ReSubs if you're willing to pay, or Klaxo if you want a free starting point.

**If you want the most complete manual tracker available:** ReSubs is currently the most capable option, though it costs more.

**If you want something built specifically for Europe — with a path to automatic bank detection:** Klaxo is the only option building toward that. The manual tracking works today, and Open Banking integration is in development.

**If you need automatic detection right now:** Honest answer — there's no European solution that does this reliably yet. Rocket Money works brilliantly, but only in the US. Klaxo's Open Banking integration will change this when it launches, but it's not live yet.

---

## Frequently Asked Questions

### Is Bobby still being updated in 2026?
Bobby has seen minimal development in recent years. The core functionality works, but no significant new features have been added. For users who need more than basic manual tracking, it's worth considering alternatives.

### Does Bobby work with European banks?
No. Bobby has no bank connection at all — everything is entered manually. There's no integration with European banking APIs or Open Banking.

### What's the best free subscription tracker for Europe?
Klaxo offers a free plan for up to 5 subscriptions with renewal alerts and a dashboard. For more subscriptions, the Pro plan is €3,99/month.

### When will Klaxo add automatic subscription detection?
Open Banking integration via PSD2 is in active development. It will allow Klaxo to automatically detect subscriptions from European bank accounts — similar to how Rocket Money works in the US.
`,
  },
  {
    slug: "how-to-cancel-forgotten-subscriptions",
    title: "How to Cancel Subscriptions You Forgot You Had",
    date: "May 16, 2026",
    readTime: "7 min read",
    description: "Find everything that's charging you — and actually cancel it, including the ones that make it deliberately difficult.",
    content: `
At some point, you signed up for something, used it for a while, and then just... stopped. The subscription didn't stop. It kept going. It's probably still going right now.

This happens to everyone. It's not carelessness — it's the result of how subscription businesses are designed. Cancellation is never the obvious next step. There's always a reason to wait one more month.

Here's how to find everything that's charging you and actually cancel it.

**Step 1: Find your subscriptions before you cancel anything**

The most common mistake is trying to cancel individual subscriptions from memory. You'll miss half of them. Start with a proper audit first.

**Check your bank statements**

Go back at least 90 days — ideally 6 months. Filter for recurring charges. Look for anything that appears more than once at roughly the same amount. Make a list.

Pay attention to charges in foreign currencies (common with US-based services); small amounts you've stopped noticing (€0.99, €2.99, €4.99); and annual charges you've forgotten about that hit once a year.

**Search your email**

Search for these terms one at a time: "subscription," "receipt," "invoice," "payment confirmation," "your plan," "billing," and "renewal."

You will find things you forgot existed. Everyone does.

**Check your app stores**

Both Apple and Google track subscriptions made through their platforms. On iPhone: Settings → your name → Subscriptions. On Android: Google Play → Profile icon → Payments & subscriptions → Subscriptions.

These often contain surprises — apps that offered a free trial, apps you downloaded once and never opened again.

**Check PayPal and other payment services**

If you use PayPal, log in and go to Settings → Payments → Manage automatic payments. This shows everything that's been authorised to charge you automatically.

**Step 2: Decide what to keep**

Before cancelling everything, it's worth being honest about what you actually use.

The question isn't "have I used this in the last month?" It's "would I sign up for this today if I didn't already have it?"

If the answer is no, cancel it. Common categories where people find wasted money:

**Streaming services you're doubling up on.** Most households have more streaming subscriptions than they watch. Pick the ones you genuinely use most weeks. Cancel the rest — you can always resubscribe for a specific series.

**Old cloud storage plans.** When you switched phones or computers, you might have signed up for new cloud storage without cancelling the old one. Check iCloud, Google One, Dropbox, and OneDrive separately.

**Apps that felt essential at signup and now feel optional.** Meditation apps, language learning, productivity tools. If you haven't opened it in three months, you're not going to.

**Free trials you forgot to cancel.** These are usually small amounts — €5 to €15 — which is exactly why they survive unnoticed for months.

**Step 3: Actually cancel them**

This is where things get deliberately complicated. Services make cancellation hard on purpose. Here's what to expect.

**The direct route**

Most subscriptions can be cancelled by logging into the service, going to Account → Settings → Billing or Subscription, and finding a cancel or downgrade option. Sounds simple. Often isn't.

**What services do to stop you**

"Are you sure?" screens that ask you to reconsider, sometimes multiple times. Offers of a discounted month if you stay. Confusing options where "pause" and "cancel" look similar. Cancellation flows that require you to call a phone number — yes, this still happens in 2026.

The most important thing: cancellation usually takes effect at the end of the current billing period. You've already paid for the rest of the month (or year). Don't let this stop you — cancel anyway. The charge has happened. The question is whether you want it to happen again.

**Platform-based cancellations**

If you subscribed through the App Store or Google Play, you cancel through the platform, not the service itself. On iPhone: Settings → your name → Subscriptions → select → Cancel. On Android: Google Play → Subscriptions → select → Cancel subscription.

This matters because cancelling directly with the service sometimes doesn't stop the platform charge, and vice versa.

**Services that make it genuinely difficult**

Some services require you to contact customer support to cancel. Use live chat if available. Send an email explicitly stating you want to cancel and asking for confirmation in writing.

In the EU, companies are legally required to allow cancellation through the same channel you signed up. If you signed up online, they cannot legally force you to cancel by phone. Worth knowing.

**Step 4: Track what you cancelled and when**

After you cancel, keep a record of what you cancelled, when the cancellation takes effect, and what the last charge will be.

Check your bank statement the following month to confirm nothing slipped through. Some services have bugs in their cancellation flow — rare, but it happens.

If you've cancelled a lot of things at once, a subscription tracker makes this easier. Klaxo lets you mark subscriptions as cancelled without deleting them from your history, so you have a record of what was cancelled and when.

**Services that are notably annoying to cancel**

**Adobe Creative Cloud** — Adobe charges a cancellation fee if you cancel before your annual contract ends — often 50% of the remaining months. Check your plan type before cancelling. If you're on a monthly plan, cancellation is straightforward. If you're on an annual plan billed monthly, expect a fee.

**Amazon Prime** — Amazon lets you cancel, but the flow involves multiple "are you sure?" screens and an offer to pause instead. Go to Account → Prime → Manage membership → End membership. Confirm through the subsequent screens without clicking the pause option.

**Gym and fitness apps** — Many fitness apps have a cancel option in settings. Physical gym memberships in Portugal and Spain often require written notice, sometimes 30 days in advance. Check your original contract.

**VPN services** — Most offer refund windows (usually 30 days). If you're within the window, you can sometimes get a refund as well as a cancellation. Worth checking before just cancelling.

**After you've cancelled**

**Set up alerts for future renewals.** The reason you had forgotten subscriptions in the first place is that nothing told you before the charge happened. A subscription tracker with renewal alerts means you get notified 5 days before any charge — enough time to decide whether you still want it.

**Review annually.** Subscriptions accumulate over time. What makes sense today might not in a year. A 30-minute review once a year keeps the list manageable.

**A note on how this happens in the first place**

It's worth being clear about something: forgotten subscriptions aren't a personal failing. They're a product feature.

Every decision in a subscription product's design — the free trial length, the cancellation flow complexity, the timing of price increase notices — is made to maximise retention. Some of it is fine (good products should be easy to keep). Some of it is deliberately friction-heavy (bad products make leaving hard on purpose).

The fix is visibility. If you can see what you're paying for, you can make actual decisions about it. If it's invisible, you keep paying whether you're using it or not.

That's the problem Klaxo solves. Track what you have, get notified before renewals, see the real cost. It doesn't cancel things for you — that's still your job — but it makes sure you're making the decision consciously rather than by default.

**Frequently Asked Questions**

**Can I cancel a subscription that already renewed?** Usually not for the current period — the charge has happened. You can cancel to prevent the next renewal. Some services offer refunds within a short window after renewal; check their refund policy.

**What if I can't find the cancellation option?** In the EU, companies must allow you to cancel through the same channel you signed up. Contact customer support directly and explicitly request cancellation. Get it in writing (email).

**Will I lose my data if I cancel?** Usually yes, eventually. Most services give you a grace period (30–90 days) where your account is deactivated but data is preserved. Export anything you need before cancelling.

**How do I cancel a subscription I signed up for years ago and can't remember the login for?** Try password reset with the email you used at the time. If you no longer have access to that email, contact support with payment proof (bank statement showing the charge) and request cancellation.

[Keep track of all your subscriptions and get notified before renewals at klaxo.app](https://klaxo.app)
  `,
  },
  {
    slug: "how-much-europeans-spend-on-subscriptions-2026",
    title: "How Much Are Europeans Really Spending on Subscriptions? (2026 Data)",
    date: "May 16, 2026",
    readTime: "7 min read",
    description: "Most people guess around €50/month. The real number is nearly four times that — and here's why.",
    content: `
Most people, when asked how much they spend on subscriptions each month, guess low. Not a little low — significantly low. By about half.

That's not a personality flaw. It's just how subscriptions work. They're designed to be invisible. Small amounts, automatic payments, no invoice, no decision. They leave your account quietly, and you stop thinking about them.

The problem is that "small amounts" across twelve different services adds up to something that isn't small at all.

**The actual numbers**

Research from across Europe puts the average somewhere between €150 and €200 per month per household in subscription costs. Klaxo's own data from early users lands around €130 for individuals — higher for households.

That's €1,560 to €2,400 per year. On things you may or may not be using.

For context: that's more than most European households spend on electricity. More than a return flight to New York. For many people, it's more than a month's rent was a decade ago.

**Why the number is always higher than people expect**

There are a few reasons the gap between "what I think I spend" and "what I actually spend" is so consistent.

**Frequency distortion.** When you pay €9.99 per month, your brain registers it as "less than €10." But €9.99 per month is €119.88 per year. Most people don't do that conversion automatically — and services know this, which is why monthly billing is the default.

**The forgetting problem.** You remember the subscriptions you use this week. You don't remember the ones you signed up for three years ago and stopped using eight months in. Those keep charging.

**Free trials that became paid.** This one catches everyone eventually. You sign up, forget to cancel, and the charge appears. If you don't catch it immediately, it often continues for months before you notice.

**Price increases you didn't notice.** Netflix, Spotify, Amazon Prime, Adobe — all of them have raised prices in the last two years. If you set up a payment and stopped checking, you're probably paying more than you think for several services.

**The "I'll cancel next month" tax.** There's always a reason to not cancel now. You're about to watch something. It's only a few euros. You'll sort it out later. Later doesn't come, and the charge does.

**What Europeans are actually subscribed to**

Based on usage data and surveys from 2024–2026, the most common subscription categories for European consumers are:

**Streaming video** — Netflix, Disney+, Max, Apple TV+, local services like Canal+. Most households have at least two, often three. The average cost across the EU is around €28/month for this category alone.

**Music** — Spotify, Apple Music, Tidal. Usually one, sometimes two (family and individual plans running at the same time).

**Cloud storage** — iCloud, Google One, Dropbox, OneDrive. Particularly sneaky because the charges are small (€0.99 to €9.99/month) and the reminder to upgrade comes from Apple or Google directly, so it feels almost automatic.

**Software** — Adobe Creative Cloud, Microsoft 365, Notion, password managers, VPNs. These range widely. Adobe alone costs €54.99/month for the full package.

**Gaming** — PlayStation Plus, Xbox Game Pass, Nintendo Switch Online. Increasingly common, especially in households with teenagers.

**Fitness and wellness** — gym apps, meditation apps, running trackers. The January effect is strong here: sign up, use for six weeks, forget.

**News and reading** — The Guardian, Le Monde, Spotify podcasts, Readwise, Kindle Unlimited.

Add a few of these up and you get to €130/month faster than most people expect.

**The European-specific problem**

There's a wrinkle that affects European consumers more than Americans: currency and bank visibility.

In the US, services like Rocket Money can automatically detect subscriptions by connecting to your bank account and scanning for recurring charges. That works because US banking infrastructure (Plaid, mostly) supports it.

In Europe, the equivalent — Open Banking under PSD2 — exists but isn't as widely integrated into consumer tools yet. Most subscription trackers on the market were built for the US and simply don't connect to European banks.

That means European consumers are more dependent on manually tracking what they're paying for, which most people don't do.

The result is predictable: more forgotten subscriptions, more price increases missed, more money leaving accounts quietly.

**What happens when you actually look**

This is the part nobody warns you about. When you sit down and list every subscription you have, the reaction is almost always the same: surprise, then mild embarrassment, then determination to cancel things.

Klaxo users who go through this process find an average of 2–3 subscriptions they'd forgotten about entirely. Not services they chose to keep — services they genuinely didn't know were still charging them.

At €9.99 each, that's €20–30/month in charges that aren't providing any value. €240–360/year.

The subscriptions people cancel most often, once they can see everything in one place: old cloud storage plans from a previous phone still running on a different account; streaming services they switched away from but never cancelled; free trials from 6–18 months ago; duplicate services (two music subscriptions, two cloud plans); apps that offered a "free month" and then just continued.

**A practical way to figure out your number**

If you want to know what you're actually spending, the fastest approach is this:

Open your bank app and filter transactions for the last 90 days. Look for anything that recurs — same amount, same company, roughly monthly or annual. Make a list.

Then go to your email and search for "receipt," "invoice," "payment confirmation," and "subscription." You'll find services you forgot existed.

Add them up. Include annual charges divided by 12.

Most people find the exercise takes about 20–30 minutes and produces a number that surprises them.

If you'd rather have something track this automatically, Klaxo does it without connecting to your bank — you add subscriptions manually in about 30 seconds each, and it shows you the running total, alerts you before renewals, and sends a monthly summary.

**The psychology of subscription spending**

There's a reason subscription businesses have grown so aggressively over the last decade. Recurring revenue is good for businesses — and the mechanics of subscription payments are good for keeping customers paying even when they're not particularly engaged.

Automatic renewal removes the decision. You don't choose to keep Netflix each month. You'd have to actively choose to leave. Most people don't.

Small amounts reduce scrutiny. A €12.99 charge doesn't prompt the same review as a €200 one. But €12.99 twelve times a year is €155.88.

This isn't a conspiracy — it's just how the business model works. Knowing it doesn't make you immune to it, but it does help explain why your subscription spending is probably higher than you think.

**Frequently Asked Questions**

**What is the average subscription spend per month in Europe?** Research suggests between €130 and €200 per month per household, depending on country and household size. Individual spend tends to be lower, around €80–130/month.

**Which countries in Europe spend the most on subscriptions?** UK, Germany, and France tend to top the list, partly due to higher average incomes and earlier adoption of streaming services. Portugal, Spain, and Italy are catching up fast.

**How can I find out all my active subscriptions?** Check your bank statements for recurring charges and search your email for "subscription" and "receipt." For an ongoing view, a subscription tracker like Klaxo shows everything in one place and alerts you before renewals.

**Is it possible to spend less without cancelling things I actually use?** Yes. Switching from monthly to annual billing saves 20–40% on most services. Sharing family plans reduces per-person cost. And simply knowing what you have makes it easier to cut what you don't use.

**Worth knowing before you calculate**

One thing to be aware of: your subscription spending is a moving target. Prices go up — often quietly, often mid-year. What you were paying six months ago is probably not what you're paying now for several services.

That's another reason a static list doesn't work long term. The number changes. The services change. People's circumstances change.

The goal isn't to get to zero subscriptions. It's to know what you have, decide what's worth keeping, and not pay for things you've forgotten about.

That's a pretty achievable bar. Most people just haven't set up a system to meet it.

[Track your subscriptions for free at klaxo.app](https://klaxo.app)
  `,
  },
  {
    slug: "best-subscription-tracker-europe-2026",
    title: "Best Subscription Tracker App for Europe in 2026",
    date: "May 14, 2026",
    readTime: "8 min read",
    description: "We compared every major app. Here's what actually works for European users — and what doesn't.",
    content: `
**The Problem With Most Subscription Trackers**

You've probably noticed it too.

You search for a subscription tracker, find something that looks good, and then — it only works with US bank accounts. Or it charges in dollars. Or it lists 200 banks, none of which are yours.

Most subscription management apps were built for Americans, by Americans. That's not a criticism — it's just the reality of where the market started. But if you're based in Portugal, Spain, Germany, France, or anywhere else in Europe, these tools have a fundamental problem: they weren't built for you.

This guide compares the most popular subscription tracker apps available in 2026, with an honest focus on what actually works for European users.

**Why Europeans Need a Different Solution**

Before we compare apps, it's worth understanding why the problem is different here.

**Currency complexity.** Europeans deal with euros, pounds, Swiss francs, and sometimes multiple currencies at once. Most US apps only natively support USD.

**Open Banking (PSD2).** Europe has PSD2 — a regulatory framework that allows apps to securely connect to your bank with your permission. This is more standardised and privacy-forward than the US equivalent, but requires apps to integrate with European banking APIs specifically.

**GDPR.** European users are rightly cautious about apps that share financial data with advertisers. Most US apps have privacy policies that would raise flags under GDPR.

**Different services.** Europeans subscribe to different things — local streaming platforms, European cloud storage providers, country-specific gym chains. Apps built around US services often miss these entirely.

**The Apps We Compared**

**1. Rocket Money — Verdict for Europe: 0/5**

Rocket Money is arguably the most powerful subscription tracker available — if you live in the US. It automatically detects subscriptions, can negotiate bills on your behalf, and has a slick interface.

For Europeans, it's essentially unusable. It requires a US-based bank account, charges in USD, and its automatic detection doesn't work with European banks. If you're reading this from Lisbon, Madrid, or Berlin, move on.

**2. Bobby App — Verdict for Europe: 3/5**

Bobby has been around since 2015 and built a loyal following. It's clean, simple, and gets the job done for basic subscription tracking. You add your subscriptions manually, set billing dates, and Bobby reminds you before renewals.

The limitations are real: it's iOS-only, there's no bank connection, the free tier is very limited, and the app hasn't evolved much in years. No dashboard, no spending trends, no web version.

**3. Subby (Android) — Verdict for Europe: 3/5**

Subby fills the gap for Android users that Bobby leaves open. It's free, lets you track unlimited subscriptions manually, and sends notifications before billing dates. It supports multiple currencies, which is a plus for Europeans.

Like Bobby, it's entirely manual — no bank connection, no automation, and fairly bare-bones in terms of insights.

**4. ReSubs — Verdict for Europe: 4/5**

ReSubs is the most complete dedicated subscription tracker available right now. It works on iOS, Android, and Web, supports multiple currencies, and has trial reminders, cancel guides, and lifecycle tracking.

The downside: it's not free. The premium plan is required for full functionality, pricing is higher than alternatives, and there's no Open Banking integration — everything is still manual.

**5. Klaxo — Built for Europe**

We built Klaxo because we kept running into the same problem: every subscription tracker we tried was American, or bare-bones, or both.

Klaxo is built from the ground up for European users. Native euro support. GDPR-compliant from day one — no advertising partnerships, no data selling. European services recognised automatically. Renewal alerts 5 days before any charge. Open Banking via PSD2 in active development.

Honest pricing: free for up to 5 subscriptions. Pro is €3.99/month or €29/year — cancel anytime.

**Which App Should You Use?**

If you're on iOS and want something free and simple: Bobby still works. Everything is manual, but it gets the job done.

If you're on Android and want free manual tracking: Subby is the equivalent. Nothing fancy, but reliable.

If you want the most complete manual tracker and don't mind paying more: ReSubs is the best all-round option today.

If you want something built specifically for Europe — euros, GDPR compliance, and a path to automatic bank detection: Klaxo is the obvious choice. The free plan covers most people's needs, and Pro is less than a coffee per month.

**How Much Are You Actually Spending?**

Here's the uncomfortable truth: most Europeans significantly underestimate their subscription spending.

Studies consistently show that people estimate they spend about half of what they actually pay every month on subscriptions. The services you use regularly are easy to remember. The ones you forget — that Adobe plan from 2023, the cloud storage you switched away from, the free trial that became paid — are the ones that quietly drain your account every month.

A subscription tracker doesn't just help you see what you're paying. It helps you make conscious decisions about every recurring charge. That's worth more than the cost of any of these apps.

[Start tracking your subscriptions for free at klaxo.app →](https://klaxo.app)
  `,
  },
  {
    slug: 'i-found-34-euros-i-was-wasting',
    title: "I found €34/month I was wasting — here's how",
    date: 'May 3, 2026',
    readTime: '4 min read',
    description: 'A honest look at how subscription costs pile up without you noticing — and what I did about it.',
    content: `
I was doing a routine check of my bank statement when I spotted three charges I didn't recognise.

Not fraud. Just subscriptions I had completely forgotten about.

A fitness app I used twice in January. A cloud storage plan I'd upgraded during a free trial and never downgraded. A news site I'd subscribed to for one specific article.

Together: €34 a month. €408 a year. Gone.

The frustrating part wasn't the money. It was that I consider myself reasonably careful with finances. I track my grocery spending. I compare prices before buying anything over €50. But subscriptions had somehow become invisible.

**Why subscriptions are so easy to forget**

The model is designed that way. A free trial ends quietly. A price increases by €2 and nobody emails you. A service you used during lockdown keeps charging because cancelling takes three steps and you never got around to it.

And unlike a one-time purchase, there's no moment of decision. The money just leaves your account, month after month, until you happen to look.

I talked to friends about this. Everyone had a version of the same story. One friend in Madrid was paying for two music streaming services simultaneously. Another in Paris had four different cloud storage plans because she kept signing up and forgetting to cancel the old one.

**What I tried first**

I started a spreadsheet. It worked for about six weeks. Then I forgot to update it when I signed up for something new, and the whole thing became useless.

I looked for apps. Most of what I found were built for the US market — prices in dollars, services I'd never heard of, no support for the European subscriptions I actually use.

The ones that did support Europe were either complicated to set up or wanted access to my bank account, which I wasn't comfortable with.

**What actually helped**

I ended up building something myself. A simple tool that lets you add subscriptions manually, see your real monthly total, and get a notification a few days before anything renews.

No bank access required. No complicated setup. Just a clean list of what you're paying for and when.

The renewal alerts turned out to be the most useful part. Getting a reminder five days before a charge means you actually have time to decide if you want to keep it — instead of seeing the charge and thinking "I should probably cancel that" for the fourth month in a row.

If you want to try it, [Klaxo is free to start at klaxo.app](https://app.klaxo.app/register) — no credit card required, free for up to 5 subscriptions.

The €34 I found paid for a lot of dinners.
    `,
  },
  {
    slug: 'why-every-subscription-tracker-was-built-for-americans',
    title: 'Why every subscription tracker I tried was built for Americans',
    date: 'May 3, 2026',
    readTime: '5 min read',
    description: "Most financial tools assume you live in the US. Here's why that's a problem for Europeans — and what to do instead.",
    content: `
Search for "subscription tracker" and you'll find plenty of options. Download one and you'll immediately notice the problem.

The currency is wrong. The default services are Netflix, Hulu, and HBO Max. The categories don't match how Europeans actually spend. The bank connections, if they exist, only work with American institutions.

It's not that these apps are bad. They're just built for a different market.

**The European subscription landscape is different**

In the US, most people pay in dollars and subscribe to a fairly predictable set of services. In Europe, things are messier.

You might pay for services in three different currencies. You might subscribe to local streaming platforms that no American has ever heard of. Your bank might be a challenger bank, a regional cooperative, or a postal bank — none of which appear in the "connect your account" dropdown of any app built in San Francisco.

On top of that, European pricing varies significantly by country. Spotify costs different amounts in Portugal, Germany, and Sweden. The same is true for most major services. An app built around American prices will be wrong for you almost every time.

**Why this matters more than it seems**

If the app doesn't recognise your services, you have to add them manually. If the default currency is wrong, every total is off. If the bank connection doesn't work, you lose the main convenience the app was supposed to provide.

The result is that most Europeans either give up on the app within a week, or they use it in a degraded way that doesn't actually solve the problem.

I used four different subscription trackers over two years. Each one had the same issue. The apps were polished and well-designed. They just weren't designed for me.

**What a European-first tool looks like**

When I started building Klaxo, the goal was simple: make something that works for how people in Europe actually live.

That means euros by default, with support for other European currencies. It means not assuming everyone banks with Chase or Bank of America. It means the list of common services reflects what people in Portugal, Spain, France, Germany, and Italy are actually subscribing to.

It also means being honest about what the tool does and doesn't do. Klaxo doesn't connect to your bank — not because it's not useful, but because getting that right for the full range of European banks takes time, and we'd rather do it properly than ship something that works for 20% of users.

For now, it's manual entry. Which sounds like a downside until you realise that manually entering your subscriptions once, and then having a clean view of everything you pay for, is already more than most people have.

[Klaxo is free to start at klaxo.app](https://app.klaxo.app/register) — no credit card required. If you're tired of tools that weren't built for you, it might be worth a look.
    `,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
