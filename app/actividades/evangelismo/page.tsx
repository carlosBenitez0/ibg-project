import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { MissionStatement } from './_components/MissionStatement';
import { CampaignsGallery } from './_components/CampaignsGallery';
import { ImpactStats } from './_components/ImpactStats';
import { JoinEvangelism } from './_components/JoinEvangelism';

export const metadata: Metadata = {
  title: 'Evangelismo | Iglesia Bautista Getsemaní',
  description:
    'Campañas evangelísticas de la Iglesia Bautista Getsemaní en Chalatenango.',
};

export default function EvangelismPage() {
  return (
    <main>
      <PageHeader
        title="Evangelismo"
        subtitle="Compartiendo el amor de Cristo en nuestra comunidad. Mira cómo Dios está obrando a través de nuestros esfuerzos evangelísticos."
        icon={pageHeaderIconsMap['Evangelismo']}
      />
      <MissionStatement />
      <CampaignsGallery />
      <ImpactStats />
      <JoinEvangelism />
      <Footer />
    </main>
  );
}
