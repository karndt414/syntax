import { useReveal } from '../hooks/useReveal';
export default function Team({ data }) {
  const sectionRef = useReveal();
  const members = data?.members || [];

  return (
    <section id="team" ref={sectionRef} className="mesh-bg relative py-44 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 2xl:px-16">
        <div className="reveal text-center mb-20">
          <span className="section-tag">{data?.tag || 'The Team'}</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bone mt-6 mb-6">
            {data?.title || 'Meet Your'}
            <span className="block bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
              {data?.titleAccent || 'Growth Team'}
            </span>
          </h2>
          <p className="font-body text-lg text-smoke max-w-2xl mx-auto">
            {data?.description}
          </p>
        </div>

        {/* Team grid — 3 column with overlap */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, i) => (
            <div
              key={member.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} team-card group`}
            >
              <div className="relative glass-card rounded-sm overflow-hidden">
                {/* Avatar placeholder with initials */}
                <div className="relative h-64 bg-gradient-to-br from-graphite to-steel overflow-hidden">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 dot-grid" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-6xl font-extrabold text-teal/20 group-hover:text-teal/40 transition-colors duration-500">
                          {member.initials}
                        </span>
                      </div>
                    </>
                  )}
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
