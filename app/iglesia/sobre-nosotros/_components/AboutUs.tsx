'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const AboutUs = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const visionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // set initial hidden states to avoid flash
      gsap.set([missionRef.current, visionRef.current], { opacity: 0, y: 30 });
      gsap.set(imageRef.current, { opacity: 0, y: 40 });

      gsap.to(missionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      gsap.to(visionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: visionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      gsap.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-4 py-16 text-slate-800 sm:px-6 sm:py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-480 flex-col-reverse items-start gap-12 lg:max-w-480 lg:flex-row lg:items-start lg:gap-16">
        <div className="w-full lg:flex-1">
          <div className="flex flex-col gap-10 md:gap-18 justify-start items-start">
            <article ref={missionRef} className="opacity-0">
              <h2 className="mb-6 md:mb-14 [font-family:var(--font-playfair-display)] text-4xl font-semibold text-[#1f3551] sm:text-4xl md:text-6xl">
                Nuestra Misión
              </h2>
              <p className="flex-1 text-xl leading-8 text-[#274b78] sm:text-lg md:text-[16px]">
                Somos una iglesia comprometida con la evangelización, el
                discipulado y el servicio a nuestra comunidad en Chalatenango.
                Buscamos ser instrumentos de Dios para transformar vidas a
                través del amor de Cristo.
              </p>
            </article>

            <article ref={visionRef} className="opacity-0">
              <h2 className="mb-6 md:mb-14 [font-family:var(--font-playfair-display)] text-4xl font-semibold text-[#1f3551] sm:text-4xl md:text-6xl">
                Nuestra Visión
              </h2>
              <p className="flex-1 text-xl leading-8 text-[#274b78] sm:text-lg md:text-[16px]">
                Ser una iglesia que impacte positivamente a El Salvador,
                formando discípulos maduros que reflejen el carácter de Cristo
                en cada área de sus vidas y contribuyan al reino de Dios.
              </p>
            </article>
          </div>
        </div>
        <div className="w-full lg:flex-1 lg:sticky lg:top-28 lg:max-w-none">
          <div
            ref={imageRef}
            className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70 opacity-0"
          >
            <Image
              src="/images/ibg_images/ibg-jovenes.png"
              alt="Imagen de jóvenes en la Iglesia Bautista Getsemaní"
              fill
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
