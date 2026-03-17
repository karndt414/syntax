import { useReveal } from '../hooks/useReveal';
export default function HowWeWork({ data }) {
  const sectionRef = useReveal();
  const steps = data?.steps || [];

  return (
    <section id="process" ref={sectionRef} className="mesh-bg-alt relative py-44 overflow-hidden stripe-pattern">
      <div className="orb w-[500px] h-[500px] bg-teal/4 top-[10%] right-[-10%]" style={{ animationDelay: '2s' }} />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 2xl:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="reveal">
              <span className="section-tag">{data?.tag || 'Our Process'}</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bone mt-6 mb-6 leading-[1.05]">
                {data?.title || 'How We'}
                <span className="block bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
                  {data?.titleAccent || 'Drive Results'}
                </span>
              </h2>
              <p className="font-body text-lg text-smoke max-w-md leading-relaxed mb-10">
                {data?.description}
              </p>
            </div>

            <div className="reveal reveal-delay-2">
              <img src={data?.imageUrl || '/business_cycle.png'} alt={data?.imageAlt || 'Business cycle visualization'} className="rounded-sm border border-steel/30 shadow-2xl shadow-teal/5" />
            </div>
          </div>

          <div className="space-y-8 lg:pt-8">
            {steps.map((step, i) => (
              <div key={step.num} className={`reveal reveal-delay-${i + 1} group relative`}>
                {i < steps.length - 1 && <div className="step-connector" />}
                <div className="relative flex gap-6">
                  <div className="flex-shrink-0 relative">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-lg shadow-teal/10 group-hover:shadow-teal/30 transition-shadow duration-500`}>
                      <span className="font-display text-sm font-bold text-void">{step.num}</span>
                    </div>
                  </div>
                  <div className="glass-card rounded-sm p-6 sm:p-8 flex-1 group-hover:border-teal/20 transition-all duration-500">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-bone mb-3 group-hover:text-teal transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="font-body text-smoke leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
