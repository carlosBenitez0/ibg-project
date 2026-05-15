'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { IoHeartOutline, IoPlayOutline } from 'react-icons/io5';
import { LiaCrossSolid } from 'react-icons/lia';
import { ConnectCard } from './ConnectCard';

gsap.registerPlugin(ScrollTrigger);

const connectCards = [
  {
    icon: <IoHeartOutline />,
    title: 'Únete a Nuestros Servicios',
    description: 'Te invitamos a ser parte de nuestra familia de fe',
    buttonLabel: 'Ver Eventos',
    buttonHref: '/page-under-construction',
    iconBackgroundClassName: 'bg-linear-to-r from-[#e9bd00] to-[#d88a2d]',
    buttonClassName: 'bg-linear-to-r from-[#e9bd00] to-[#d88a2d]',
  },
  {
    icon: <LiaCrossSolid />,
    title: 'Conoce Nuestros Ministerios',
    description: 'Encuentra tu lugar para servir en el Reino de Dios',
    buttonLabel: 'Explorar Ministerios',
    buttonHref: '/page-under-construction',
    iconBackgroundClassName: 'bg-linear-to-r from-[#d88a2d] to-[#e9bd00]',
    buttonClassName: 'bg-linear-to-r from-[#d88a2d] to-[#e9bd00]',
  },
  {
    icon: <IoPlayOutline />,
    title: 'Transmisiones en Vivo',
    description:
      'No te pierdas nuestros servicios desde casa, en vivo cada semana',
    buttonLabel: 'Ver Transmisiones',
    buttonHref: '/page-under-construction',
    iconBackgroundClassName: 'bg-slate-500',
    buttonClassName: 'bg-slate-500',
  },
];

export const ConnectWithUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const title = section.querySelector('.connect-title');
    const paragraph = section.querySelector('.connect-paragraph');
    const cards = section.querySelectorAll('.connect-card');

    // Animación del título
    gsap.fromTo(
      title,
      {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      }
    );

    // Animación del párrafo
    gsap.fromTo(
      paragraph,
      {
        opacity: 0,
        y: 30,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      }
    );

    // Animación de las tarjetas con stagger
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'back.out(1.1)',
        stagger: 0.15,
        delay: 0.4,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#fbf8f0] px-6 py-20 md:px-10 md:py-24 lg:px-12"
    >
      <div className="mx-auto flex w-full max-w-480 flex-col items-center text-center">
        <h2 className="connect-title [font-family:var(--font-playfair-display)] text-4xl font-bold text-slate-900 md:text-6xl">
          Conecta con Nosotros
        </h2>

        <p className="connect-paragraph mt-6 max-w-3xl text-lg text-slate-700 md:text-[2rem]">
          Descubre las diferentes formas de ser parte de nuestra comunidad de fe
        </p>

        <div className="mt-16 grid w-full gap-8 md:grid-cols-3">
          {connectCards.map((card) => (
            <div key={card.title} className="connect-card">
              <ConnectCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
