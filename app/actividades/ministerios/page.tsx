import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { MinistriesGrid } from './_components/MinistriesGrid';

export const metadata: Metadata = {
  title: 'Ministerios | Iglesia Bautista Getsemaní',
  description:
    'Conoce los ministerios de la Iglesia Bautista Getsemaní y descubre dónde puedes servir.',
};

export default function MinistriesPage() {
  return (
    <main>
      <PageHeader
        title="Ministerios"
        subtitle="Cada miembro tiene dones para servir. Descubre el ministerio donde Dios quiere usarte."
        icon={pageHeaderIconsMap['Ministerios']}
      />
      <MinistriesGrid />
      <Footer />
    </main>
  );
}
