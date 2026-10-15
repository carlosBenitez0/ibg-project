import type { Metadata } from 'next';
import { PageHeader } from '../../components/shared/general/PageHeader';
import { Footer } from '../../components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { LocationInfo } from './_components/LocationInfo';

export const metadata: Metadata = {
  title: 'Ubicación | Iglesia Bautista Getsemaní',
  description: 'Encuentra nuestra iglesia y cómo llegar a nosotros.',
};

export default function AboutUsPage() {
  return (
    <main>
      <PageHeader
        title="Ubicación"
        subtitle="Te esperamos en Reubicación 1, Chalatenango. Encuentra toda la información para visitarnos."
        icon={pageHeaderIconsMap['Ubicación'] as React.ReactNode}
      />
      <LocationInfo />
      <Footer />
    </main>
  );
}
