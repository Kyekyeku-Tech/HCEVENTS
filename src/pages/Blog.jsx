import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import useFetch from "../hooks/useFetch";
import Loader from "../components/ui/Loader";

export default function Blog() {
  const { data: posts, loading } = useFetch("blog", {
    orderBy: "createdAt",
  });

  return (
    <PageWrapper>
      <section
        className="max-w-7xl mx-auto px-8 md:px-20 py-32"
        aria-labelledby="blog-heading"
      >
        {/* INTRO */}
        <header className="max-w-3xl mb-32">
          <h1
            id="blog-heading"
            className="font-serif text-[36px] leading-[1.3] mb-8 font-light"
          >
            Journal
          </h1>

          <p className="text-sm leading-relaxed text-black/60 font-light">
            Thoughts, inspiration, and selected work from our studio.
            A quiet place for reflection, process, and ideas that shape
            our creative work.
          </p>
        </header>

        {/* CONTENT */}
        {loading ? (
          <Loader label="Loading journal" />
        ) : posts.length === 0 ? (
          <p
            className="text-sm text-black/60"
            role="status"
          >
            Journal entries coming soon.
          </p>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-y-32 gap-x-16"
            aria-live="polite"
          >
            {posts.map((post, index) => (
              <article
                key={post.id}
                className={`
                  md:col-span-5
                  ${index % 2 === 0 ? "md:col-start-1" : "md:col-start-7"}
                `}
              >
                {/* IMAGE */}
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full object-cover mb-10"
                  />
                )}

                {/* META */}
                <p className="text-[9px] uppercase tracking-widest text-black/40 mb-4">
                  {post.category || "Journal"}
                </p>

                {/* TITLE */}
                <h2 className="font-serif text-[18px] leading-[1.5] mb-6 font-light">
                  {post.title}
                </h2>

                {/* EXCERPT */}
                {post.excerpt && (
                  <p className="text-sm leading-relaxed text-black/60 mb-8 font-light">
                    {post.excerpt}
                  </p>
                )}

                {/* LINK */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-[9px] uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                  aria-label={`Read article: ${post.title}`}
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
