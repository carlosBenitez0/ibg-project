'use client';
import { ImQuotesRight } from 'react-icons/im';
import { useDailyVerse } from '../../hooks/home/useDailyVerse';
import { DotLoader } from 'react-spinners';
import { ErrorMessage1 } from '../shared/ErrorMessage1';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const DailyVerse = () => {
  const { verse, reference, loading, error } = useDailyVerse();
  const dailyVerseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = dailyVerseRef.current;

      if (!section) return;

      const content = section.querySelectorAll('[data-dailyverse-item]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      tl.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      ).fromTo(
        content,
        {
          opacity: 0,
          filter: 'blur(10px)',
          y: 20,
          x: 20,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          x: 0,
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.2,
        },
        '<'
      );
    },
    {
      scope: dailyVerseRef,
      // dependencies: [loading, error, verse, reference],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={dailyVerseRef}
      className="opacity-0 flex dailyverse w-full flex-col items-center justify-center bg-[#fffaf3] py-20 px-6 md:p-20 text-center "
    >
      {/* gsap animations pending */}
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-6 rounded-3xl border-2 border-amber-100/70 bg-white px-6 py-10 shadow-xl md:flex-row md:px-10 md:py-12 text-lg md:text-[14px] lg:text-[16px]">
        <ImQuotesRight
          data-dailyverse-item
          className="self-start min-h-7 min-w-7 md:min-h-10 md:min-w-10 text-[#d69e2e]"
        />
        <div className="flex w-full min-w-0 flex-col items-center justify-center gap-8 md:items-start">
          <h3
            data-dailyverse-item
            className="text-4xl [font-family:var(--font-playfair-display)] font-semibold"
          >
            Versículo del Día
          </h3>
          {loading ? (
            <div
              data-dailyverse-item
              className="w-full flex items-center justify-center"
            >
              <DotLoader />
            </div>
          ) : error ? (
            <ErrorMessage1 message={error} />
          ) : (
            <>
              {verse.startsWith('MYMEMORY WARNING') ? (
                <div data-dailyverse-item>
                  <ErrorMessage1 message="Error al obtener el versículo del día. Por favor, inténtalo de nuevo más tarde." />
                </div>
              ) : (
                <p
                  data-dailyverse-item
                  className="w-full max-w-full whitespace-normal wrap-break-word text-left"
                >
                  &quot;{verse}&quot;
                </p>
              )}
              <span data-dailyverse-item>
                {verse.startsWith('MYMEMORY WARNING') ? null : (
                  <i className="text-[#a36426] font-semibold text-xl">
                    - {reference}
                  </i>
                )}
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
