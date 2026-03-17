import { useReveal } from '../hooks/useReveal';

function ClientLogo({ name, color }) {
  return (
    <div className="flex-shrink-0 mx-8 flex items-center justify-center w-48 h-20 glass-card rounded-sm px-6 group hover:border-teal/30 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-sm flex items-center justify-center font-display text-sm font-bold text-void"
          style={{ background: color }}
        >
          {name.charAt(0)}
        </div>
        <span className="font-heading text-sm text-smoke group-hover:text-teal transition-colors duration-300 whitespace-nowrap">
          {name}
        </span>
      </div>
    </div>
  );
}

export default function ClientMarquee({ data }) {
  const sectionRef = useReveal();
  const clients = data?.items || [];
  const doubled = [...clients, ...clients];

  return (
    <section ref={sectionRef} className="relative py-36 bg-carbon overflow-hidden">
      <div className="glow-line w-full mb-16" />

      <div className="reveal max-w-[90rem] mx-auto px-6 lg:px-12 2xl:px-16 mb-12 text-center">
        <span className="section-tag">{data?.tag || 'Trusted Partners'}</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mt-6">
          {data?.title || 'Trusted By Industry Leaders'}
        </h2>
      </div>

      <div className="reveal reveal-delay-2 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-carbon to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-carbon to-transparent z-10" />

        <div className="marquee-track">
          {doubled.map((client, i) => (
            <ClientLogo key={`${client.name}-${i < clients.length ? 'a' : 'b'}`} {...client} />
          ))}
        </div>
      </div>

      <div className="glow-line w-full mt-16" />
    </section>
  );
}
