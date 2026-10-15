import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { CtaSection } from '@/app/components/shared/ui/CtaSection';
import { Button } from '@/app/components/shared/ui/Button';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { contactLink } from '@/app/constants/navigation';
import { MinistriesGrid } from './_components/MinistriesGrid';
import { JoinSteps } from './_components/JoinSteps';

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
      <JoinSteps />
      <CtaSection
        title="¿Buscas servir?"
        description="Hay muchas oportunidades para usar tus dones y talentos en el servicio al Señor. ¡Únete a alguno de nuestros ministerios!"
      >
        <Button href="/iglesia/sobre-nosotros" size="lg">
          Conocer más
        </Button>
        <Button href={contactLink.href} variant="white" size="lg">
          Contáctanos
        </Button>
      </CtaSection>
      <Footer />
    </main>
  );
}
