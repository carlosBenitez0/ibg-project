'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Navbar from './Navbar';
import { FaHeart } from 'react-icons/fa';
import { MdAutoAwesome } from 'react-icons/md';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  icon,
}: PageHeaderProps) => {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const timeline = gsap.timeline();

    // Animar elementos decorativos
    const decorativeElements = decorativeRef.current?.querySelectorAll('div');
    if (decorativeElements) {
      timeline.fromTo(
        decorativeElements,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        0
      );
    }

    // Animar líneas decorativas
    if (lineTopRef.current) {
      timeline.fromTo(
        lineTopRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.15
      );
    }

    // Animar eyebrow
    if (eyebrowRef.current) {
      timeline.fromTo(
        eyebrowRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.5)',
        },
        0.2
      );
    }

    // Animar icono
    if (iconRef.current) {
      timeline.fromTo(
        iconRef.current,
        {
          opacity: 0,
          scale: 0.3,
          y: -20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'back.out(1.3)',
        },
        0.25
      );

      // Animación de flotación continua
      gsap.to(iconRef.current, {
        y: -8,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }

    // Animar título
    if (titleRef.current) {
      timeline.fromTo(
        titleRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'back.out(1.2)',
        },
        0.35
      );
    }

    // Animar subtitle
    if (subtitleRef.current) {
      timeline.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 15,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'back.out(1.2)',
        },
        0.5
      );
    }

    // Animar línea inferior
    if (lineBottomRef.current) {
      timeline.fromTo(
        lineBottomRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.65
      );
    }
  }, []);

  const defaultIcon = icon || (
    <FaHeart className="w-14 h-14 md:w-16 md:h-16 text-[#d7a119]" />
  );

  return (
    <header className="w-full bg-linear-to-br from-[#1f3551] via-[#2a4a6f] to-[#1f3551] text-white overflow-hidden">
      <Navbar />

      <div className="relative w-full">
        {/* Animated gradient orbs */}
        <div ref={decorativeRef} className="space-y-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_50%)] opacity-0" />
          <div className="absolute -top-16 -right-24 h-56 w-56 rounded-full bg-[#d7a119]/20 opacity-0 blur-3xl md:h-80 md:w-80 animate-pulse" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/15 opacity-0 blur-3xl md:h-80 md:w-80 animate-pulse" />

          {/* Additional accent lights */}
          <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-[#d7a119]/10 opacity-0 blur-2xl" />
          <div className="absolute bottom-1/3 left-1/4 h-40 w-40 rounded-full bg-blue-400/5 opacity-0 blur-2xl" />
        </div>

        <div className="relative mx-auto flex min-h-80 w-full max-w-300 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 md:min-h-96 md:px-8 md:py-32 lg:px-12 lg:py-40">
          {/* Top decorative line */}
          <div
            ref={lineTopRef}
            className="mb-8 h-1 w-16 origin-center rounded-full bg-linear-to-r from-transparent via-[#d7a119] to-transparent opacity-0 sm:mb-10 md:mb-12"
          />

          {/* Eyebrow */}
          {eyebrow && (
            <p
              ref={eyebrowRef}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#ffd84d] opacity-0 sm:text-sm md:mb-8 md:text-base"
            >
              {eyebrow}
            </p>
          )}

          {/* Icon */}
          <div
            ref={iconRef}
            className="mb-8 flex items-center justify-center opacity-0 md:mb-10"
          >
            <div className="relative">
              {/* Icon glow effect */}
              <div className="absolute inset-0 -m-2 rounded-full bg-[#d7a119]/20 blur-xl" />
              <div className="relative">{defaultIcon}</div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6 md:mb-8">
            <h1
              ref={titleRef}
              className="max-w-4xl [font-family:var(--font-playfair-display)] text-5xl font-bold leading-tight text-white opacity-0 sm:text-5xl md:text-6xl lg:text-8xl"
            >
              {title}
            </h1>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mx-auto max-w-2xl leading-relaxed text-[#ffeaa0] text-xl opacity-0 md:max-w-3xl md:text-lg lg:text-2xl"
          >
            {subtitle}
          </p>

          {/* Bottom decorative line */}
          <div
            ref={lineBottomRef}
            className="mt-8 h-1 w-16 origin-center rounded-full bg-linear-to-r from-transparent via-[#d7a119] to-transparent opacity-0 sm:mt-10 md:mt-12"
          />

          {/* Decorative sparkles */}
          <div className="absolute bottom-8 left-8 text-lg opacity-0 text-[#d7a119]/40 md:bottom-12 md:left-12 md:text-2xl">
            <MdAutoAwesome />
          </div>
          <div className="absolute top-1/2 right-8 text-lg opacity-0 text-[#d7a119]/30 md:right-12 md:text-xl">
            <MdAutoAwesome className="rotate-45" />
          </div>
        </div>
      </div>
    </header>
  );
};
