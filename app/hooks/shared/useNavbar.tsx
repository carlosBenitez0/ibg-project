'use client';

import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getActiveNav, navSections } from '@/app/constants/navigation';

export const useNavbar = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);

  const labelRef = useRef<HTMLDivElement>(null);
  const labelContactRef = useRef<HTMLDivElement>(null);

  // La sección activa se deriva de la ruta: no hace falta sincronizar estado
  const { section: sectionSelected, option: optionSelected } =
    getActiveNav(pathname);

  return {
    pathname,
    sectionSelected,
    optionSelected,
    dropdownOptions: navSections,
    isHovered,
    setIsHovered,
    isContactHovered,
    setIsContactHovered,
    labelRef,
    labelContactRef,
  };
};
