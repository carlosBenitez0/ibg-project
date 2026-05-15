'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { IoIosArrowRoundForward } from 'react-icons/io';

interface ConnectCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  iconBackgroundClassName: string;
  buttonClassName: string;
}

export const ConnectCard = ({
  icon,
  title,
  description,
  buttonLabel,
  buttonHref,
  iconBackgroundClassName,
  buttonClassName,
}: ConnectCardProps) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const iconref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const handleMouseEnter = () => {
      // Anima transform (300ms)
      gsap.to(article, {
        y: -14,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Anima shadow (400ms)
      gsap.to(article, {
        boxShadow: '0 8px 30px rgba(15, 23, 42, 0.15)',
        duration: 0.4,
        ease: 'power2.out',
        delay: 0,
      });

      gsap.to(iconref.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(article, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(article, {
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(iconref.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    article.addEventListener('mouseenter', handleMouseEnter);
    article.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      article.removeEventListener('mouseenter', handleMouseEnter);
      article.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={articleRef}
      className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)] md:p-8"
    >
      <div
        ref={iconref}
        className={`flex h-22 w-22 items-center justify-center rounded-2xl text-5xl text-white ${iconBackgroundClassName}`}
      >
        {icon}
      </div>

      <h3 className="mt-8 text-start [font-family:var(--font-playfair-display)] text-2xl font-bold text-slate-900 md:text-[2.2rem]">
        {title}
      </h3>

      <p className="mt-4 text-start text-lg leading-relaxed text-slate-700 md:text-[1.75rem]">
        {description}
      </p>

      <Link
        href={buttonHref}
        className={`mt-8 inline-flex items-center justify-center gap-3 rounded-lg p-6 text-center transition-transform duration-300 hover:-translate-y-0.5 ${buttonClassName}`}
      >
        <span className="font-semibold text-white text-2xl flex items-center">
          {buttonLabel}
          <IoIosArrowRoundForward className="text-5xl" />
        </span>
      </Link>
    </div>
  );
};
