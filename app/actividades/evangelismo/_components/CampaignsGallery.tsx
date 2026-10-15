'use client';

import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { campaigns } from '@/app/data/evangelism';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';
import { CampaignCard } from './CampaignCard';

export const CampaignsGallery = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-linear-to-br from-[#fffaf3] to-gold-50 px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
        <div data-reveal>
          <SectionHeader
            title="Galería de Evangelismos"
            subtitle="Testimonios visuales de cómo Dios está usando a nuestra iglesia para alcanzar vidas"
          />
        </div>

        <div className="flex flex-col gap-12">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignsGallery;
