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
    label: 'Stage 01',
    title: 'Think',
    summary:
      'Research and strategy. Before anything is generated, you decide who it is for, what it says and what it has to achieve. This is the week that stops the other three being guesswork.',
    checkpoint: 'A research pack, a positioning line, a 30-day content calendar and a creative brief.',
    sessions: [
      {
        n: 1,
        title: 'What the marketing job actually is now',
        objective:
          'Map how a campaign gets made today and name which parts AI does, which parts you do, and which parts nobody should automate.',
        tools: ['Claude', 'ChatGPT'],
      },
      {
        n: 2,
        title: 'AI research: audience, market, competitor',
        objective:
          'Produce a research pack on a real local business in an afternoon, and separate what the model knows from what it invented.',
        tools: ['Claude', 'ChatGPT', 'Perplexity'],
      },
      {
        n: 3,
        title: 'Positioning and the one-line promise',
        objective:
          'Write the audience definition and single promise that every asset for the next 30 days has to serve.',
        tools: ['Claude', 'Google Sheets'],
      },
      {
        n: 4,
        title: 'The 30-day content strategy',
        objective:
          'Build a content calendar with a reason behind every slot, not a grid filled to look busy.',
        tools: ['ChatGPT', 'Google Sheets', 'Notion'],
      },
      {
        n: 5,
        title: 'The creative brief',
        objective:
          'Write the one-page brief that every image, video and ad in the rest of the course is generated from.',
        tools: ['Claude', 'Notion'],
      },
    ],
  },
  {
    n: 2,
    label: 'Stage 02',
    title: 'Create',
    summary:
      'Design, content and campaign assets. You build a look the brand can repeat, then generate and art-direct the creative that comes out of it.',
    checkpoint: 'A brand creative system and a full set of ad creative built from your own brief.',
    sessions: [
      {
        n: 6,
        title: 'Brand creative system',
        objective:
          'Define the colour, type, tone and composition rules that make twenty generated assets look like one brand.',
        tools: ['Canva', 'Claude', 'Figma'],
      },
      {
        n: 7,
        title: 'AI images: prompt, iterate, art-direct',
        objective:
          'Take one creative brief to a finished image through structured prompting and deliberate iteration, not luck.',
        tools: ['Midjourney', 'Nano Banana', 'Gemini'],
      },
      {
        n: 8,
        title: 'Ad creative that sells',
        objective:
          'Build a set of ad creatives against a single angle and say out loud why each one should work.',
        tools: ['Midjourney', 'Canva', 'Meta Ads Manager'],
      },
      {
        n: 9,
        title: 'Copy systems: hooks, angles, variations',
        objective:
          'Generate and edit twenty hooks from one angle, then cut them down to the three worth spending money on.',
        tools: ['Claude', 'ChatGPT'],
      },
      {
        n: 10,
        title: 'The social campaign build',
        objective:
          'Assemble a complete social campaign from your calendar, creative system and copy set.',
        tools: ['Canva', 'Meta Business Suite'],
      },
    ],
  },
  {
    n: 3,
    label: 'Stage 03',
    title: 'Produce',
    summary:
      'Video, ad film and creative direction. AI is the production engine and you are the director. This is the week most courses skip entirely.',
    checkpoint: 'A finished AI video advertisement and an ad film, both cut from your own storyboard.',
    sessions: [
      {
        n: 11,
        title: 'From still to motion',
        objective:
          'Turn a finished image into controlled movement and judge when motion adds meaning and when it adds noise.',
        tools: ['Kling', 'Runway'],
      },
      {
        n: 12,
        title: 'Storyboarding and shot design',
        objective:
          'Storyboard a 30-second advertisement shot by shot before generating a single frame.',
        tools: ['Claude', 'Canva'],
      },
      {
        n: 13,
        title: 'Voice, sound and the edit',
        objective:
          'Cut picture to sound, add a voice track, and fix the timing problems that make AI video feel synthetic.',
        tools: ['ElevenLabs', 'CapCut'],
      },
      {
        n: 14,
        title: 'The AI ad film, start to finish',
        objective:
          'Produce a complete advertisement from brief to final cut, and defend every creative decision in it.',
        tools: ['Runway', 'Kling', 'CapCut', 'ElevenLabs'],
      },
      {
        n: 15,
        title: 'UGC-style ads and creator formats',
        objective:
          'Produce the vertical, spoken-to-camera formats that carry most paid social, using AI presenters.',
        tools: ['HeyGen', 'CapCut'],
      },
    ],
  },
  {
    n: 4,
    label: 'Stage 04',
    title: 'Launch',
    summary:
      'Website, automation, live campaign and portfolio. Real budget, real auctions, real consequences, and the work assembled into something you can show.',
    checkpoint: 'Live campaigns, an automation running without you, and your portfolio presented to the room.',
    sessions: [
      {
        n: 16,
        title: 'The landing page',
        objective:
          'Build and publish a landing page on your own domain, built around one conversion goal.',
        tools: ['WordPress', 'Elementor', 'Framer'],
      },
      {
        n: 17,
        title: 'Tracking before traffic',
        objective:
          'Install GA4 and Tag Manager, fire a lead event and prove it in DebugView before a rupee is spent.',
        tools: ['GA4', 'Google Tag Manager', 'Meta Pixel'],
      },
      {
        n: 18,
        title: 'Launch day',
        objective:
          'Publish live campaigns on Meta and Google with real money behind them, then read what comes back.',
        tools: ['Meta Ads Manager', 'Google Ads'],
      },
      {
        n: 19,
        title: 'Marketing automation',
        objective:
          'Wire a lead from ad to CRM to WhatsApp with no manual step, and watch one flow through end to end.',
        tools: ['Make', 'n8n', 'Zoho CRM', 'WhatsApp Business'],
      },
      {
        n: 20,
        title: 'Portfolio, pricing and the pitch',
        objective:
          'Present your campaign as a case study, and quote the work as a service you could sell on Monday.',
        tools: ['Notion', 'Canva', 'Looker Studio'],
      },
    ],
  },
];

export const TOTAL_SESSIONS = WEEKS.reduce((n, w) => n + w.sessions.length, 0);

/** Section 02 — what AI actually changed, as six things you will do. */
export const PILLARS = [
  { title: 'Research', body: 'Find what an audience actually wants, in an afternoon rather than a fortnight.' },
  { title: 'Strategy', body: 'Turn what you found into decisions somebody can act on.' },
    // 'Generate', not 'Create'. Two reasons: Stage 02 is already called Create and
  // means something narrower, and the distinction between what the machine does
  // (generate) and what the student does (direct) is the argument the creative
  // director section makes. Using one word for both blunts it.
  { title: 'Generate', body: 'Images, video and copy at a volume you could not have shot.' },
  { title: 'Automate', body: 'Hand the repetitive half of the job to something that does not get bored.' },
  { title: 'Build', body: 'Ship the landing pages and systems the campaign runs on.' },
  { title: 'Launch', body: 'Put real money behind it and read what comes back.' },
] as const;

/** Section 03 — the comparison. Left is the pattern, right is this course. */
export const COMPARISON = {
  them: { label: 'Most AI courses', steps: ['Watch', 'Learn tools', 'Copy prompts', 'Get certificate', 'Forget'] },
  us: { label: 'Growthlearners', steps: ['Understand', 'Build', 'Get feedback', 'Create portfolio', 'Launch'] },
};

/**
 * Section 05 — the cinematic gallery of student work.
 *
 * EMPTY ON PURPOSE. This is the section the whole direction rests on: the
 * brief's own conclusion was that the product is sold by showing what people
 * can create, and that the student outputs should be the visual identity.
 *
 * Nothing here can be stock, and nothing here can be a stand-in. A generated
 * image that no student made, on a page selling what students make, is the one
 * lie this page cannot survive. Add real work and the section renders itself.
 *
 * Assets go in public/work/. Landscape 16:9 for campaign stills and ad film
 * frames, 4:5 or 9:16 for social and UGC. Video is fine: give `type: 'video'`
 * an mp4 under 3MB and a poster frame.
 */
export type WorkItem = {
  title: string;
  /** "AI ad campaign", "Product photography", "Brand film". */
  kind: string;
  /**
   * Who made it, and in which batch. Anonymous work proves nothing — but an
   * invented name proves less than nothing, so this may be left empty while a
   * real credit is being collected. The caption drops the byline when it is,
   * and preflight counts it as unfinished rather than letting it ship quietly.
   */
  student: string;
  src?: string;
  /**
   * For work whose proof is that it is live. The tile renders the address and
   * links to it instead of showing a picture of it — a screenshot proves a
   * page was designed, a link proves it shipped.
   */
  href?: string;
  type?: 'image' | 'video' | 'link';
  poster?: string;
  /** Aspect for the grid. */
  ratio?: '16/9' | '4/5' | '9/16' | '1/1';
  /** Sample entry. Delete the flag when the row becomes real. */
  placeholder?: boolean;
};

export const WORK: WorkItem[] = [
  // Real work. Videos transcoded from the supplied masters to 720px and muted
  // (the gallery plays them silently); stills renamed by what they actually
  // are rather than the slot they arrived in, resized and converted to WebP —
  // 2.6MB of PNG and JPEG became 244KB. `student` is empty on every row
  // pending credits; see the note on the type.
  { title: 'Headphones, product reel', kind: 'AI product film', student: '', src: '/work/reel-headphones.mp4', poster: '/work/reel-headphones.jpg', type: 'video', ratio: '9/16' },
  { title: 'Festive kurta, try-on', kind: 'UGC-style ad', student: '', src: '/work/ugc-kurta.mp4', poster: '/work/ugc-kurta.jpg', type: 'video', ratio: '9/16' },
  // A spec piece against a real brand — the trademark and trade dress are
  // Kellanova's, not ours, and this page sells a paid course. Added on the
  // owner's explicit instruction after that was raised. The `kind` says "spec"
  // so the page never implies it was commissioned work.
  { title: 'Pringles, brand film', kind: 'Brand film (spec)', student: '', src: '/work/film-pringles.mp4', poster: '/work/film-pringles.jpg', type: 'video', ratio: '16/9' },
  // A student's own Google Ads account, confirmed as theirs. The one artefact
  // here that is not a creative: it is the evidence that the ad budget in the
  // fee actually gets spent on a live campaign.
  { title: 'A live Google Ads account', kind: 'Campaign management', student: '', src: '/work/google-ads-live.webp', ratio: '4/5' },
  { title: 'Aurelia, launch creative', kind: 'Real estate ad', student: '', src: '/work/realestate-aurelia.webp', ratio: '9/16' },
  { title: 'AI marketing, key visual', kind: 'Campaign poster', student: '', src: '/work/campaign-poster.webp', ratio: '4/5' },
  { title: 'Fashion label, engagement post', kind: 'Social creative', student: '', src: '/work/fashion-social-post.webp', ratio: '1/1' },

  { title: 'A page on its own domain', kind: 'Landing page', student: '', href: 'https://laxdesigns.lovable.app/', type: 'link', ratio: '16/9' },
];

/** Section 06 — you are the director, AI is the production engine. */
export const PIPELINE = [
  { step: 'Idea', note: 'Yours' },
  { step: 'Creative brief', note: 'Yours' },
  { step: 'Storyboard', note: 'Yours' },
  { step: 'AI image', note: 'Directed' },
  { step: 'AI motion', note: 'Directed' },
  { step: 'Voice and sound', note: 'Directed' },
  { step: 'Final advertisement', note: 'Yours' },
] as const;

/**
 * Section 07 — the strip. Deliberately not a wall of 47 logos: the point of the
 * section is that the list dates and the workflow does not.
 */
export const TOOL_STRIP = [
  'ChatGPT', 'Claude', 'Gemini', 'Nano Banana', 'Midjourney', 'Canva',
  'Kling', 'Runway', 'ElevenLabs', 'HeyGen', 'CapCut', 'Make', 'n8n',
] as const;



/** Section 10 — the room is the point. */
export const CLASSROOM = [
  { title: 'Live demonstrations', body: 'You watch the work happen, at the speed it actually happens.' },
  { title: 'Hands-on building', body: 'Roughly half of every session is you making something.' },
  { title: 'Feedback in the room', body: 'Your work is looked at and told what is wrong with it, out loud.' },
  { title: 'Small batch', body: 'Few enough people that nobody gets to sit quietly at the back.' },
  { title: 'Peers to work with', body: 'You brief each other, and you review each other.' },
  { title: 'Real projects', body: 'Everything you build is for a real business, not a made-up one.' },
];

/**
 * Sections 09 + 11 of the brief, now one — who this is for, and the door each
 * of them leaves by.
 *
 * This was two sections until recently: a six-persona "who this is for" grid
 * near the top of the page, and this four-door "where this goes next" grid
 * twenty screens below it. They were the same sort performed twice — the
 * reader decided they were a freelancer, scrolled for twenty minutes, and was
 * asked to decide whether they wanted to freelance. The personas are now the
 * `who` line on the door that was already describing them, which means the
 * page segments the reader once, early, where the decision is still live.
 */
export const CAREERS = [
  {
    door: 'Get hired',
    who: 'Students and working marketers',
    why: 'Leave with work to show rather than a certificate to mention — or keep the job you have and do it in a fraction of the time, taking on the creative half as well.',
    roles: ['AI marketing specialist', 'Digital marketing executive', 'Content strategist', 'Performance marketer'],
  },
  {
    door: 'Freelance',
    who: 'Freelancers and designers',
    why: 'Turn this into services you can price and sell, and move from making the assets to directing them.',
    roles: ['AI content', 'Creative production', 'Video ads', 'Marketing automation'],
  },
  {
    door: 'Build a business',
    who: 'Business owners',
    why: 'Build the marketing engine instead of renting it, and stop paying a retainer for work you can brief and judge yourself.',
    roles: ['Agency', 'AI marketing services', 'Content studio'],
  },
  {
    door: 'Build your brand',
    who: 'Creators',
    why: 'Produce more, and produce the things you could never have shot — without a crew, a studio or a budget.',
    roles: ['Creator', 'Consultant', 'Educator'],
  },
];

/** Section 12 — services, framed as work you can sell rather than money promised. */
export const SERVICES = [
  'AI social media content',
  'AI ad creative production',
  'AI video advertisements',
  'AI landing pages',
  'Marketing automation',
  'AI creative direction',
];

/** The eight things you walk out owning. Deliverables, not logos. */
/** Section 08 — what is in the portfolio at the end. */
export const PORTFOLIO = [
  { n: 1, title: 'AI marketing research', note: 'Audience, market and competitor, on a real business.' },
  { n: 2, title: '30-day content strategy', note: 'Every slot planned, dated and justified.' },
  { n: 3, title: 'Brand creative system', note: 'The rules that make generated work look like one brand.' },
  { n: 4, title: 'AI advertising campaign', note: 'A full creative set built from one angle.' },
  { n: 5, title: 'AI video advertisement', note: 'Storyboarded, generated, cut and scored.' },
  { n: 6, title: 'Landing page', note: 'Live, on a domain in your name.' },
  { n: 7, title: 'Marketing automation', note: 'A lead travels the whole way with nobody touching it.' },
  { n: 8, title: 'Complete client campaign', note: 'All of it, running, with the numbers attached.' },
];

/**
 * The strip near the top is a preview of the portfolio section further down,
 * so it takes its names from the same source. Two lists of the same eight
 * things in slightly different words read as padding.
 */
export const DELIVERABLES = PORTFOLIO.map((project) => project.title);

export const PROBLEM = {
  left: {
    eyebrow: 'What most courses hand you',
    items: [
      'Recorded videos you watch at 2x and never open again.',
      'A certificate PDF with your name in a template font.',
      'A “capstone project” that is a slide deck about a campaign.',
      'Demo dashboards and sandbox accounts that expire with your enrolment.',
      'No login, anywhere, to anything real.',
    ],
  },
  right: {
    eyebrow: 'What the person hiring you asks',
    items: [
      "“What have you actually run?”",
      "“What was your cost per lead, and what did you do when it went up?”",
      "“Can you open the ad account and show me?”",
      "“Who did you write this copy for, and did it work?”",
      "“Something broke mid-campaign. Walk me through what you did.”",
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
      'We do not promise you a job, because nobody honestly can. What we promise is that you will finish with work you can show and numbers you can talk about, which is what actually gets you through an interview.',
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

export type Teacher = {
  name: string;
  /** "Performance marketing lead, Growthlearners" — a real title, not a vibe. */
  role: string;
  /**
   * What they have actually run, in specifics a student could check. Numbers,
   * platforms, industries. "10+ years of experience" tells a reader nothing
   * and reads as filler; "runs Meta and Google for six Coimbatore builders,
   * about 40 lakh a year in ad spend" is the sentence that earns trust.
   */
  credential: string;
  /** Which sessions this person actually takes. */
  teaches: string;
  /** Optional real photo at /public/team/<file>. Never stock. */
  photo?: string;
  /** Sample entry. Delete the flag when the row becomes real. */
  placeholder?: boolean;
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EMPTY ON PURPOSE — this is the biggest trust gap on the page
 * ─────────────────────────────────────────────────────────────────────────────
 *  The page currently promises, twice, "a straight answer from someone who
 *  teaches the course" — and never says who that is. A parent being asked for
 *  ₹18,999 for an in-person course wants a name, a face, and something they
 *  can check. This is the single highest-value thing you can add, worth more
 *  than any visual change to the page.
 *
 *  Add one entry and the section renders itself, between the honest outcomes
 *  and the fee, which is exactly where a reader is deciding whether to believe
 *  what they just read.
 *
 *  Write the credential as something checkable. Not "expert in performance
 *  marketing" — rather what they run, for whom, at what scale. If a claim
 *  cannot be backed up when a parent rings and asks, do not put it here.
 *
 *  Photos go in /public/team/ and must be real people from the team. A stock
 *  portrait on a page about a room you sit in is worse than no photo.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const TEACHERS: Teacher[] = [
  {
    name: 'Sample entry, replace me',
    role: 'Performance marketing lead, Growthlearners',
    credential:
      'Write what this person actually runs, for whom, at what scale. Something a parent could check on a phone call. Not "expert in performance marketing".',
    teaches: 'Stage 04, sessions 16 to 20',
    placeholder: true,
  },
  {
    name: 'Sample entry, replace me',
    role: 'Creative director, Growthlearners',
    credential:
      'Same here. Campaigns shipped, brands worked with, formats produced. Specifics are the whole point of this section.',
    teaches: 'Stage 02 and Stage 03, sessions 6 to 15',
    placeholder: true,
  },
  {
    name: 'Sample entry, replace me',
    role: 'Strategy, Growthlearners',
    credential:
      'A third is optional. Two people with real credentials beat three with vague ones.',
    teaches: 'Stage 01, sessions 1 to 5',
    placeholder: true,
  },
];

export type Testimonial = {
  /** What they said. One or two sentences beats a paragraph. */
  quote: string;
  name: string;
  /** "B.Com, PSG College of Technology" or "Marketing executive, Kovai Foods". */
  role: string;
  /** Which batch, so the reader can date it. */
  batch: string;
  /** Optional: the concrete thing they can point at, a live site or a result. */
  result?: string;
  /** Sample entry. Delete the flag when the row becomes real. */
  placeholder?: boolean;
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EMPTY ON PURPOSE — add real quotes here and the section appears
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every landing-page pattern for a course puts social proof before the price,
 *  and it is the one thing this page does not have. It is deliberately empty
 *  rather than filled with invented students: a fabricated testimonial on a
 *  page a parent is reading is worse than none, and it is the kind of thing
 *  that gets noticed.
 *
 *  Add one entry and the Proof section renders itself, between the outcomes
 *  and the fee. Below three entries it lays out as a single column.
 *
 *  What to collect, in rough order of how much it is worth:
 *    1. A student naming what they built and what the numbers did.
 *    2. A student who got an interview or a client off the back of it.
 *    3. A parent who paid. This page is read by parents; one of them saying
 *       it was worth the money does more than three student quotes.
 *
 *  Keep them verbatim. Do not tidy the English — the unpolished ones read as
 *  real, which is the entire point of the section.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Replace this with a real quote from your first batch. Keep it verbatim, including the bits that are not polished. The unpolished ones are what read as real.',
    name: 'Sample entry, replace me',
    role: 'Final-year student',
    batch: 'Batch 01',
    result: 'What they can point at. A live page, a campaign, a number.',
    placeholder: true,
  },
  {
    quote:
      'The second most valuable quote is from someone who got an interview or a client off the back of the course. Ask them what changed.',
    name: 'Sample entry, replace me',
    role: 'Graduate',
    batch: 'Batch 01',
    placeholder: true,
  },
  {
    quote:
      'The most valuable one is from a parent who paid. This page is read by parents, and one of them saying it was worth the money does more than three student quotes.',
    name: 'Sample entry, replace me',
    role: 'Parent',
    batch: 'Batch 01',
    placeholder: true,
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
    q: 'Is this beginner-friendly?',
    a: `Yes, and most of the room will be beginners. Session 1 starts from what the marketing job actually is. Nothing in the ${TOTAL_SESSIONS} sessions needs code, and nothing assumes you have run a campaign before. What it does need is that you turn up five evenings a week for a month and build things.`,
  },
  {
    q: 'Is it really offline?',
    a: `Entirely. ${SITE.timings}, in a room in ${SITE.city}, with the people teaching it in the same room. There is no recording to fall back on and no online cohort running alongside. That is the reason the batch is small.`,
  },
  {
    q: 'What laptop do I need?',
    a: 'Anything from the last five or six years that runs Chrome without complaining. The generation happens on the tools\u2019 servers, not your machine, so you do not need a graphics card. Bring a charger and headphones. If your laptop is genuinely on its last legs, tell us before you enrol and we will tell you honestly whether it will cope.',
  },
  {
    q: 'Which AI tools are included?',
    a: 'Access to the paid tools used in class is included for the month. The list moves, because these tools move. What does not move is the workflow: brief, generate, direct, edit, ship. We teach when and why to reach for a tool, so that the next one to appear is something you can pick up in an afternoon.',
  },
  {
    q: 'Do I need prior digital marketing experience?',
    a: 'No. People arrive from design, from content, from a family business, and from nothing at all. The first week exists to put everyone on the same footing. If you already run campaigns, the AI production weeks are where you will get your money back.',
  },
  {
    q: 'Will I build real projects?',
    a: `Every session produces something, and every stage ends with a finished artefact. By day 30 you have eight of them, on a real business, including a live campaign with real spend behind it. That is the whole design of the course.`,
  },
  {
    q: 'Will I get a certificate?',
    a: 'Yes, and it names the campaigns you ran and the tools you shipped with rather than just a course title. But the certificate is the least valuable thing you leave with. The portfolio is the thing that gets you the interview.',
  },
  {
    q: 'Can I freelance after the course?',
    a: 'Session 20 covers exactly that: how to package the work as a service, what to charge, and how to pitch it. Several of the things you build during the month are sellable as they stand. Whether you get clients depends on you doing the asking, which no course can do for you.',
  },
  {
    q: 'What happens after the course?',
    a: 'You keep everything: the logins, the accounts, the work inside them and the portfolio. You get 30 days of WhatsApp support for the questions that only come up once you are on your own. The internship described in the outcomes section is offered at the end of every batch.',
  },
  {
    q: `Why only ${SITE.seats} seats?`,
    a: 'Because in Stage 03 and Stage 04 someone has to sit with you while your video is rendering wrong and your campaign is live and spending. Above roughly fifteen people that stops being possible and the course quietly turns into a lecture. We would rather run another batch.',
  },
];
