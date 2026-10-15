'use client';

import { LuHandshake } from 'react-icons/lu';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

export const MissionStatement = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-5 py-20 sm:px-8 md:px-12 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <div data-reveal className="mb-6 flex items-center gap-4">
          <LuHandshake className="text-5xl text-gold-600" />
          <h2 className="font-playfair text-4xl font-bold text-navy-900 md:text-5xl">
            Nuestra Misión Evangelística
          </h2>
        </div>
        <blockquote
          data-reveal
          className="mb-4 font-playfair text-3xl italic leading-relaxed text-navy-700 md:text-4xl"
        >
          &quot;Por tanto, id, y haced discípulos a todas las naciones,
          bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu
          Santo&quot;
        </blockquote>
        <cite data-reveal className="text-2xl font-semibold text-bronze-700">
          Mateo 28:19
        </cite>
      </div>
    </section>
  );
};

export default MissionStatement;
