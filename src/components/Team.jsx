import { useReveal } from '../hooks/useReveal';

const TEAM_MEMBERS = [
  {
    name: 'Alex Chen',
    role: 'Chief Executive Officer',
    bio: 'Former VP of Analytics at a Fortune 500, Alex brings 15+ years of scaling data-driven businesses from seed to IPO.',
    initials: 'AC',
  },
  {
    name: 'Maya Rodriguez',
    role: 'Chief Strategy Officer',
    bio: 'Specializes in cross-channel growth architecture, Maya has led strategy for 200+ brands across every major vertical.',
    initials: 'MR',
  },
  {
    name: 'James Whitfield',
    role: 'VP of Data Science',
    bio: 'PhD in Applied Mathematics, James designs the predictive models that keep our clients three steps ahead of market shifts.',
    initials: 'JW',
  },
  {
    name: 'Priya Kapoor',
    role: 'Head of Partnerships',
    bio: 'Priya builds the bridge between data and relationships, ensuring every partnership delivers measurable value at scale.',
    initials: 'PK',
  },
  {
    name: 'Marcus Thompson',
    role: 'Director of Engineering',
    bio: 'Full-stack architect who builds the automation systems that transform insights into executable workflows.',
    initials: 'MT',
  },
  {
    name: 'Sarah Kim',
    role: 'Lead Analyst',
    bio: 'Sarah turns complex datasets into clear narratives, empowering clients to make confident, data-backed decisions.',
    initials: 'SK',
  },
];

export default function Team() {
  const sectionRef = useReveal();

  return (
    <section id="team" ref={sectionRef} className="mesh-bg relative py-44 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 2xl:px-16">
        <div className="reveal text-center mb-20">
          <span className="section-tag">The Team</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bone mt-6 mb-6">
            Meet Your
            <span className="block bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
              Growth Team
            </span>
          </h2>
          <p className="font-body text-lg text-smoke max-w-2xl mx-auto">
            With decades of experience and expertise, our team works side-by-side
            with your leadership to ensure we're delivering big against your growth goals.
          </p>
        </div>

        {/* Team grid — 3 column with overlap */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={member.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} team-card group`}
            >
              <div className="relative glass-card rounded-sm overflow-hidden">
                {/* Avatar placeholder with initials */}
                <div className="relative h-64 bg-gradient-to-br from-graphite to-steel overflow-hidden">
                  <div className="absolute inset-0 dot-grid" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl font-extrabold text-teal/20 group-hover:text-teal/40 transition-colors duration-500">
                      {member.initials}
                    </span>
                  </div>
                  {/* Teal glow on hover */}
                  <div className="team-overlay absolute inset-0 bg-gradient-to-t from-teal/20 via-transparent to-transparent opacity-0 transition-opacity duration-500" />
                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-graphite/80 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-bone group-hover:text-teal transition-colors duration-300">
                    {member.name}
                  </h3>
                  <span className="font-heading text-xs text-teal uppercase tracking-[0.15em] block mt-1 mb-3">
                    {member.role}
                  </span>
                  <p className="font-body text-sm text-smoke leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
                  <div className="absolute top-0 left-0 w-[1px] h-6 bg-gradient-to-b from-teal/40 to-transparent" />
                  <div className="absolute top-0 left-0 w-6 h-[1px] bg-gradient-to-r from-teal/40 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
