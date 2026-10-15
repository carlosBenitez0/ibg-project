'use client';

import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { regularEvents, specialEvents } from '@/app/data/events';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';
import { EventCard } from './EventCard';
import { SpecialEventCard } from './SpecialEventCard';

export const EventsSections = () => {
  const regularRef = useRevealOnScroll<HTMLElement>();
  const specialRef = useRevealOnScroll<HTMLElement>();

  return (
    <>
      <section
        ref={regularRef}
        className="w-full bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28"
      >
        <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
          <div data-reveal>
            <SectionHeader
              title="Servicios Regulares"
              subtitle="Nuestros cultos semanales, donde nos congregamos para adorar y crecer juntos"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={specialRef}
        className="w-full bg-linear-to-br from-[#fffaf3] to-gold-50 px-5 py-20 sm:px-8 md:px-12 md:py-28"
      >
        <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
          <div data-reveal>
            <SectionHeader
              title="Eventos Especiales"
              subtitle="Actividades y conferencias que enriquecen nuestra vida espiritual"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
            {specialEvents.map((event) => (
              <SpecialEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsSections;
