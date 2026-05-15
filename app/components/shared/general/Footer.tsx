'use client';

import { IbgLogoPersonalizedText } from '../icons/IbgLogoPersonalizedText';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { LuMail } from 'react-icons/lu';
import { FaFacebookF } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !footerRef.current ||
        !topSectionRef.current ||
        !bottomSectionRef.current
      ) {
        return;
      }

      const columns = Array.from(
        footerRef.current.querySelectorAll('.footerColumn')
      );
      const topChildren = Array.from(topSectionRef.current.children);

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      tl.fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      )
        .fromTo(
          columns,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.16,
          },
          '-=0.05'
        )
        .fromTo(
          topChildren,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.04 },
          '-=0.45'
        )
        .fromTo(
          bottomSectionRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.25'
        );
    },
    { scope: footerRef, dependencies: [] }
  );

  return (
    <footer className="w-full bg-[#123152]">
      <div
        ref={footerRef}
        className="w-full h-full  py-20 grid grid-cols-1 justify-items-center px-6 md:px-8 opacity-0"
      >
        <div
          ref={topSectionRef}
          className="w-full max-w-480 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-10 h-full"
        >
          <div className="footerColumn md:col-span-2 xl:col-span-1 flex flex-col gap-4 text-gray-300">
            <IbgLogoPersonalizedText />
            <p className="mt-4 text-xl text-amber-200/90">
              &quot;Creciendo en la Gracia de Dios&quot;
            </p>
            <p className="text-[13px]">
              Una comunidad de fe comprometida con el amor de Cristo, sirviendo
              en Chalatenango, El Salvador.
            </p>
          </div>
          <div className="footerColumn flex flex-col gap-6 text-gray-300">
            <h3 className="text-md font-bold [font-family:var(--font-playfair-display)] text-white mb-4">
              Contacto
            </h3>
            <div className="flex gap-4 text-lg md:text-xl items-start md:items-center">
              <HiOutlineLocationMarker className="text-3xl text-[#ffc738]" />
              <span>
                Reubicación 1
                <br />
                Chalatenango, El Salvador
              </span>
            </div>
            <div className="flex gap-4 text-lg md:text-xl items-center">
              <FiPhone className="text-3xl text-[#ffc738]" />
              +503 0000-0000
            </div>
            <div className="flex gap-4 text-lg md:text-xl items-center">
              <LuMail className="text-3xl text-[#ffc738]" />
              info@getsemani.org.sv
            </div>
          </div>
          <div className="footerColumn flex flex-col gap-6 text-gray-300">
            <h3 className="text-md font-bold [font-family:var(--font-playfair-display)] text-white mb-4">
              Horarios
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-4 text-lg md:text-xl text-gray-300">
                <p>Culto general:</p>
                <p className="text-[#ffc738] text-[14px]">Sábado 4:00 PM</p>
              </div>
              <div className="flex justify-between gap-4 text-lg md:text-xl text-gray-300">
                <p>Culto de Jóvenes:</p>
                <p className="text-[#ffc738] text-[14px]">Sábado 6:00 PM</p>
              </div>
              <div className="flex justify-between gap-4 text-lg md:text-xl text-gray-300">
                <p>Culto Principal:</p>
                <p className="text-[#ffc738] text-[14px]">Domingo 4:00 PM</p>
              </div>
              <div className="flex justify-between gap-4 text-lg md:text-xl text-gray-300">
                <p>Culto de Oración:</p>
                <p className="text-[#ffc738] text-[14px]">Martes 4:00 PM</p>
              </div>
            </div>

            <Link
              href={'/page-under-construction'}
              className="w-full text-center px-6 py-3 bg-linear-to-r from-[#e9c400] to-[#cf8433] rounded-2xl my-4"
            >
              <span className="text-white text-[14px]">
                Ver Todos los Horarios
              </span>
            </Link>

            <div className="mb-4">
              <h4 className="text-[14px] font-bold text-gray-200 mb-8 mt-10">
                Siguenos
              </h4>
              <div className="flex gap-4">
                <div className="p-4 rounded-full bg-linear-to-r from-[#e9c400] to-[#cf8433]">
                  <FaFacebookF className="text-3xl text-white" />
                </div>
                <div className="p-4 rounded-full bg-linear-to-r from-[#e9c400] to-[#cf8433]">
                  <FaTiktok className="text-3xl text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={bottomSectionRef}
          className="pt-10 md:pt-14 pb-6 md:pb-0 border-t border-gray-500/50 w-full max-w-480 mt-10 text-gray-400 text-xl md:text-xl opacity-0"
        >
          <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <p>
              © {currentYear} Iglesia Bautista Getsemaní. Todos los derechos
              reservados.
            </p>
            <p className="italic text-gray-300 md:text-right">
              &quot;Nosotros le amamos a él, porque él nos amó primero.&quot;
              <br /> - 1 Juan 4:19
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
