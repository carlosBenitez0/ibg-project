'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealOptions {
  /** Retraso entre elementos que entran juntos en pantalla (s) */
  stagger?: number;
  /** Desplazamiento vertical inicial (px) */
  y?: number;
  /** Punto de inicio del ScrollTrigger */
  start?: string;
  /** Valores que, al cambiar, buscan nuevos elementos a revelar */
  dependencies?: unknown[];
}

/**
 * Revela con GSAP los elementos marcados con `data-reveal` dentro del
 * contenedor devuelto. Los elementos se animan por lotes a medida que
 * entran en pantalla, así una grilla larga no se anima toda de golpe.
 *
 * Los elementos que aparecen después (filtros, "cargar más") se animan al
 * cambiar `dependencies`, sin volver a ocultar los ya revelados.
 */
export const useRevealOnScroll = <T extends HTMLElement = HTMLElement>({
  stagger = 0.15,
  y = 40,
  start = 'top 85%',
  dependencies = [],
}: RevealOptions = {}) => {
  const containerRef = useRef<T>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const items = Array.from(
        container.querySelectorAll<HTMLElement>(
          '[data-reveal]:not([data-revealed])'
        )
      );
      if (!items.length) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      items.forEach((item) => item.setAttribute('data-revealed', ''));

      if (prefersReducedMotion) return;

      gsap.set(items, { opacity: 0, y, filter: 'blur(8px)' });

      ScrollTrigger.batch(items, {
        start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            stagger,
            overwrite: true,
          }),
      });
    },
    { scope: containerRef, dependencies, revertOnUpdate: false }
  );

  return containerRef;
};
