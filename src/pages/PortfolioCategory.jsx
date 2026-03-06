import React from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import useFetch from "../hooks/useFetch";
import Loader from "../components/ui/Loader";

const CATEGORY_LABELS = {
  "wedding-design": "Wedding Design",
  "fashion-styling-creative-direction":
    "Fashion Styling & Creative Direction",
  "product-design": "Product Design",
  "creative-direction": "Creative Direction",
};

export default function PortfolioCategory() {
  const { category } = useParams();

  const { data: items, loading } = useFetch("portfolio", {
    orderBy: "createdAt",
  });

  const filteredItems = items?.filter(
    (item) => item.category === category
  );

  const title =
    CATEGORY_LABELS[category] ||
    category.replace(/-/g, " ");

  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-8 md:px-20 py-32">
        {/* HEADER */}
        <div className="mb-24">
          <h1 className="font-serif text-[36px] leading-[1.3] mb-8 font-light">
            {title}
          </h1>
          <p className="text-sm opacity-60 max-w-2xl font-light">
            A curated selection of projects within this category,
            reflecting our studio’s approach to detail and atmosphere.
          </p>
        </div>

        {/* CONTENT */}
        {loading ? (
          <Loader label="Loading projects" />
        ) : filteredItems.length === 0 ? (
          <p className="text-sm opacity-60">
            No projects available in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {filteredItems.map((item) => (
              <article key={item.id}>
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full mb-8"
                />

                <h2 className="font-serif text-[18px] mb-2 font-light">
                  {item.title}
                </h2>

                <p className="text-[9px] uppercase tracking-widest opacity-50">
                  {title}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
