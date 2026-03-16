import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function Consultation() {
  const sectionRef = useReveal();
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get('firstName')?.toString().trim() ?? '',
      lastName: formData.get('lastName')?.toString().trim() ?? '',
      email: formData.get('email')?.toString().trim() ?? '',
      company: formData.get('company')?.toString().trim() ?? '',
      service: formData.get('service')?.toString().trim() ?? '',
      message: formData.get('message')?.toString().trim() ?? '',
    };

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_API_URL || '/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your request right now.');
      }

      setSubmitState('success');
      setSubmitMessage('Thanks. Your consultation request was sent successfully.');
      form.reset();
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error.message || 'Unable to send your request right now.');
    }
  };

  return (
    <section id="consultation" ref={sectionRef} className="mesh-bg-alt relative py-44 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
      <div className="orb w-[400px] h-[400px] bg-teal/5 top-[20%] left-[-5%]" style={{ animationDelay: '3s' }} />
      <div className="orb w-[300px] h-[300px] bg-blue/4 bottom-[10%] right-[-3%]" style={{ animationDelay: '7s' }} />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <div className="reveal">
              <span className="section-tag">Get Started</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bone mt-6 mb-6 leading-[1.05]">
                Schedule Your
                <span className="block bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
                  Free Consultation
                </span>
              </h2>
            </div>

            <p className="reveal reveal-delay-1 font-body text-lg text-smoke max-w-md leading-relaxed mb-10">
              Take the first step toward data-driven growth. Our team will analyze your current position and present a custom strategy — no strings attached.
            </p>

            <div className="reveal reveal-delay-2 space-y-6 mb-10">
              {[
                { text: '30-minute strategy session', icon: '\u23F1' },
                { text: 'Custom growth roadmap', icon: '\uD83D\uDDFA' },
                { text: 'No commitment required', icon: '\u2713' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-heading text-sm text-bone">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-3">
              <img src="/what_if.png" alt="What if analysis" className="rounded-sm border border-steel/30 shadow-2xl shadow-teal/5 max-w-sm" />
            </div>
          </div>

          <div id="contact" className="reveal reveal-delay-2">
            <div className="glass-card rounded-sm p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-[1px] h-12 bg-gradient-to-b from-teal/50 to-transparent" />
                <div className="absolute top-0 left-0 w-12 h-[1px] bg-gradient-to-r from-teal/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-gradient-to-t from-teal/50 to-transparent" />
                <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-gradient-to-l from-teal/50 to-transparent" />
              </div>

              <h3 className="font-display text-2xl font-bold text-bone mb-2">Let's Talk Growth</h3>
              <p className="font-body text-sm text-ash mb-8">Fill out the form below and we will be in touch within 24 hours.</p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="first-name" className="block font-heading text-xs text-ash uppercase tracking-widest mb-2">First Name</label>
                    <input id="first-name" name="firstName" type="text" className="form-input rounded-sm" placeholder="John" autoComplete="given-name" required />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block font-heading text-xs text-ash uppercase tracking-widest mb-2">Last Name</label>
                    <input id="last-name" name="lastName" type="text" className="form-input rounded-sm" placeholder="Doe" autoComplete="family-name" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="work-email" className="block font-heading text-xs text-ash uppercase tracking-widest mb-2">Work Email</label>
                  <input id="work-email" name="email" type="email" className="form-input rounded-sm" placeholder="john@company.com" autoComplete="email" required />
                </div>

                <div>
                  <label htmlFor="company" className="block font-heading text-xs text-ash uppercase tracking-widest mb-2">Company</label>
                  <input id="company" name="company" type="text" className="form-input rounded-sm" placeholder="Acme Inc." autoComplete="organization" />
                </div>

                <div>
                  <label htmlFor="service-interest" className="block font-heading text-xs text-ash uppercase tracking-widest mb-2">What are you looking for?</label>
                  <select id="service-interest" name="service" className="form-input rounded-sm appearance-none cursor-pointer" defaultValue="">
                    <option value="">Select a service...</option>
                    <option value="analytics">Data Analytics</option>
                    <option value="strategy">Growth Strategy</option>
                    <option value="modeling">Predictive Modeling</option>
                    <option value="automation">Process Automation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-heading text-xs text-ash uppercase tracking-widest mb-2">Message</label>
                  <textarea id="message" name="message" className="form-input rounded-sm resize-none" rows={4} placeholder="Tell us about your growth goals..." />
                </div>

                {submitState !== 'idle' && submitMessage && (
                  <p
                    className={`rounded-sm px-4 py-3 font-body text-sm ${
                      submitState === 'success'
                        ? 'border border-teal/20 bg-teal/5 text-teal'
                        : submitState === 'error'
                          ? 'border border-red-500/20 bg-red-500/10 text-red-300'
                          : 'border border-steel/40 bg-graphite/40 text-smoke'
                    }`}
                    aria-live="polite"
                  >
                    {submitMessage}
                  </p>
                )}

                <button type="submit" className="btn-primary w-full justify-center mt-2 disabled:cursor-not-allowed disabled:opacity-70" disabled={submitState === 'submitting'}>
                  {submitState === 'submitting' ? 'Sending...' : 'Schedule Consultation'}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
