import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import useFetch from "../hooks/useFetch";
import Loader from "../components/ui/Loader";
import { Link } from "react-router-dom";

export default function Services() {
  const { data: services, loading } = useFetch("services", {
    orderBy: "title",
    direction: "asc",
  });

  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-8 md:px-20 py-32">
        {/* INTRO */}
        <div className="max-w-3xl mb-32">
          <h1 className="font-serif text-[36px] leading-[1.3] mb-8 font-light">
            Services
          </h1>
          <p className="text-sm opacity-60 leading-relaxed font-light">
            Our studio offers a range of design and creative direction
            services rooted in thoughtful detail, atmosphere, and
            understated elegance.
          </p>
        </div>

        {/* LIST */}
        {loading ? (
          <Loader label="Loading services" />
        ) : services.length === 0 ? (
          <p className="text-sm opacity-60">
            Services will be available soon.
          </p>
        ) : (
          <div className="space-y-24">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 pb-12 border-b border-black/10"
              >
                <div className="max-w-2xl flex-1">
                  <h2 className="font-serif text-[20px] mb-6 font-light">
                    {service.title}
                  </h2>
                  <p className="text-sm opacity-60 leading-relaxed font-light">
                    {service.subtitle}
                  </p>
                </div>

                <Link
                  to={`/services/${service.slug}`}
                  className="text-[9px] uppercase tracking-widest text-black/60 hover:text-black transition-colors whitespace-nowrap"
                >
                  View Service →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
