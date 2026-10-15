'use client';

import { IoLogoWhatsapp } from 'react-icons/io5';
import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { Button } from '@/app/components/shared/ui/Button';
import { whatsappHref } from '@/app/constants/church';
import { joinSteps } from '@/app/data/ministries';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

export const JoinSteps = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col items-center gap-14">
        <div data-reveal className="w-full">
          <SectionHeader
            title="¿Cómo Unirte a un Ministerio?"
            subtitle="Tres pasos sencillos para empezar a servir"
          />
        </div>

        <ol className="grid w-full grid-cols-1 gap-10 md:grid-cols-3">
          {joinSteps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              className="flex flex-col items-center text-center"
            >
              <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r from-gold-400 to-bronze-500 font-playfair text-4xl font-bold text-white shadow-lg">
                {index + 1}
              </span>
              <h3 className="mb-3 font-playfair text-3xl font-bold text-navy-900">
                {step.title}
              </h3>
              <p className="max-w-md text-2xl leading-relaxed text-navy-700">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div data-reveal>
          <Button
            href={whatsappHref(
              'Hola, quiero información para servir en un ministerio.'
            )}
            external
            variant="navy"
            size="lg"
            icon={<IoLogoWhatsapp />}
          >
            Contactar Liderazgo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JoinSteps;
