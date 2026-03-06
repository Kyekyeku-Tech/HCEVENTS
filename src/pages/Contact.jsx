import React from "react";
import PageWrapper from "../components/layout/PageWrapper";

export default function Contact() {
  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-8 md:px-20 py-32">
        {/* INTRO */}
        <div className="max-w-2xl mb-24">
          <h1 className="font-serif text-[36px] leading-[1.3] mb-8 font-light">
            Contact
          </h1>
          <p className="text-sm opacity-60 leading-relaxed font-light">
            We work with a limited number of clients each year.
            Please reach out with thoughtful details about your
            project and our studio will be in touch.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {/* DETAILS */}
          <div className="text-sm opacity-60 leading-relaxed font-light">
            <p className="mb-8">
              For new project inquiries, please include your event
              date, location, and a brief overview of your vision.
            </p>

            <p className="text-xs uppercase tracking-widest mb-2">
              Email
            </p>
            <p className="mb-8">
              <a
                href="mailto:hello@hcevents.com"
                className="hover:opacity-60 transition-opacity"
              >
                hello@hcevents.com
              </a>
            </p>

            <p className="text-xs">
              Based in Ghana · Available Worldwide
            </p>
          </div>

          {/* SIMPLE FORM */}
          <form className="space-y-8">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-3">
                Name
              </label>
              <input
                type="text"
                className="w-full border-b border-black/20 bg-transparent py-2 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-3">
                Email
              </label>
              <input
                type="email"
                className="w-full border-b border-black/20 bg-transparent py-2 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-3">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full border border-black/20 bg-transparent p-4 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <button
              type="submit"
              className="border border-black px-10 py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}
