import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { FeaturedPost } from './_components/FeaturedPost';
import { BlogList, BlogListFallback } from './_components/BlogList';

export const metadata: Metadata = {
  title: 'Blog | Iglesia Bautista Getsemaní',
  description:
    'Reflexiones, estudios bíblicos y enseñanzas de la Iglesia Bautista Getsemaní.',
};

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        title="Blog"
        subtitle="Reflexiones, estudios bíblicos y enseñanzas para tu crecimiento espiritual."
        icon={pageHeaderIconsMap['Blog']}
      />
      <FeaturedPost />
      {/* useSearchParams requiere Suspense; el fallback deja la 1.ª página en el HTML */}
      <Suspense fallback={<BlogListFallback />}>
        <BlogList />
      </Suspense>
      <Footer />
    </main>
  );
}
