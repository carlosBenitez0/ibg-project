import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { EventsSections } from './_components/EventsSections';

export const metadata: Metadata = {
  title: 'Eventos | Iglesia Bautista Getsemaní',
  description:
    'Cultos semanales y eventos especiales de la Iglesia Bautista Getsemaní en Chalatenango.',
};

export default function EventsPage() {
  return (
    <main>
      <PageHeader
        title="Eventos y Actividades"
        subtitle="Únete a nosotros en nuestros servicios regulares y eventos especiales. Todos son bienvenidos en la familia de Getsemaní."
        icon={pageHeaderIconsMap['Eventos']}
      />
      <EventsSections />
      <Footer />
    </main>
  );
}
