import React from "react";
import PageWrapper from "../components/layout/PageWrapper";

export default function BookAppointment() {
  return (
    <PageWrapper>
      <section className="max-w-3xl mx-auto px-8 md:px-20 py-32">
        {/* HEADING */}
        <div className="mb-24">
          <h1 className="font-serif text-[48px] leading-[1.2] mb-8 font-light">
            Request a Consultation
          </h1>
          <p className="text-[18px] leading-[1.8] text-black/70 font-light mb-6">
            We accept a limited number of events each year to ensure every celebration receives our full creative attention and care. A consultation allows us to understand your vision, values, and expectations, and to determine if we're the right design house for your celebration.
          </p>
          <p className="text-sm text-black/60 font-light">
            Fill out the form below and we'll be in touch to schedule your consultation.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-10 mb-16">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-3 font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors text-sm placeholder-black/30"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-3 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors text-sm placeholder-black/30"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-3 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors text-sm placeholder-black/30"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-3 font-medium">
              Service of Interest
            </label>
            <select className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors text-sm">
              <option value="">Select a service</option>
              <option value="wedding">Full Wedding Design</option>
              <option value="creative">Creative Direction</option>
              <option value="styling">Fashion & Editorial Styling</option>
              <option value="event">Event Styling & Production</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-3 font-medium">
                Preferred Date
              </label>
              <input
                type="date"
                className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-3 font-medium">
                Preferred Time
              </label>
              <input
                type="time"
                className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-3 font-medium">
              Tell Us About Your Vision
            </label>
            <textarea
              rows="5"
              placeholder="Share details about your event, your style, and what you're envisioning..."
              className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors resize-none text-sm placeholder-black/30"
            />
          </div>

          <button
            type="submit"
            className="text-xs uppercase tracking-widest border border-black px-10 py-4 hover:bg-black hover:text-white transition-all font-medium"
          >
            Request Consultation
          </button>
        </form>

        {/* CONTACT INFO */}
        <div className="border-t border-black/10 pt-16 mt-16">
          <h3 className="font-serif text-[18px] mb-8 font-light">Prefer to connect directly?</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest text-black/60 mb-1">Phone</p>
              <p className="text-[16px] font-light">
                <a href="tel:+233553586655" className="hover:text-black/70 transition-colors">
                  +233 553 586 655
                </a>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-black/60 mb-1">Email</p>
              <p className="text-[16px] font-light">
                <a href="mailto:hello@hcevents.com" className="hover:text-black/70 transition-colors">
                  hello@hcevents.com
                </a>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-black/60 mb-1">Instagram</p>
              <p className="text-[16px] font-light">
                <a href="https://instagram.com/hceventsgh" target="_blank" rel="noopener noreferrer" className="hover:text-black/70 transition-colors">
                  @hceventsgh
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
