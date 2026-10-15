import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { CtaSection } from '@/app/components/shared/ui/CtaSection';
import { Button } from '@/app/components/shared/ui/Button';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { contactLink } from '@/app/constants/navigation';
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
      <CtaSection
        title="¿Primera vez visitándonos?"
        description="Te damos la más cordial bienvenida. Nuestros hermanos estarán esperándote para acompañarte en tu primera visita."
      >
        <Button href="/iglesia/ubicacion" size="lg">
          Planifica tu Visita
        </Button>
        <Button href={contactLink.href} variant="white" size="lg">
          Contáctanos
        </Button>
      </CtaSection>
      <Footer />
    </main>
  );
}
