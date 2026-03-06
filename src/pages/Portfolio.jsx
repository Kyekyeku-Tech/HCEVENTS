import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import useFetch from "../hooks/useFetch";
import Loader from "../components/ui/Loader";
import { useState } from "react";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Wedding Design", value: "wedding-design" },
  { label: "Fashion Styling & Creative Direction", value: "fashion-styling-creative-direction" },
  { label: "Product Design", value: "product-design" },
  { label: "Creative Direction", value: "creative-direction" },
];

export default function Portfolio() {
  const { data: items, loading } = useFetch("portfolio", {
    orderBy: "createdAt",
  });

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-8 md:px-20 py-32">
        {/* HEADER */}
        <div className="mb-24">
          <h1 className="font-serif text-[36px] leading-[1.3] mb-8 font-light">
            Portfolio
          </h1>
          <p className="text-sm opacity-60 max-w-2xl font-light">
            A curated selection of weddings, creative direction, and
            design projects from our studio.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap gap-8 mb-24 text-[9px] uppercase tracking-widest">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`transition-opacity ${
                activeCategory === cat.value
                  ? "opacity-100 border-b border-black pb-1"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <Loader label="Loading portfolio" />
        ) : filteredItems.length === 0 ? (
          <p className="text-sm opacity-60">
            No projects available in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {filteredItems.map((item) => (
              <article key={item.id}>
                {/* MAIN IMAGE */}
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full mb-8"
                />

                {/* TITLE */}
                <h2 className="font-serif text-[18px] mb-2 font-light">
                  {item.title}
                </h2>

                {/* CATEGORY */}
                <p className="text-[9px] uppercase tracking-widest opacity-50">
                  {item.category.replace(/-/g, " ")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
