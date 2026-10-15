'use client';

import { IoHeartOutline, IoLocationOutline } from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { LuHandshake } from 'react-icons/lu';
import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { StatCard } from '@/app/components/shared/ui/StatCard';
import { impactStats, type ImpactStatIcon } from '@/app/data/evangelism';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

const icons: Record<ImpactStatIcon, React.ReactNode> = {
  people: <GoPeople />,
  heart: <IoHeartOutline />,
  map: <IoLocationOutline />,
  handshake: <LuHandshake />,
};

export const ImpactStats = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
        <div data-reveal>
          <SectionHeader
            title="Impacto en Números"
            subtitle="El fruto de nuestros esfuerzos evangelísticos este año"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} data-reveal>
              <StatCard
                icon={icons[stat.icon]}
                value={stat.value}
                label={stat.label}
                iconClassName={stat.iconClassName}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
