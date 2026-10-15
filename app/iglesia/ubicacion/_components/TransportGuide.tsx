'use client';

import { IoBusOutline, IoCarOutline } from 'react-icons/io5';
import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { transportOptions } from '@/app/data/location';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

const transportIcons = {
  car: {
    icon: <IoCarOutline />,
    className: 'from-gold-400 to-bronze-500',
  },
  bus: {
    icon: <IoBusOutline />,
    className: 'from-bronze-500 to-gold-400',
  },
};

export const TransportGuide = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
        <div data-reveal>
          <SectionHeader
            title="Cómo Llegar"
            subtitle="Diferentes opciones de transporte para llegar a nuestra iglesia"
          />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {transportOptions.map((option) => (
            <article
              key={option.id}
              data-reveal
              className="rounded-3xl border border-gold-100 bg-linear-to-br from-white to-gold-50 p-8 shadow-[0_12px_32px_rgba(15,23,42,0.08)] md:p-12"
            >
              <div className="mb-8 flex items-center gap-5">
                <div
                  className={`flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r text-4xl text-white ${transportIcons[option.id].className}`}
                >
                  {transportIcons[option.id].icon}
                </div>
                <h3 className="font-playfair text-3xl font-bold text-navy-900 md:text-4xl">
                  {option.title}
                </h3>
              </div>

              <dl className="flex flex-col gap-6">
                {option.steps.map((step) => (
                  <div key={step.title}>
                    <dt className="mb-1 text-2xl font-semibold text-navy-900">
                      {step.title}
                    </dt>
                    <dd className="text-2xl leading-relaxed text-navy-700">
                      {step.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransportGuide;
