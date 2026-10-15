import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { FeaturedPost } from './_components/FeaturedPost';
import { BlogList } from './_components/BlogList';

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
      <BlogList />
      <Footer />
    </main>
  );
}
