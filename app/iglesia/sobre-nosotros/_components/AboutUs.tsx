'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../../../components/shared/SectionHeader';
import ValueCard from './ValueCard';
import { AiOutlinePlus, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';

export const AboutUs = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const visionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // Valores section refs
  const valuesSectionRef = useRef<HTMLElement | null>(null);
  const valuesHeaderRef = useRef<HTMLDivElement | null>(null);
  const cardsRefs = useRef<Array<HTMLDivElement | null>>([]);

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

      // Valores header animation
      gsap.set(valuesHeaderRef.current, { opacity: 0, y: 18 });
      gsap.to(valuesHeaderRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: valuesHeaderRef.current,
          start: 'top 90%',
          once: true,
        },
      });

      // Valores cards animation (stagger)
      if (cardsRefs.current.length) {
        gsap.set(cardsRefs.current, { opacity: 0, y: 30, filter: 'blur(6px)' });
        gsap.to(cardsRefs.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: valuesSectionRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, idx: number) => {
    cardsRefs.current[idx] = el;
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full bg-white px-4 py-16 text-slate-800 sm:px-6 sm:py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto flex w-full max-w-480 flex-col-reverse items-start gap-12 lg:max-w-480 lg:flex-row lg:items-start lg:gap-16">
          <div className="w-full lg:flex-1">
            <div className="flex flex-col gap-10 md:gap-18 justify-start items-start">
              <article ref={missionRef} className="opacity-0">
                <h2 className="mb-6 md:mb-14 [font-family:var(--font-playfair-display)] text-5xl font-semibold text-[#1f3551] sm:text-5xl md:text-7xl">
                  Nuestra Misión
                </h2>
                <p className="flex-1 text-xl md:text-2xl leading-9 text-[#274b78] sm:text-lg">
                  Somos una iglesia comprometida con la evangelización, el
                  discipulado y el servicio a nuestra comunidad en Chalatenango.
                  Buscamos ser instrumentos de Dios para transformar vidas a
                  través del amor de Cristo.
                </p>
              </article>

              <article ref={visionRef} className="opacity-0">
                <h2 className="mb-6 md:mb-14 [font-family:var(--font-playfair-display)] text-5xl font-semibold text-[#1f3551] sm:text-5xl md:text-7xl">
                  Nuestra Visión
                </h2>
                <p className="flex-1 text-xl md:text-2xl leading-9 text-[#274b78] sm:text-lg">
                  Ser una iglesia que impacte positivamente a El Salvador,
                  formando discípulos maduros que reflejen el carácter de Cristo
                  en cada área de sus vidas y contribuyan al reino de Dios.
                </p>
              </article>
            </div>
          </div>
          <div
            className="w-full lg:flex-1 lg:sticky lg:top-28 lg:max-w-none p-4 shadow-[50px_50px_70px_rgba(15,23,42,0.5)]
                      before:content-[''] black before:absolute before:inset-0 before:bg-linear-to-br before:from-transparent before:to-[#1f3557]"
          >
            <div
              ref={imageRef}
              className="relative aspect-4/3 w-full overflow-hidden opacity-0 border border-white/30"
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

      {/* Valores section */}
      <section
        ref={valuesSectionRef}
        className="w-full bg-white px-4 py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-8">
          <div ref={valuesHeaderRef} className="mb-10">
            <SectionHeader
              title="Nuestros Valores"
              subtitle="Los principios fundamentales que guían nuestra iglesia y ministerio"
            />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <ValueCard
              innerRef={(el) => setCardRef(el, 0)}
              icon={
                <AiOutlinePlus className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              }
              title="Fe"
              description="Creemos en Jesucristo como nuestro único Señor y Salvador"
            />

            <ValueCard
              innerRef={(el) => setCardRef(el, 1)}
              icon={
                <AiOutlineHeart className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              }
              title="Amor"
              description="El amor de Dios es el fundamento de todo lo que hacemos"
            />

            <ValueCard
              innerRef={(el) => setCardRef(el, 2)}
              icon={
                <FaUsers className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              }
              title="Comunidad"
              description="Formamos una familia unida en Cristo y su propósito"
            />

            <ValueCard
              innerRef={(el) => setCardRef(el, 3)}
              icon={
                <AiOutlineStar className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              }
              title="Excelencia"
              description="Buscamos la excelencia en todo servicio para la gloria de Dios"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
