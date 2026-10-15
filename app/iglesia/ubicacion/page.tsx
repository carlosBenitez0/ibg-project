import type { Metadata } from 'next';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { PageHeader } from '../../components/shared/general/PageHeader';
import { Footer } from '../../components/shared/general/Footer';
import { CtaSection } from '@/app/components/shared/ui/CtaSection';
import { Button } from '@/app/components/shared/ui/Button';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { churchInfo, telHref, whatsappHref } from '@/app/constants/church';
import { LocationInfo } from './_components/LocationInfo';
import { TransportGuide } from './_components/TransportGuide';
import { NearbyReferences } from './_components/NearbyReferences';

export const metadata: Metadata = {
  title: 'Ubicación | Iglesia Bautista Getsemaní',
  description: 'Encuentra nuestra iglesia y cómo llegar a nosotros.',
};

export default function LocationPage() {
  return (
    <main>
      <PageHeader
        title="Ubicación"
        subtitle="Te esperamos en Reubicación 1, Chalatenango. Encuentra toda la información para visitarnos."
        icon={pageHeaderIconsMap['Ubicación'] as React.ReactNode}
      />
      <LocationInfo />
      <TransportGuide />
      <NearbyReferences />
      <CtaSection
        title="¿Necesitas Ayuda para Llegar?"
        description="Si tienes dificultades para encontrarnos, no dudes en contactarnos. Estaremos felices de ayudarte con las direcciones."
      >
        <Button
          href={telHref(churchInfo.phones.office)}
          size="lg"
          icon={<FiPhone />}
        >
          Llamar para Direcciones
        </Button>
        <Button
          href={whatsappHref(
            'Hola, necesito ayuda para llegar a la Iglesia Bautista Getsemaní.'
          )}
          external
          variant="white"
          size="lg"
          icon={<IoLogoWhatsapp className="text-[#25d366]" />}
        >
          WhatsApp
        </Button>
      </CtaSection>
      <Footer />
    </main>
  );
}
