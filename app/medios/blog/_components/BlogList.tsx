'use client';

import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { recentPosts } from '@/app/data/blog';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';
import { BlogCard } from './BlogCard';

export const BlogList = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-linear-to-br from-[#fffaf3] to-gold-50 px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
        <div data-reveal>
          <SectionHeader
            title="Artículos Recientes"
            subtitle="Mantente al día con nuestras últimas reflexiones y enseñanzas"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
