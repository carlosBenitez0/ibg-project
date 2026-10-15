'use client';

import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { ministries } from '@/app/data/ministries';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';
import { MinistryCard } from './MinistryCard';

export const MinistriesGrid = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#fffaf3] px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
        <div data-reveal>
          <SectionHeader
            title="Nuestros Ministerios"
            subtitle="Encuentra tu lugar para servir y crecer junto a la familia de Getsemaní"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => (
            <MinistryCard key={ministry.id} ministry={ministry} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinistriesGrid;
