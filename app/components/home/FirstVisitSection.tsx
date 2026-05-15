'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FirstVisitSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      timeline
        .fromTo(
          '.first-visit-title',
          { opacity: 0, y: 24, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            ease: 'power2.out',
          }
        )
        .fromTo(
          '.first-visit-text',
          { opacity: 0, y: 18, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            ease: 'power2.out',
          },
          '-=0.35'
        )
        .fromTo(
          '.first-visit-button',
          { opacity: 0, y: 16, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.12,
            ease: 'back.out(1.2)',
          },
          '-=0.2'
        );
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const btn = sectionRef.current.querySelector<HTMLElement>(
      '.first-visit-button'
    );
    if (!btn) return;

    const onEnter = () => {
      // ensure any previous tweens are removed to avoid jump/delay
      gsap.killTweensOf(btn);
      gsap.to(btn, {
        y: -6,
        scale: 1.03,
        boxShadow: '0 18px 40px rgba(2,6,23,0.35)',
        backgroundColor: '#0f2944',
        duration: 0.18,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const onLeave = () => {
      gsap.killTweensOf(btn);
      gsap.to(btn, {
        y: 0,
        scale: 1,
        boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
        backgroundColor: '#123152',
        duration: 0.18,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    btn.addEventListener('touchstart', onEnter, { passive: true });
    btn.addEventListener('touchend', onLeave);

    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
      btn.removeEventListener('touchstart', onEnter);
      btn.removeEventListener('touchend', onLeave);
      gsap.killTweensOf(btn);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-linear-to-r from-[#e9c400] to-[#cf8433] px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <h2 className="first-visit-title [font-family:var(--font-playfair-display)] text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          ¿Primera Vez Visitándonos?
        </h2>

        <p className="first-visit-text mt-6 max-w-3xl text-md leading-relaxed text-white/95 sm:text-xl md:text-3xl">
          Te damos la más cordial bienvenida. Queremos que te sientas como en
          casa desde el primer momento que nos visites.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:mt-12 sm:w-auto sm:flex-row sm:gap-5">
          {/* <Link
            href="/page-under-construction"
            className="first-visit-button inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-6 text-xl font-semibold text-[#cf8e2d] shadow-md transition-transform duration-300 hover:-translate-y-1 sm:w-auto sm:min-w-88"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#cf8e2d] to-[#d7a119]">
              Planifica tu Visita
            </span>
          </Link> */}

          <Link
            href="/page-under-construction"
            className="first-visit-button inline-flex w-full items-center justify-center rounded-full bg-[#123152] px-8 py-6 text-xl font-semibold text-white shadow-md transition-none sm:w-auto sm:min-w-88"
          >
            <span className="text-white">Contáctanos</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
