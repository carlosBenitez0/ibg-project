'use client';

import { IoHeartOutline } from 'react-icons/io5';
import { LuBuilding2, LuHandshake } from 'react-icons/lu';
import { donationImpact } from '@/app/data/donations';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

const icons: Record<(typeof donationImpact)[number]['id'], React.ReactNode> = {
  ministries: <IoHeartOutline />,
  evangelism: <LuHandshake />,
  infrastructure: <LuBuilding2 />,
};

export const DonationImpact = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-navy-900 px-5 py-20 text-white sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col items-center gap-14 text-center">
        <div data-reveal>
          <h2 className="font-playfair text-4xl font-bold sm:text-5xl md:text-6xl">
            El Impacto de tu Generosidad
          </h2>
          <p className="mt-6 text-2xl text-gold-300 md:text-3xl">
            Cada donación hace una diferencia real en nuestra comunidad
          </p>
        </div>

        <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {donationImpact.map((item) => (
            <li
              key={item.id}
              data-reveal
              className="flex flex-col items-center rounded-3xl bg-white/10 p-10 backdrop-blur-sm"
            >
              <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r from-gold-400 to-bronze-500 text-4xl text-white">
                {icons[item.id]}
              </span>
              <h3 className="mb-3 font-playfair text-3xl font-bold">
                {item.title}
              </h3>
              <p className="text-2xl leading-relaxed text-white/85">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DonationImpact;
