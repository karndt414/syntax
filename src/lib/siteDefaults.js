export const SITE_CONTENT_KEY = 'homepage';

export const siteDefaults = {
  navbar: {
    brand: 'SYNTAX',
    logoUrl: '/logo.png',
    ctaLabel: 'Book a Call',
    navItems: [
      { label: 'Home', href: '#hero' },
      { label: 'Services', href: '#services' },
      { label: 'How We Work', href: '#process' },
      { label: 'Business Model', href: '#model' },
      { label: 'Team', href: '#team' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  hero: {
    tag: 'Data-Driven Growth',
    titleLead: 'We Help You',
    rotatingWords: ['Optimize.', 'Analyze.', 'Scale.'],
    description:
      'Syntax delivers data-driven strategies that accelerate your business growth with predictable, measurable results - turning complex data into your competitive edge.',
    primaryCtaLabel: 'Schedule a Consultation',
    secondaryCtaLabel: 'How We Work',
    imageUrl: '/optimization.png',
    imageAlt: 'Syntax data optimization',
    badgeLabel: 'Performance',
    badgeValue: '+340%',
    stats: [
      { num: '200+', label: 'Clients Served' },
      { num: '97%', label: 'Retention Rate' },
      { num: '3.5x', label: 'Avg. ROI' },
    ],
  },
  clients: {
    tag: 'Trusted Partners',
    title: 'Trusted By Industry Leaders',
    items: [
      { name: 'Client Alpha', color: '#00E5CC' },
      { name: 'Client Beta', color: '#0094FF' },
      { name: 'Client Gamma', color: '#00E5CC' },
      { name: 'Client Delta', color: '#0094FF' },
      { name: 'Client Epsilon', color: '#00E5CC' },
      { name: 'Client Zeta', color: '#0094FF' },
      { name: 'Client Eta', color: '#00E5CC' },
      { name: 'Client Theta', color: '#0094FF' },
    ],
  },
  services: {
    tag: 'What We Do',
    title: 'Meet Your Growth',
    titleAccent: 'Everywhere It Matters',
    subtitle:
      'Unlock your full growth potential with services engineered for measurable impact.',
    items: [
      {
        title: 'Data Analytics',
        desc: 'Transform raw data into actionable insights with advanced analytics frameworks tailored to your business vertical.',
        image: '/beyond_results.png',
        iconPath:
          'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      },
      {
        title: 'Growth Strategy',
        desc: 'Scalable, channel-specific strategies that eliminate guesswork and maximize your revenue potential across every touchpoint.',
        image: '/optimization.png',
        iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      },
      {
        title: 'Predictive Modeling',
        desc: 'Leverage machine learning to forecast market shifts, optimize pricing, and stay three steps ahead of your competition.',
        image: '/what_if.png',
        iconPath:
          'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      },
      {
        title: 'Process Automation',
        desc: 'Streamline operations and eliminate bottlenecks with intelligent automation that scales with your growth.',
        image: '/business_cycle.png',
        iconPath:
          'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      },
    ],
  },
  process: {
    tag: 'Our Process',
    title: 'How We',
    titleAccent: 'Drive Results',
    description:
      'With decades of experience and expertise, Syntax works side-by-side with your leadership team to ensure we are attacking every growth vector and delivering big against your goals.',
    imageUrl: '/business_cycle.png',
    imageAlt: 'Business cycle visualization',
    steps: [
      {
        num: '01',
        title: 'Discovery & Audit',
        desc: 'We deep-dive into your existing data infrastructure, business goals, and competitive landscape to identify high-impact opportunities.',
        accent: 'from-teal to-teal-dim',
      },
      {
        num: '02',
        title: 'Strategy Design',
        desc: 'Custom-built growth roadmap with clear KPIs, timeline milestones, and channel-specific tactics calibrated to your market.',
        accent: 'from-blue to-teal',
      },
      {
        num: '03',
        title: 'Execute & Optimize',
        desc: 'We deploy, measure, and continuously refine running rapid iterations backed by real-time data to maximize performance.',
        accent: 'from-teal to-blue',
      },
      {
        num: '04',
        title: 'Scale & Sustain',
        desc: 'Once we prove the model, we scale what works and build sustainable systems that compound growth quarter over quarter.',
        accent: 'from-teal-dim to-teal',
      },
    ],
  },
  model: {
    tag: 'Why Syntax',
    title: 'The Growth Partner You Can',
    titleAccent: 'Actually Count On',
    subtitle: "We're not just different. We're better.",
    ctaText:
      'The traditional growth model is broken. As your trusted partner, Syntax streamlines your sales and marketing efforts based on years of experience at the executive level.',
    ctaLabel: 'Meet The Team',
    cards: [
      {
        tag: 'Simple',
        title: 'One Partner. Total Coverage.',
        desc: 'No need to juggle multiple agencies and third-party consultants. We bring you a team of subject matter experts dedicated to growing your business under one roof.',
        iconPath:
          'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
        span: 'wide',
      },
      {
        tag: 'Fast',
        title: 'Accelerate From Day One.',
        desc: 'Hit the ground running with all the tools and people in one place, ready to race. An immediate executive team to reduce friction and scale faster.',
        iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
        span: 'normal',
      },
      {
        tag: 'Targeted',
        title: 'Precision Growth.',
        desc: 'Reduce growth conflicts between channels. We ensure that the strategy and execution supports true omni-channel growth without cannibalization.',
        iconPath:
          'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        span: 'normal',
      },
      {
        tag: 'Value',
        title: 'Multiplier Returns.',
        desc: 'Eliminate overlapping costs and questionable impact at all growth stages. Executive leadership at a fraction of the cost with exponential return.',
        iconPath:
          'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        span: 'wide',
      },
      {
        tag: 'Long-Term',
        title: 'Sustained Partnerships.',
        desc: 'Personalized focus on select brand partners to ensure each client receives specialized expertise from our leadership team for lasting impact.',
        iconPath:
          'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        span: 'normal',
      },
    ],
  },
  team: {
    tag: 'The Team',
    title: 'Meet Your',
    titleAccent: 'Growth Team',
    description:
      "With decades of experience and expertise, our team works side-by-side with your leadership to ensure we're delivering big against your growth goals.",
    members: [
      {
        name: 'Alex Chen',
        role: 'Chief Executive Officer',
        bio: 'Former VP of Analytics at a Fortune 500, Alex brings 15+ years of scaling data-driven businesses from seed to IPO.',
        initials: 'AC',
        imageUrl: '',
      },
      {
        name: 'Maya Rodriguez',
        role: 'Chief Strategy Officer',
        bio: 'Specializes in cross-channel growth architecture, Maya has led strategy for 200+ brands across every major vertical.',
        initials: 'MR',
        imageUrl: '',
      },
      {
        name: 'James Whitfield',
        role: 'VP of Data Science',
        bio: 'PhD in Applied Mathematics, James designs the predictive models that keep our clients three steps ahead of market shifts.',
        initials: 'JW',
        imageUrl: '',
      },
      {
        name: 'Priya Kapoor',
        role: 'Head of Partnerships',
        bio: 'Priya builds the bridge between data and relationships, ensuring every partnership delivers measurable value at scale.',
        initials: 'PK',
        imageUrl: '',
      },
      {
        name: 'Marcus Thompson',
        role: 'Director of Engineering',
        bio: 'Full-stack architect who builds the automation systems that transform insights into executable workflows.',
        initials: 'MT',
        imageUrl: '',
      },
      {
        name: 'Sarah Kim',
        role: 'Lead Analyst',
        bio: 'Sarah turns complex datasets into clear narratives, empowering clients to make confident, data-backed decisions.',
        initials: 'SK',
        imageUrl: '',
      },
    ],
  },
  consultation: {
    tag: 'Get Started',
    title: 'Schedule Your',
    titleAccent: 'Free Consultation',
    description:
      'Take the first step toward data-driven growth. Our team will analyze your current position and present a custom strategy - no strings attached.',
    benefits: [
      { text: '30-minute strategy session', icon: 'TIME' },
      { text: 'Custom growth roadmap', icon: 'MAP' },
      { text: 'No commitment required', icon: 'CHECK' },
    ],
    imageUrl: '/what_if.png',
    imageAlt: 'What if analysis',
    formTitle: "Let's Talk Growth",
    formSubtitle: 'Fill out the form below and we will be in touch within 24 hours.',
    buttonLabel: 'Schedule Consultation',
    successMessage: 'Thanks. Your request was sent successfully, and the team will follow up shortly.',
  },
  footer: {
    brand: 'SYNTAX',
    brandText:
      'Data-driven strategies that accelerate your business growth with predictable, measurable results.',
    navigation: [
      { label: 'Home', href: '#hero' },
      { label: 'Services', href: '#services' },
      { label: 'How We Work', href: '#process' },
      { label: 'Team', href: '#team' },
    ],
    services: ['Data Analytics', 'Growth Strategy', 'Predictive Modeling', 'Process Automation'],
    email: 'hello@syntax.io',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    ctaLabel: 'Book a Call',
    legalLinks: ['Privacy', 'Terms', 'Cookies'],
  },
};

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function deepMerge(defaults, incoming) {
  if (Array.isArray(defaults)) {
    return Array.isArray(incoming) ? incoming : defaults;
  }

  if (!isObject(defaults)) {
    return incoming === undefined || incoming === null ? defaults : incoming;
  }

  const merged = { ...defaults };
  Object.keys(defaults).forEach((key) => {
    merged[key] = deepMerge(defaults[key], incoming?.[key]);
  });
  Object.keys(incoming || {}).forEach((key) => {
    if (!(key in merged)) {
      merged[key] = incoming[key];
    }
  });
  return merged;
}
