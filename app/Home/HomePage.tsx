'use client';
import { InfoCard } from '../components/shared/InfoCard';
import {
  IoCalendarClearOutline,
  IoLocationOutline,
  IoCall,
  IoBookOutline,
} from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { useNextService } from '../hooks/home/useNextService';
import { DailyVerse } from '../components/home/DailyVerse';
import { ConnectWithUsSection } from '../components/home/ConnectWithUsSection';
import { FirstVisitSection } from '../components/home/FirstVisitSection';
import { Footer } from '../components/shared/general/Footer';

gsap.registerPlugin(ScrollTrigger);

export const HomePage = () => {
  const cardsContainer = useRef<HTMLDivElement>(null);
  const welcomeSection = useRef<HTMLDivElement>(null);
  const { nextService } = useNextService();

  const infoCards = [
    {
      icon: <IoCalendarClearOutline />,
      title: 'Próximo Servicio',
      subtitle: nextService?.subtitle || 'Cargando...',
      description: nextService?.description || 'Próximo servicio',
    },
    {
      icon: <IoLocationOutline />,
      title: 'Ubicación',
      subtitle: 'Reubicación 1',
      description: 'Chalatenango, El Salvador',
    },
    {
      icon: <GoPeople />,
      title: 'Comunidad',
      subtitle: '200+ Miembros',
      description: 'Una familia en Cristo',
    },
    {
      icon: <IoCall />,
      title: 'Conectar',
      subtitle: '+503 0000-0000',
      description: 'Estamos aquí para ti',
    },
  ];

  useGSAP(
    () => {
      if (!cardsContainer.current) return;

      const cardContainerCurrent = cardsContainer.current;
      const cards = cardContainerCurrent.querySelectorAll('.info-card-wrapper');

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          x: 50,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: cardContainerCurrent,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
          },
        }
      );
    },
    {
      scope: cardsContainer,
      // dependencies: [loading, error, verse, reference],
      revertOnUpdate: true,
    }
  );

  useGSAP(
    () => {
      if (!welcomeSection.current) return;

      const section = welcomeSection.current;
      const icon = section.querySelector('.welcome-icon');
      const title = section.querySelector('.welcome-title');
      const paragraph = section.querySelector('.welcome-paragraph');
      const quote = section.querySelector('.welcome-quote');

      // Entrada del icono con escala
      gsap.fromTo(
        icon,
        {
          opacity: 0,
          scale: 0.5,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'back.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Entrada del título
      gsap.fromTo(
        title,
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

      // Entrada del párrafo
      gsap.fromTo(
        paragraph,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.4,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Entrada de la cita con efecto de expansión suave
      gsap.fromTo(
        quote,
        {
          opacity: 0,
          scale: 0.9,
          y: 20,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'back.out(1.2)',
          delay: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        }
      );
    },
    {
      scope: welcomeSection,
      revertOnUpdate: true,
    }
  );

  return (
    <main>
      <DailyVerse />
      <section className="flex flex-col items-center justify-center py-10 md:py-20 px-4 sm:px-6 md:px-12 lg:px-6 w-full overflow-hidden">
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-stretch justify-center w-full gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-20 md:mt-0"
          ref={cardsContainer}
        >
          {infoCards.map((card, index) => (
            <div key={index} className="w-full h-full info-card-wrapper">
              <InfoCard
                icon={card.icon}
                title={card.title}
                subtitle={card.subtitle}
                message={card.description}
              />
            </div>
          ))}
        </div>
      </section>
      <section
        className="mt-20 w-full bg-[#1f3551] px-6 py-20 md:px-10 md:py-30 shadow-lg"
        ref={welcomeSection}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <IoBookOutline className="welcome-icon text-6xl text-[#d7a119]" />

          <h3 className="welcome-title mt-8 [font-family:var(--font-playfair-display)] text-4xl font-bold text-white md:text-6xl">
            Bienvenidos a Nuestra Familia
          </h3>

          <p className="welcome-paragraph mt-8 max-w-6xl text-xl leading-relaxed text-[#ffe066] md:text-2xl">
            En la Iglesia Bautista Getsemaní creemos que cada persona tiene un
            propósito especial en el plan de Dios. Te invitamos a descubrir ese
            propósito junto a nosotros mientras crecemos en la gracia y el
            conocimiento de nuestro Señor Jesucristo.
          </p>

          <div className="welcome-quote mt-12 w-full rounded-3xl bg-linear-to-r from-[#ede3bf] to-[#f1cf57] px-6 py-10 shadow-lg md:px-10 md:py-12">
            <p className="text-xl italic leading-relaxed text-[#20334d] md:text-3xl">
              &quot;Porque donde están dos o tres congregados en mi nombre, allí
              estoy yo en medio de ellos.&quot;
            </p>

            <p className="mt-6 text-lg font-semibold italic text-[#20334d] md:text-2xl">
              - Mateo 18:20
            </p>
          </div>
        </div>
      </section>

      <ConnectWithUsSection />
      <FirstVisitSection />
    </main>
  );
};
