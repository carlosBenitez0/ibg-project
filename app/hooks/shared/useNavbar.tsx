'use client';

import { useRef, useState } from 'react';

export const useNavbar = () => {
  const [sectionSelected, setSectionSelected] = useState<string>('');
  const [optionSelected, setOptionSelected] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);

  const labelRef = useRef<HTMLDivElement>(null);
  const labelContactRef = useRef<HTMLDivElement>(null);

  const dropdownOptions = [
    {
      label: 'Iglesia',
      href: '/iglesia',
      options: [
        {
          label: 'Sobre nosotros',
          href: '/iglesia/sobre-nosotros',
        },
        {
          label: 'Ubicación',
          href: '/iglesia/ubicacion',
        },
      ],
    },
    {
      label: 'Actividades',
      href: '/actividades',
      options: [
        {
          label: 'Eventos',
          href: '/actividades/eventos',
        },
        {
          label: 'Ministerios',
          href: '/actividades/ministerios',
        },
        {
          label: 'Evangelismo',
          href: '/actividades/evangelismo',
        },
      ],
    },
    {
      label: 'Medios',
      href: '/medios',
      options: [
        {
          label: 'Transmisiones',
          href: '/medios/transmisiones',
        },
        {
          label: 'Blog',
          href: '/medios/blog',
        },
      ],
    },
  ];

  return {
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
  };
};
