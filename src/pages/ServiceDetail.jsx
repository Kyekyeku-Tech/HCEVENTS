import React from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import useFetch from "../hooks/useFetch";
import Loader from "../components/ui/Loader";

export default function ServiceDetail() {
  const { slug } = useParams();

  const { data: services, loading } = useFetch("services");

  const service = services?.find(
    (s) => s.slug === slug
  );

  if (loading) {
    return (
      <PageWrapper>
        <Loader label="Loading service" />
      </PageWrapper>
    );
  }

  if (!service) {
    return (
      <PageWrapper>
        <p className="text-sm opacity-60 px-6 py-24">
          Service not found.
        </p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="max-w-5xl mx-auto px-8 md:px-20 py-32">
        {/* HEADER */}
        <div className="mb-24">
          <h1 className="font-serif text-[36px] leading-[1.3] mb-8 font-light">
            {service.title}
          </h1>

          <p className="text-sm opacity-60 max-w-2xl font-light">
            {service.subtitle}
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="font-serif text-[15px] leading-[1.8] text-black/70 mb-28 whitespace-pre-line font-light">
          {service.content}
        </div>

        {/* SUBLINKS */}
        {service.sublinks?.length > 0 && (
          <div className="space-y-24">
            {service.sublinks.map((item, index) => (
              <div key={index}>
                <h2 className="font-serif text-[20px] mb-6 font-light">
                  {item.title}
                </h2>
                <p className="text-sm opacity-60 leading-relaxed whitespace-pre-line font-light">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
