'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { RiServiceLine } from 'react-icons/ri';

interface HeroVHProps {
  image: string;
  alt: string;
}

export const HeroVH = ({ image, alt }: HeroVHProps) => {
  const arrowdown = useRef<HTMLDivElement>(null);
  const h1ref = useRef<HTMLHeadingElement>(null);
  const pref = useRef<HTMLParagraphElement>(null);
  const divref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(arrowdown.current, {
      y: 15,
      duration: 0.6,
      yoyo: true,
      repeat: -1,
    });

    const tl = gsap.timeline();

    tl.fromTo(
      h1ref.current,
      {
        opacity: 0,
        y: 100,
        filter: 'blur(5px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
      }
    )
      .fromTo(
        pref.current,
        {
          opacity: 0,
          y: 100,
          filter: 'blur(5px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .fromTo(
        divref.current,
        {
          opacity: 0,
          filter: 'blur(5px)',
          y: 100,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1,
        },
        '-=0.5'
      );
  }, []);

  return (
    <div className="relative h-full w-full flex items-center justify-center px-4 pt-24 sm:px-6 sm:pt-28 lg:pt-0">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        className="object-cover z-0 absolute"
      />

      <div className="absolute inset-0 bg-slate-800/85 z-10" />
      <div className="z-50 flex w-full max-w-[1200px] flex-col items-center justify-center gap-8 px-0 text-center sm:gap-10 md:gap-12 lg:gap-12">
        <h1
          ref={h1ref}
          className="opacity-0 text-center text-white text-6xl font-extrabold leading-none sm:text-7xl md:text-8xl lg:text-[7rem] [font-family:var(--font-playfair-display)]"
        >
          Bienvenidos a la<br></br>
          <span className="text-transparent bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text">
            Iglesia Bautista Getsemaní
          </span>
        </h1>
        <p
          ref={pref}
          className="opacity-0 max-w-4xl text-center text-xl leading-snug text-gray-300/90 sm:text-2xl md:text-3xl lg:text-4xl"
        >
          Reubicación 1, Chalatenango, El Salvador
        </p>
        <div
          ref={divref}
          className="opacity-0 flex w-full max-w-88 items-center justify-center rounded-full bg-linear-to-r from-yellow-400 to-yellow-600 px-6 py-4 shadow-[0_0_10px_rgba(255,255,0,0.4),inset_0_10px_10px_rgba(255,255,255,0.3)] transition-transform hover:translate-y-10 hover:scale-105 hover:shadow-yellow-400/50 sm:max-w-104 sm:px-8 sm:py-5 lg:w-fit lg:max-w-none lg:px-15 lg:py-5 cursor-pointer"
        >
          <Link href="/page-under-construction">
            <span className="flex items-center justify-center gap-3 text-center text-lg font-semibold text-white sm:text-lg lg:text-[18px]">
              Únete a nuestros servicios <RiServiceLine />
            </span>
          </Link>
        </div>
      </div>
      <div
        ref={arrowdown}
        className="absolute z-50 bottom-6 right-[50%] transform translate-x-[50%] sm:bottom-8 lg:bottom-10"
      >
        <IoIosArrowDown className="text-yellow-400 text-[28px]" />
      </div>
      {/* <div
        className="absolute z-50 bottom-0 right-[50%] transform translate-x-[50%] h-[20px] w-[20px] 
        bg-yellow-400 [clip-path:polygon(0_0,25%_0,50%_50%,75%_0,100%_0%,50%_100%)]"
      /> */}
    </div>
  );
};
