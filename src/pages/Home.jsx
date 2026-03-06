import PageWrapper from "../components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO */}
      <section
        className="relative min-h-screen"
        aria-labelledby="home-hero-heading"
      >
        <div className="absolute inset-0 bg-white/30" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-8 md:px-20 h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <p className="text-[9px] uppercase tracking-widest mb-6">
              HC Events
            </p>

            <h1
              id="home-hero-heading"
              className="font-serif text-[48px] leading-[1.2] max-w-2xl font-light mx-auto"
            >
              Thoughtful wedding design
              <br />
              &amp; creative direction
            </h1>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section aria-labelledby="home-philosophy-heading">
        <div className="max-w-5xl mx-auto px-8 md:px-20 py-48">
          <h2 id="home-philosophy-heading" className="sr-only">
            Studio Philosophy
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif text-[22px] leading-[1.8] text-black/70 font-light"
          >
            Our studio approaches each project with a deep respect for place,
            story, and atmosphere. We create environments that feel effortless
            and intimate, shaped by context and guided by intention.
          </motion.p>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section aria-labelledby="home-services-heading">
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-48 grid grid-cols-1 md:grid-cols-12 gap-24">
          <h2 id="home-services-heading" className="sr-only">
            Services
          </h2>

          <div className="md:col-span-4 md:col-start-2">
            <p className="text-[9px] uppercase tracking-widest mb-8">
              Services
            </p>

            <ul className="font-serif text-[18px] leading-[2.2] text-black/70 space-y-2 font-light">
              <li>Full Wedding Design</li>
              <li>Event Styling &amp; Production</li>
              <li>Creative Direction</li>
              <li>Fashion &amp; Editorial Styling</li>
            </ul>
          </div>

          <div className="md:col-span-4 md:col-start-8 font-serif text-[14px] leading-[1.8] text-black/60 font-light">
            <p>
              Each service is approached collaboratively and intentionally,
              allowing every celebration to feel personal, refined, and
              connected to its surroundings.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section aria-labelledby="home-featured-work">
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-48">
          <h2 id="home-featured-work" className="sr-only">
            Featured Work
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5defcfceeee234450f3199e1/faf124c6-85d0-4c09-a5bd-f67f1a53536c/Screenshot+2026-02-04+at+6.36.02%E2%80%AFPM.png?format=750w"
              alt="Luxury wedding design"
              className="w-full object-cover"
            />

            <img
              src="https://images.squarespace-cdn.com/content/v1/5defcfceeee234450f3199e1/ad8976c1-5111-4daa-b5d5-4afc71c20dca/Subject+copy+2.png?format=500w"
              alt="Intimate wedding styling"
              className="w-full object-cover"
            />

            <img
              src="https://images.squarespace-cdn.com/content/v1/5defcfceeee234450f3199e1/6db62eb5-6dd9-4329-b566-0ba94726012e/Subject.png?format=750w"
              alt="Signature wedding design by HC Events"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section aria-labelledby="home-what-we-do">
        <div className="max-w-5xl mx-auto px-8 md:px-20 py-48 text-center">
          <h2 id="home-what-we-do" className="sr-only">
            What We Do
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif text-[18px] leading-[1.8] text-black/60 font-light mb-12"
          >
            Think of us as the interior designer, creative director and stylist of your wedding. Our job as your event designer is to think carefully through each and every aspect of your wedding, proposing a cohesive overall concept as well as all the little details that bring it to life. This includes large scale design backdrops like your wedding ceremony and dinner reception, but it also includes everything from the band stage to the bar; the cake, invitations, welcome gifts and seating assignments. We oversee, direct and create every aspect of the day, managing every single vendor aesthetically throughout the process. From concept to creation, we produce and provide all the parts necessary to bring our vision to life.
          </motion.p>

          <Link to="/contact">
            <Button variant="outline" size="md">
              Request a Consultation
            </Button>
          </Link>
        </div>
      </section>

      {/* RECENTLY ON INSTAGRAM */}
      <section aria-labelledby="home-instagram">
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-48">
          <h2 id="home-instagram" className="text-center text-[18px] uppercase tracking-widest mb-12">
            Recently on Instagram
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Instagram Video 1 */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <iframe
                src="https://www.instagram.com/reel/DQEbhT0iDz-/embed"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>

            
            <div className="aspect-square overflow-hidden rounded-lg">
              <iframe
                src="https://www.instagram.com/reel/DJHG7fKCVXw/embed"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
            {/* Instagram Video 3 */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <iframe
                src="https://www.instagram.com/reel/DI9i5X6iMUI/embed"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>

            {/* Instagram Video 4 */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <iframe
                src="https://www.instagram.com/reel/DLhe2LGCfYx/embed"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING STATEMENT */}
      <section aria-labelledby="home-closing-heading">
        <div className="max-w-4xl mx-auto px-8 md:px-20 py-48 text-center">
          <h2 id="home-closing-heading" className="sr-only">
            Closing Statement
          </h2>

          <p className="font-serif text-[18px] leading-[1.8] text-black/60 font-light">
            We accept a limited number of events each year to ensure every
            celebration receives our full creative attention and care.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
