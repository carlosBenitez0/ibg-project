'use client';

import Image from 'next/image';
import { IoCalendarClearOutline, IoTimeOutline } from 'react-icons/io5';
import { LuUserRound } from 'react-icons/lu';
import { Button } from '@/app/components/shared/ui/Button';
import { featuredPost, formatPostDate } from '@/app/data/blog';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

export const FeaturedPost = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const post = featuredPost;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-5 py-20 sm:px-8 md:px-12 md:py-24"
    >
      <article
        data-reveal
        className="mx-auto grid w-full max-w-440 grid-cols-1 overflow-hidden rounded-3xl bg-[#fffaf3] shadow-[0_18px_50px_rgba(15,23,42,0.14)] lg:grid-cols-2"
      >
        <div className="relative h-80 lg:h-auto lg:min-h-[44rem]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-8 md:p-14">
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-navy-900 px-4 py-1 text-xl font-semibold text-white">
              Artículo Destacado
            </span>
            <span className="rounded-full bg-gold-100 px-4 py-1 text-xl font-semibold text-gold-800">
              {post.category}
            </span>
          </div>

          <h2 className="mb-6 font-playfair text-4xl font-bold leading-tight text-navy-900 md:text-5xl">
            {post.title}
          </h2>
          <p className="mb-8 text-2xl leading-relaxed text-navy-700 md:text-[1.8rem]">
            {post.excerpt}
          </p>

          <div className="mb-10 flex flex-wrap gap-x-6 gap-y-3 text-xl text-navy-600">
            <span className="flex items-center gap-2">
              <LuUserRound className="text-gold-600" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <IoCalendarClearOutline className="text-gold-600" />
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-2">
              <IoTimeOutline className="text-gold-600" />
              {post.readTime}
            </span>
          </div>

          <Button
            href={`/medios/blog/${post.slug}`}
            size="lg"
            className="self-start"
          >
            Leer Artículo Completo
          </Button>
        </div>
      </article>
    </section>
  );
};

export default FeaturedPost;
