'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaLaptopCode, FaHammer, FaGear, FaEnvelope } from 'react-icons/fa6';
import Link from 'next/link';

const PageUnderConstruction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const gearRef1 = useRef<HTMLDivElement>(null);
  const gearRef2 = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      })
        .from(
          iconRef.current,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=1'
        )
        .from(
          [titleRef.current, textRef.current],
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          contactRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          '-=0.2'
        );

      gsap.to(gearRef1.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(gearRef2.current, {
        rotation: -360,
        duration: 6,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(iconRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden bg-[#050505]"
    >
      {/* Luces de fondo ambientales */}
      <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-yellow-500 rounded-full blur-[80px] md:blur-[150px] opacity-10" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-white rounded-full blur-[80px] md:blur-[120px] opacity-5" />

      {/* Icono Central */}
      <div
        className="relative mb-10 md:mb-16 scale-100 md:scale-110"
        ref={iconRef}
      >
        <div className="relative z-10 bg-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center">
          <FaLaptopCode className="text-8xl md:text-9xl text-yellow-500" />
        </div>

        <div
          ref={gearRef1}
          className="absolute -top-6 -right-6 md:-top-9 md:-right-9 text-4xl md:text-6xl text-gray-500 opacity-60"
        >
          <FaGear />
        </div>
        <div
          ref={gearRef2}
          className="absolute -bottom-4 -left-4 md:-bottom-7 md:-left-7 text-5xl md:text-7xl text-gray-600 opacity-40"
        >
          <FaGear />
        </div>
      </div>

      {/* Textos Principales */}
      <div className="text-center z-10 max-w-[95%] md:max-w-4xl">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-9xl font-black text-white mb-6 md:mb-10 tracking-tight leading-[1]"
        >
          Página en <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-500 to-yellow-600">
            Desarrollo
          </span>
        </h1>

        <div
          ref={textRef}
          className="bg-white/10 backdrop-blur-md px-8 py-5 rounded-3xl border border-white/10 inline-flex items-center justify-center gap-4 shadow-2xl mb-16"
        >
          <FaHammer className="text-yellow-500 text-2xl animate-bounce" />
          <p className="text-base md:text-2xl text-white font-semibold tracking-wide uppercase">
            Estamos construyendo algo especial para ti.
          </p>
        </div>

        {/* Contacto con el desarrollador */}
        <div ref={contactRef} className="flex flex-col items-center gap-6">
          <p className="text-gray-400 text-lg md:text-xl italic font-light">
            ¿Tienes alguna pregunta?
          </p>
          <Link
            href="mailto:carlosbenitez.quintanilla@gmail.com"
            className="flex items-center gap-4 bg-white/10 hover:bg-white/20 px-10 py-4 rounded-full border border-white/20 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl group"
          >
            <FaEnvelope className="text-yellow-500 text-2xl group-hover:animate-pulse" />
            <span className="text-white text-lg md:text-xl font-bold tracking-tight">
              Contacta con el desarrollador
            </span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 left-0 w-full text-center">
        <div className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.5em] font-black">
          Iglesia Bautista Getsemaní | 2026
        </div>
      </div>
    </div>
  );
};

export default PageUnderConstruction;
