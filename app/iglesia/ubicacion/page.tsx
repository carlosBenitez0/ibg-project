import type { Metadata } from 'next';
import { PageHeader } from '../../components/shared/general/PageHeader';
import { Footer } from '../../components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';

export const metadata: Metadata = {
  title: 'Ubicación | Iglesia Bautista Getsemaní',
  description: 'Encuentra nuestra iglesia y cómo llegar a nosotros.',
};

export default function AboutUsPage() {
  return (
    <main>
      <PageHeader
        title="Ubicación"
        subtitle="Encuentra nuestra iglesia y cómo llegar a nosotros."
        icon={pageHeaderIconsMap['Ubicación'] as React.ReactNode}
      />
      <Footer />
    </main>
  );
}
