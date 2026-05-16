import type { Metadata } from 'next';
import { PageHeader } from '../../components/shared/general/PageHeader';
import { Footer } from '../../components/shared/general/Footer';
import { AboutUs } from './_components/AboutUs';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Iglesia Bautista Getsemaní',
  description:
    'Conoce la historia, misión y visión de la Iglesia Bautista Getsemaní.',
};

export default function AboutUsPage() {
  return (
    <main>
      <PageHeader
        title="Sobre Nosotros"
        subtitle="Conoce la historia, misión y visión de la Iglesia Bautista Getsemaní."
        icon={pageHeaderIconsMap['Sobre nosotros']}
      />
      <AboutUs />
      <Footer />
    </main>
  );
}
