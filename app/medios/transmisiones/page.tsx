import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { UpcomingStreams } from './_components/UpcomingStreams';

export const metadata: Metadata = {
  title: 'Transmisiones | Iglesia Bautista Getsemaní',
  description:
    'Sigue en vivo los cultos de la Iglesia Bautista Getsemaní y revive los mensajes anteriores.',
};

export default function LiveStreamsPage() {
  return (
    <main>
      <PageHeader
        title="Transmisiones en Vivo"
        subtitle="Conéctate con nuestros servicios desde cualquier lugar. Adoración, enseñanza y comunión en línea."
        icon={pageHeaderIconsMap['Transmisiones']}
      />
      <UpcomingStreams />
      <Footer />
    </main>
  );
}
