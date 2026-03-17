import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function Consultation() {
  const sectionRef = useReveal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get('firstName') || '').trim(),
      lastName: String(formData.get('lastName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      service: String(formData.get('service') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    setIsSubmitting(true);
    setSubmitError('');
    setIsSubmitted(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to send your request. Please try again.';
        try {
          const data = await response.json();
          if (typeof data?.error === 'string' && data.error.trim()) {
            errorMessage = data.error;
          }
        } catch {
          // Ignore JSON parsing errors and use the fallback message.
        }
        throw new Error(errorMessage);
      }

      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" ref={sectionRef} className="mesh-bg-alt relative py-44 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
      <div className="orb w-[400px] h-[400px] bg-teal/5 top-[20%] left-[-5%]" style={{ animationDelay: '3s' }} />
      <div className="orb w-[300px] h-[300px] bg-blue/4 bottom-[10%] right-[-3%]" style={{ animationDelay: '7s' }} />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 2xl:px-16">
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

                {submitError && (
                  <p className="rounded-sm border border-red-400/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-200" aria-live="polite">
                    {submitError}
                  </p>
                )}

                {isSubmitted && (
                  <p className="rounded-sm border border-teal/20 bg-teal/5 px-4 py-3 font-body text-sm text-teal" aria-live="polite">
                    Thanks. Your request was sent successfully, and the team will follow up shortly.
                  </p>
                )}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Sending...' : 'Schedule Consultation'}
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
