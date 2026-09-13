import { SITE } from './site';

/* ────────────────────────────────────────────────────────────────────────────
   Course content. All page copy that is longer than a label lives here so the
   sections stay presentational and the curriculum can be edited without
   touching JSX.
   ──────────────────────────────────────────────────────────────────────────── */

export type Session = {
  n: number;
  title: string;
  /** Verb-first, checkable. Not "understand" — something you can be asked to show. */
  objective: string;
  tools: string[];
};

export type Week = {
  n: number;
  label: string;
  title: string;
  summary: string;
  /** What is demonstrably true at the end of this week. */
  checkpoint: string;
  sessions: Session[];
};

export const WEEKS: Week[] = [
  {
    n: 1,
    label: 'Week 1',
    title: 'Foundations and your own site',
    summary:
      'You learn how money actually moves online, then you put something live on a domain you own. By Friday you have a site and you can prove a form submission reached your analytics.',
    checkpoint: 'Live site on your own domain, with GA4 firing a verified lead event.',
    sessions: [
      {
        n: 1,
        title: 'How money actually moves online',
        objective:
          'Map a real Coimbatore business from first click to paid customer and name the metric that governs each step.',
        tools: ['Google Sheets'],
      },
      {
        n: 2,
        title: 'Positioning, offer, and the one-line promise',
        objective:
          'Write the audience definition and one-line offer for the business you will market for the next 30 days.',
        tools: ['Claude', 'ChatGPT'],
      },
      {
        n: 3,
        title: 'Domain, hosting, and a site that is live tonight',
        objective:
          'Register a domain and publish a five-section site on hosting registered in your own name.',
        tools: ['GoDaddy', 'Hostinger', 'WordPress'],
      },
      {
        n: 4,
        title: 'Landing page anatomy and copy that converts',
        objective:
          'Rebuild your page around a single conversion goal with hero, proof and CTA blocks you wrote yourself.',
        tools: ['Elementor', 'Claude'],
      },
      {
        n: 5,
        title: 'Tracking before traffic',
        objective:
          'Install GA4 and Tag Manager, fire a form-submit event, and prove it in DebugView before a rupee is spent.',
        tools: ['GA4', 'Google Tag Manager', 'Meta Pixel'],
      },
    ],
  },
  {
    n: 2,
    label: 'Week 2',
    title: 'Search, AI content, and the creative',
    summary:
      'Two ways to be found and one way to be remembered. You take a keyword from research to a published page, set up the local listing that actually ranks in Coimbatore, and cut your first AI video ad.',
    checkpoint: 'A published, optimised page and a 20-second vertical ad, both reviewed in class.',
    sessions: [
      {
        n: 6,
        title: 'Keyword research and search intent',
        objective:
          'Build a keyword map that separates informational, commercial and transactional intent, and pick the terms worth paying for.',
        tools: ['Keyword Planner', 'Ubersuggest', 'Search Console'],
      },
      {
        n: 7,
        title: 'On-page and technical SEO',
        objective:
          'Optimise titles, headings, internal links and schema, then fix what PageSpeed Insights flags on your own site.',
        tools: ['Rank Math', 'PageSpeed Insights', 'Screaming Frog'],
      },
      {
        n: 8,
        title: 'AI content systems, not AI slop',
        objective:
          'Take one keyword to a publish-ready 1,200-word page through an AI brief, draft and human edit pass.',
        tools: ['Claude', 'ChatGPT', 'Grammarly'],
      },
      {
        n: 9,
        title: 'Local SEO and Google Business Profile',
        objective:
          'Set up and optimise a Business Profile, build local citations, and start the review loop that moves map rankings.',
        tools: ['Google Business Profile', 'Google Maps'],
      },
      {
        n: 10,
        title: 'AI video ads — script, generate, cut',
        objective:
          'Script and produce a 20-second vertical ad using AI generation plus a manual edit pass.',
        tools: ['HeyGen', 'Runway', 'CapCut', 'Canva'],
      },
    ],
  },
  {
    n: 3,
    label: 'Week 3',
    title: 'Live campaigns on Google and Meta',
    summary:
      'Real budget, real auctions, real consequences. You build and launch on both platforms, then spend two sessions reading what came back and changing it.',
    checkpoint: 'Live campaigns on Meta and Google, plus a written optimisation report on your own numbers.',
    sessions: [
      {
        n: 11,
        title: 'Meta Ads architecture',
        objective:
          'Structure a lead-generation campaign with audiences, placements and a budget that survives the learning phase.',
        tools: ['Meta Ads Manager', 'Meta Business Suite'],
      },
      {
        n: 12,
        title: 'Launch day — your Meta campaign goes live',
        objective:
          'Publish a campaign with real money behind it and a lead form that delivers to a destination you control.',
        tools: ['Meta Ads Manager', 'Meta Pixel'],
      },
      {
        n: 13,
        title: 'Google Ads — Search campaign build',
        objective:
          'Build a Search campaign with match types, negatives and ad groups mapped to your own keyword research.',
        tools: ['Google Ads', 'Keyword Planner'],
      },
      {
        n: 14,
        title: 'Reading the numbers, not the vibes',
        objective:
          'Diagnose a live campaign from its own data and make three changes you can defend out loud.',
        tools: ['Google Ads', 'Meta Ads Manager', 'Looker Studio'],
      },
      {
        n: 15,
        title: 'Creative testing and what scaling really means',
        objective:
          'Run a structured creative test, then decide what to scale, what to cut and what to leave alone.',
        tools: ['Meta Ads Manager', 'Canva'],
      },
    ],
  },
  {
    n: 4,
    label: 'Week 4',
    title: 'CRM, WhatsApp, automation, portfolio',
    summary:
      'The part most courses skip. A lead is worth nothing until someone follows it up, so you build the pipeline, the follow-up and the automation that connects them — then present the whole stack as a portfolio.',
    checkpoint: 'A lead flows from ad to CRM to WhatsApp without you touching it, and you present the case study.',
    sessions: [
      {
        n: 16,
        title: 'CRM and the lead lifecycle',
        objective:
          'Build a pipeline with real stages and push live leads into it from your ad forms automatically.',
        tools: ['Zoho CRM', 'HubSpot'],
      },
      {
        n: 17,
        title: 'WhatsApp and email follow-up that gets replies',
        objective:
          'Write and schedule a five-touch follow-up sequence, then measure the reply rate it produced.',
        tools: ['WhatsApp Business', 'Interakt', 'Brevo'],
      },
      {
        n: 18,
        title: 'Automation — wire the whole stack together',
        objective:
          'Build an automation that moves a lead from ad to CRM to WhatsApp with no manual step in between.',
        tools: ['Make', 'Zapier', 'n8n'],
      },
      {
        n: 19,
        title: 'Reporting and pricing your work',
        objective:
          'Build a one-page client dashboard and quote a monthly retainer you can justify line by line.',
        tools: ['Looker Studio', 'Google Sheets'],
      },
      {
        n: 20,
        title: 'Portfolio and final presentation',
        objective:
          'Present your live stack — site, campaigns, video, CRM, automation and the numbers — as a portfolio case study.',
        tools: ['Notion', 'Canva'],
      },
    ],
  },
];

export const TOTAL_SESSIONS = WEEKS.reduce((n, w) => n + w.sessions.length, 0);

/** The eight things you walk out owning. Deliverables, not logos. */
export const DELIVERABLES = [
  'Live website',
  'Ranked pages',
  'Meta campaign',
  'Google campaign',
  'AI video ad',
  'CRM',
  'Automation',
  'Client dashboard',
] as const;

export const PROBLEM = {
  left: {
    eyebrow: 'What most courses hand you',
    items: [
      'Recorded videos you watch at 2x and never open again.',
      'A certificate PDF with your name in a template font.',
      'A "capstone project" that is a slide deck about a campaign.',
      'Demo dashboards and sandbox accounts that expire with your enrolment.',
      'No login, anywhere, to anything real.',
    ],
  },
  right: {
    eyebrow: 'What the person hiring you asks',
    items: [
      '"What have you actually run?"',
      '"What was your cost per lead, and what did you do when it went up?"',
      '"Can you open the ad account and show me?"',
      '"Who did you write this copy for, and did it work?"',
      '"Something broke mid-campaign. Walk me through what you did."',
    ],
  },
};

/** Section 6 — the stack. Every one of these survives day 30. */
export const STACK: { group: string; tools: string[] }[] = [
  {
    group: 'Measure',
    tools: ['Google Analytics 4', 'Google Tag Manager', 'Search Console', 'Looker Studio', 'Meta Pixel'],
  },
  {
    group: 'Build',
    tools: ['WordPress', 'Elementor', 'Rank Math', 'PageSpeed Insights'],
  },
  {
    group: 'Advertise',
    tools: ['Meta Ads Manager', 'Google Ads', 'Keyword Planner', 'Google Business Profile'],
  },
  {
    group: 'Create',
    tools: ['Claude', 'ChatGPT', 'HeyGen', 'Runway', 'CapCut', 'Canva'],
  },
  {
    group: 'Convert',
    tools: ['Zoho CRM', 'HubSpot', 'WhatsApp Business', 'Interakt', 'Brevo'],
  },
  {
    group: 'Automate',
    tools: ['Make', 'Zapier', 'n8n', 'Google Sheets'],
  },
];

export const STACK_COUNT = STACK.reduce((n, g) => n + g.tools.length, 0);

/** Section 8 — say the honest thing. */
export const OUTCOMES = [
  {
    title: 'No placement guarantee',
    body:
      'We do not promise you a job, because nobody honestly can. What we promise is that you will finish with work you can show and numbers you can talk about — which is what actually gets you through an interview.',
    tone: 'plain' as const,
  },
  {
    title: 'Internship for top performers',
    body:
      'The strongest two or three students in each batch are offered a paid internship with our agency team in Coimbatore. It is selective and it is based on what you built during the month, not on attendance.',
    tone: 'accent' as const,
  },
  {
    title: 'A portfolio and a certificate that name what you built',
    body:
      'Your certificate lists the campaigns you ran and the tools you shipped with, not just a course title. Alongside it you leave with a written case study of your own live results.',
    tone: 'plain' as const,
  },
];

export const FEE_INCLUDES = [
  `All ${TOTAL_SESSIONS} sessions, in person, in ${SITE.city}`,
  'A domain name, registered in your name, for one year',
  'Hosting for the duration of the course',
  'Ad budget for your live Google and Meta campaigns',
  'Access to the paid AI tools used in class',
  'Every template, script and checklist we use',
  'Certificate naming the campaigns you ran',
  '30 days of WhatsApp support after the batch ends',
];

export const FAQS = [
  {
    q: 'Do I need a marketing background, or any coding?',
    a: `Neither. Session 1 starts from what a funnel is. Nothing in the ${TOTAL_SESSIONS} sessions requires you to write code — you will use the same no-code tools working agencies use. What you do need is to turn up five evenings a week for a month.`,
  },
  {
    q: 'Can I join while I am still in college?',
    a: `Yes, and most of the batch is. Sessions run ${SITE.timings.toLowerCase()}, deliberately after college hours. Final-year students with project work generally manage it; if your exam dates fall inside the batch, tell us before you enrol and we will tell you honestly whether to take the next one.`,
  },
  {
    q: 'Do I actually run real ad money, or is it a demo account?',
    a: 'Real money, real auctions, in a live ad account. The ad budget is included in your fee. You will see spend, impressions, leads and a cost per lead that changes when you change something — and you will make those changes yourself in Week 3, not watch a recording of someone else making them.',
  },
  {
    q: 'What exactly do I leave with?',
    a: `Eight things you own: a live website on your own domain, pages optimised to rank, a Meta campaign, a Google campaign, an AI-generated video ad, a CRM with real leads in it, a working automation, and a client dashboard. Plus the logins. Nothing expires when the batch ends.`,
  },
  {
    q: 'What are the batch timings?',
    a: `${SITE.timings}, in person in ${SITE.city}. Each session is two hours and roughly half of it is you building, not listening. The batch runs for ${SITE.durationWeeks} weeks.`,
  },
  {
    q: 'Is there a weekend batch?',
    a: `Yes — ${SITE.weekendBatch}, covering the identical ${TOTAL_SESSIONS} sessions over the same four weeks. It suits people already working. Seats are limited the same way, so say which one you want when you enquire.`,
  },
  {
    q: 'Why only 15 seats?',
    a: 'Because in Week 3 someone has to sit with you while your campaign is live and your money is moving. Above roughly fifteen people that stops being possible and the course quietly turns into a lecture. We would rather run another batch.',
  },
  {
    q: 'What if I miss a session?',
    a: 'Tell us and we will schedule a catch-up before the next session, because the sessions build on each other — you cannot launch a campaign in Session 12 if you never installed the pixel in Session 5. There is no recording to fall back on; this is an in-person course by design.',
  },
];
