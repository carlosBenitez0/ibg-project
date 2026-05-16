'use client';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { FaRegHeart } from 'react-icons/fa';
import { IbgLogoPersonalizedText } from '../icons/IbgLogoPersonalizedText';
import { NavbarDrodown } from './navbarDropdown/NavbarDrodown';
import { useNavbar } from '@/app/hooks/shared/useNavbar';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';

interface NavbarProps {
  inHeroSection?: boolean;
}

export const Navbar = ({ inHeroSection = false }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const mobilePanelRef = useRef<HTMLElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const {
    sectionSelected,
    setSectionSelected,
    optionSelected,
    setOptionSelected,
    dropdownOptions,
    isHovered,
    setIsHovered,
    isContactHovered,
    setIsContactHovered,
    labelRef,
    labelContactRef,
  } = useNavbar();

  const mobileLinks = [
    {
      label: 'Inicio',
      href: '/',
      isPrimary: true,
    },
    {
      label: 'Sobre Nosotros',
      href: '/iglesia/sobre-nosotros',
    },
    ...dropdownOptions.flatMap((section) => section.options),
    {
      label: 'Donaciones',
      href: '/page-under-construction',
    },
    {
      label: 'Contacto',
      href: '/page-under-construction',
    },
  ];

  const closeMobileMenu = () => {
    if (typeof document !== 'undefined') {
      const activeElement = document.activeElement as HTMLElement | null;
      activeElement?.blur();
    }

    const panel = mobilePanelRef.current;
    const overlay = mobileOverlayRef.current;

    if (!panel || !overlay) {
      setIsMobileMenuOpen(false);
      return;
    }

    gsap.killTweensOf([panel, overlay]);
    gsap.to(panel, {
      x: '100%',
      opacity: 0,
      duration: 0.28,
      ease: 'power3.inOut',
      onComplete: () => setIsMobileMenuOpen(false),
    });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    if (pathname === '/' && sectionSelected !== 'inicio') {
      setSectionSelected('inicio');
      setOptionSelected('');
      return;
    }

    if (pathname === '/iglesia/sobre-nosotros') {
      if (sectionSelected !== 'Iglesia') {
        setSectionSelected('Iglesia');
      }

      if (optionSelected !== 'Sobre nosotros') {
        setOptionSelected('Sobre nosotros');
      }
      return;
    }

    if (pathname === '/iglesia/ubicacion') {
      if (sectionSelected !== 'Iglesia') {
        setSectionSelected('Iglesia');
      }

      if (optionSelected !== 'Ubicación') {
        setOptionSelected('Ubicación');
      }
    }
  }, [
    pathname,
    sectionSelected,
    optionSelected,
    setSectionSelected,
    setOptionSelected,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useGSAP(() => {
    gsap.to(labelRef.current, {
      width: isHovered ? '100%' : 0,
      duration: 0.2,
      ease: 'power2.inOut',
    });
  }, [isHovered]);

  useGSAP(() => {
    gsap.to(labelContactRef.current, {
      width: isContactHovered ? '100%' : 0,
      duration: 0.2,
      ease: 'power2.inOut',
    });
  }, [isContactHovered]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const panel = mobilePanelRef.current;
    const overlay = mobileOverlayRef.current;
    if (!panel || !overlay) return;

    gsap.killTweensOf([panel, overlay]);
    gsap.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: 'power2.out' }
    );
    gsap.fromTo(
      panel,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.35, ease: 'power3.out' }
    );
  }, [isMobileMenuOpen]);

  const mobileMenu =
    isMobileMenuOpen && typeof window !== 'undefined'
      ? createPortal(
          <div className="fixed inset-0 z-200 lg:hidden">
            <div
              ref={mobileOverlayRef}
              className="absolute inset-0 bg-slate-950/70 transition-opacity duration-300 opacity-100"
              onClick={closeMobileMenu}
            />

            <aside
              ref={mobilePanelRef}
              id="mobile-navigation"
              className="absolute right-0 top-0 flex h-full w-[min(88vw,34rem)] flex-col bg-white text-slate-800 shadow-2xl shadow-black/30 will-change-transform"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
                <div className="w-full flex justify-end">
                  <button
                    type="button"
                    aria-label="Cerrar menú"
                    onClick={closeMobileMenu}
                    className="inline-flex h-10 w-10 items-center justify-end rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <FaXmark className="text-[20px]" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
                <div className="space-y-2">
                  {mobileLinks.map((item) => {
                    const isHome = item.label === 'Inicio';
                    const isAboutUs = item.label === 'Sobre Nosotros';
                    const isContact = item.label === 'Contacto';
                    const isDonation = item.label === 'Donaciones';
                    const isSelected = isHome
                      ? sectionSelected === 'inicio'
                      : isAboutUs
                        ? pathname === '/iglesia/sobre-nosotros'
                        : isContact
                          ? sectionSelected === 'contacto'
                          : isDonation
                            ? sectionSelected === 'donaciones'
                            : optionSelected === item.label;

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          if (isHome) {
                            setSectionSelected('inicio');
                          } else if (isAboutUs) {
                            setSectionSelected('sobre-nosotros');
                          } else if (isContact) {
                            setSectionSelected('contacto');
                          } else if (isDonation) {
                            setSectionSelected('donaciones');
                          } else {
                            setOptionSelected(item.label);
                          }

                          closeMobileMenu();
                        }}
                        className={`flex items-center rounded-2xl px-4 py-4 text-[15px] font-medium transition ${isSelected ? 'bg-linear-to-r from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/20' : 'text-slate-700 hover:bg-slate-100'}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-200 px-5 py-4 text-center text-[12px] text-slate-500 sm:px-6">
                © 2026 Iglesia Bautista Getsemaní
              </div>
            </aside>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <nav
        className={`${
          inHeroSection
            ? isScrolled
              ? 'fixed top-0 z-120 bg-slate-900/85 shadow-lg shadow-black/20 backdrop-blur-md'
              : 'absolute top-0 z-120'
            : 'sticky top-0 z-120 bg-[#1f3551] shadow-md'
        } flex w-full items-center justify-center px-4 py-4 text-white transition-all duration-300 sm:px-6`}
      >
        <div className="flex w-full max-w-480 items-center justify-between px-2 md:px-0">
          <IbgLogoPersonalizedText />

          <ul className="hidden flex-1 items-center justify-center gap-12 text-[14px] lg:flex xl:gap-15">
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="cursor-pointer"
            >
              <Link
                href="/"
                onClick={() => setSectionSelected('inicio')}
                className="relative flex flex-col items-center gap-1 pb-2"
              >
                <p
                  className={`whitespace-nowrap ${sectionSelected === 'inicio' ? 'text-yellow-500' : ''}`}
                >
                  Inicio
                </p>
                <div
                  className="absolute left-0 bottom-0 w-0 h-1 bg-yellow-500"
                  ref={labelRef}
                />
              </Link>
            </li>
            {dropdownOptions.map((option) => (
              <NavbarDrodown
                key={option.label}
                label={option.label}
                options={option.options}
                onClick={() => setSectionSelected(option.label)}
                inOptionClick={setOptionSelected}
                sectionSelected={sectionSelected}
                optionSelected={optionSelected}
              />
            ))}
            <li
              onMouseEnter={() => setIsContactHovered(true)}
              onMouseLeave={() => setIsContactHovered(false)}
              className="cursor-pointer"
            >
              <Link
                href="/page-under-construction"
                onClick={() => setSectionSelected('contacto')}
                className="relative flex flex-col items-center gap-1 pb-2"
              >
                <p
                  className={`whitespace-nowrap ${sectionSelected === 'contacto' ? 'text-yellow-500' : ''}`}
                >
                  Contacto
                </p>
                <div
                  className="absolute left-0 bottom-0 w-0 h-1 bg-yellow-500"
                  ref={labelContactRef}
                />
              </Link>
            </li>
          </ul>

          <div className="hidden flex-none items-center lg:flex">
            <div
              className="flex items-center gap-2 rounded-full bg-linear-to-r from-yellow-400 to-yellow-600 px-10 py-2 cursor-pointer
            shadow-md shadow-yellow-400/30 hover:shadow-yellow-400/50
            hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              <FaRegHeart />
              <Link href="/page-under-construction">Donar</Link>
            </div>
          </div>

          {/* Mobile/Tablet menu */}

          <button
            type="button"
            aria-label="Abrir menú"
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-3 text-white shadow-lg shadow-black/10 backdrop-blur-md transition hover:bg-white/15 lg:hidden"
          >
            <FaBars className="text-[18px]" />
          </button>
        </div>
      </nav>
      {mobileMenu}
    </>
  );
};

export default Navbar;
