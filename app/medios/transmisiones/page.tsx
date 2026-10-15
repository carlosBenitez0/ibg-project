import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa';
import { CtaSection } from '@/app/components/shared/ui/CtaSection';
import { Button } from '@/app/components/shared/ui/Button';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { churchInfo } from '@/app/constants/church';
import { UpcomingStreams } from './_components/UpcomingStreams';
import { PastStreams } from './_components/PastStreams';
import { PlatformsInfo } from './_components/PlatformsInfo';

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
      <PastStreams />
      <PlatformsInfo />
      <CtaSection
        title="Mantente Conectado"
        description="Suscríbete a nuestros canales y activa las notificaciones para no perderte ninguno de nuestros servicios en vivo."
      >
        <Button
          href={churchInfo.social.youtube}
          external
          size="lg"
          icon={<FaYoutube />}
        >
          YouTube
        </Button>
        <Button
          href={churchInfo.social.facebook}
          external
          variant="white"
          size="lg"
          icon={<FaFacebookF />}
        >
          Facebook
        </Button>
        <Button
          href={churchInfo.social.tiktok}
          external
          variant="white"
          size="lg"
          icon={<FaTiktok />}
        >
          TikTok
        </Button>
      </CtaSection>
      <Footer />
    </main>
  );
}
