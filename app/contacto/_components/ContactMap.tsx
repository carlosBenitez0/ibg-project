'use client';

import { LuNavigation } from 'react-icons/lu';
import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { Button } from '@/app/components/shared/ui/Button';
import { MapEmbed } from '@/app/components/shared/ui/MapEmbed';
import { churchInfo } from '@/app/constants/church';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

export const ContactMap = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-12">
        <div data-reveal>
          <SectionHeader
            title="Cómo Llegar"
            subtitle="Encuentra fácilmente nuestra ubicación en Reubicación 1, Chalatenango"
          />
        </div>
        <div data-reveal>
          <MapEmbed heightClassName="h-[36rem] md:h-[48rem]" />
        </div>
        <div
          data-reveal
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button
            href={churchInfo.map.directionsUrl}
            external
            size="lg"
            icon={<LuNavigation />}
          >
            Abrir en Google Maps
          </Button>
          <Button href="/iglesia/ubicacion" variant="navy" size="lg">
            Más detalles para llegar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
