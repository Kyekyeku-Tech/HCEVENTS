import React from "react";
import PageWrapper from "../components/layout/PageWrapper";

export default function About() {
  return (
    <PageWrapper>
      <section
        className="relative min-h-screen w-full overflow-hidden"
        aria-labelledby="about-heading"
      >
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/e7/f0/c6/e7f0c64ed3866441904959b0477d4d2c.jpg')",
          }}
        />

        {/* OVERLAY */}
        <div
          className="absolute inset-0 bg-white/40"
          aria-hidden="true"
        />

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-8 md:px-20 py-32 grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
          {/* IMAGE */}
          <div className="md:col-span-5 md:col-start-2">
            <img
              src="/CEO.jpeg"
              alt="Portrait of Joy, founder and creative director"
              className="w-full max-w-md"
            />
          </div>

          {/* TEXT */}
          <div className="md:col-span-4 md:col-start-8">
            <h1
              id="about-heading"
              className="sr-only"
            >
              About Joy
            </h1>

            <div className="font-serif text-[15px] leading-[2.0] text-black/70 font-light">
              <p className="mb-6">
                My name is HC.
              </p>

              <p className="mb-6">
                I am a designer; a dreamer, a lover, a thinker, a creator.
              </p>

              <p className="mb-6">
                I am an optimist, a musician; a lover of antiques, Africa,
                sushi, and gardening. My work is rooted in storytelling,
                refinement, and a deep appreciation for craft.
              </p>

              <p>
                Understated elegance is the cornerstone of my design. Every
                detail is intentional, every environment considered, and
                every experience shaped with care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
