'use client';

import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { landmarks, nearbyPlaces } from '@/app/data/location';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

const referenceGroups = [
  { title: 'Lugares Cercanos', items: nearbyPlaces },
  { title: 'Señas Particulares', items: landmarks },
];

export const NearbyReferences = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#fffaf3] px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
        <div data-reveal>
          <SectionHeader
            title="Referencias Cercanas"
            subtitle="Puntos de referencia para encontrarnos más fácilmente"
          />
        </div>

        <div
          data-reveal
          className="grid grid-cols-1 gap-12 rounded-3xl bg-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.10)] md:grid-cols-2 md:p-12"
        >
          {referenceGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-6 font-playfair text-3xl font-bold text-navy-900">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 text-2xl text-navy-700"
                  >
                    <span className="h-3 w-3 shrink-0 rounded-full bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyReferences;
