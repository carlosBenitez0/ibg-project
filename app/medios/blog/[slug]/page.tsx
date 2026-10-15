import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  IoArrowBack,
  IoCalendarClearOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { LuUserRound } from 'react-icons/lu';
import { Navbar } from '@/app/components/shared/general/Navbar';
import { Footer } from '@/app/components/shared/general/Footer';
import {
  blogPosts,
  formatPostDate,
  getPostBySlug,
  sortedPosts,
} from '@/app/data/blog';
import { BlogCard } from '../_components/BlogCard';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () =>
  blogPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog IBG`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [post.image],
    },
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = sortedPosts
    .filter((item) => item.slug !== post.slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) -
        Number(a.category === post.category)
    )
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <article>
          {/* Encabezado del artículo */}
          <header className="relative w-full overflow-hidden bg-navy-900 text-white">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div className="relative mx-auto flex w-full max-w-5xl flex-col items-start px-5 py-20 sm:px-8 md:py-28">
              <Link
                href="/medios/blog"
                className="mb-10 flex items-center gap-2 text-2xl text-gold-300 hover:text-gold-200"
              >
                <IoArrowBack />
                Volver al blog
              </Link>
              <span className="mb-6 rounded-full bg-gold-500 px-4 py-1 text-xl font-semibold text-white">
                {post.category}
              </span>
              <h1 className="mb-8 font-playfair text-5xl font-bold leading-tight md:text-7xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-2xl text-white/85">
                <span className="flex items-center gap-2">
                  <LuUserRound className="text-gold-400" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <IoCalendarClearOutline className="text-gold-400" />
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </span>
                <span className="flex items-center gap-2">
                  <IoTimeOutline className="text-gold-400" />
                  {post.readTime} de lectura
                </span>
              </div>
            </div>
          </header>

          {/* Cuerpo */}
          <div className="w-full bg-white px-5 py-16 sm:px-8 md:py-24">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
              <p className="text-3xl font-medium leading-relaxed text-navy-800">
                {post.excerpt}
              </p>
              {post.content.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[1.8rem] leading-relaxed text-navy-700"
                >
                  {paragraph}
                </p>
              ))}

              {post.verse && (
                <blockquote className="mt-4 rounded-3xl border-l-4 border-gold-500 bg-[#fffaf3] p-8">
                  <p className="mb-3 font-playfair text-3xl italic leading-relaxed text-navy-900">
                    &quot;{post.verse.text}&quot;
                  </p>
                  <cite className="text-2xl font-semibold not-italic text-bronze-700">
                    {post.verse.reference}
                  </cite>
                </blockquote>
              )}
            </div>
          </div>
        </article>

        {/* Artículos relacionados */}
        <section className="w-full bg-linear-to-br from-[#fffaf3] to-gold-50 px-5 py-20 sm:px-8 md:px-12 md:py-24">
          <div className="mx-auto flex w-full max-w-440 flex-col gap-12">
            <h2 className="text-center font-playfair text-5xl font-semibold text-navy-900 md:text-6xl">
              Sigue Leyendo
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
