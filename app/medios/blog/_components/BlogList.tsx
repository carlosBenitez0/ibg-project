'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { SectionHeader } from '@/app/components/shared/SectionHeader';
import {
  blogCategories,
  recentPosts,
  type BlogCategory,
} from '@/app/data/blog';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';
import { BlogCard } from './BlogCard';

const PAGE_SIZE = 6;
const ALL = 'Todos';

const isCategory = (value: string | null): value is BlogCategory =>
  blogCategories.includes(value as BlogCategory);

/**
 * Lista de artículos con filtro por categoría y paginación. El estado vive
 * en la URL (?categoria=…&pagina=…) para poder compartir o recargar la vista.
 */
export const BlogList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('categoria');
  const category = isCategory(categoryParam) ? categoryParam : ALL;

  const filtered =
    category === ALL
      ? recentPosts
      : recentPosts.filter((post) => post.category === category);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requestedPage = Number(searchParams.get('pagina')) || 1;
  const page = Math.min(Math.max(requestedPage, 1), totalPages);
  const visiblePosts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const sectionRef = useRevealOnScroll<HTMLElement>({
    dependencies: [category, page],
  });

  const updateQuery = (next: { categoria?: string; pagina?: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    const nextCategory = next.categoria ?? category;
    const nextPage = next.pagina ?? 1;

    if (nextCategory === ALL) params.delete('categoria');
    else params.set('categoria', nextCategory);

    if (nextPage <= 1) params.delete('pagina');
    else params.set('pagina', String(nextPage));

    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ''}#articulos`, {
      scroll: false,
    });
  };

  return (
    <section
      id="articulos"
      ref={sectionRef}
      className="w-full scroll-mt-24 bg-linear-to-br from-[#fffaf3] to-gold-50 px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-12">
        <div data-reveal>
          <SectionHeader
            title="Artículos Recientes"
            subtitle="Mantente al día con nuestras últimas reflexiones y enseñanzas"
          />
        </div>

        {/* Filtro de categorías */}
        <div
          role="group"
          aria-label="Filtrar por categoría"
          className="flex flex-wrap justify-center gap-3"
        >
          {[ALL, ...blogCategories].map((item) => {
            const isActive = item === category;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={isActive}
                onClick={() => updateQuery({ categoria: item })}
                className={`cursor-pointer rounded-full px-6 py-3 text-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-linear-to-r from-gold-400 to-bronze-500 text-white shadow-md'
                    : 'bg-white text-navy-700 shadow-sm hover:bg-gold-100'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-navy-600">
            Aún no hay artículos en esta categoría.
          </p>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <nav
            aria-label="Paginación del blog"
            className="flex items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={() => updateQuery({ pagina: page - 1 })}
              disabled={page === 1}
              aria-label="Página anterior"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl text-navy-700 shadow-sm transition hover:bg-gold-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IoChevronBack />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => updateQuery({ pagina: item })}
                  aria-current={item === page ? 'page' : undefined}
                  className={`h-12 min-w-12 cursor-pointer rounded-full px-4 text-xl font-semibold transition ${
                    item === page
                      ? 'bg-gold-500 text-white shadow-md'
                      : 'bg-white text-navy-700 shadow-sm hover:bg-gold-100'
                  }`}
                >
                  {item}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => updateQuery({ pagina: page + 1 })}
              disabled={page === totalPages}
              aria-label="Página siguiente"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl text-navy-700 shadow-sm transition hover:bg-gold-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IoChevronForward />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

/** Primera página sin filtro, para el HTML estático mientras carga la lista. */
export const BlogListFallback = () => (
  <section className="w-full bg-linear-to-br from-[#fffaf3] to-gold-50 px-5 py-20 sm:px-8 md:px-12 md:py-28">
    <div className="mx-auto flex w-full max-w-440 flex-col gap-12">
      <SectionHeader
        title="Artículos Recientes"
        subtitle="Mantente al día con nuestras últimas reflexiones y enseñanzas"
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recentPosts.slice(0, PAGE_SIZE).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  </section>
);

export default BlogList;
