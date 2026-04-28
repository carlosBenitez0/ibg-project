'use client';
import { useRef, useState } from 'react';

export const useNavbarDropdown = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const optionDotRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return {
    arrowRef,
    dropdownRef,
    labelRef,
    isOpen,
    setIsOpen,
    handleMouseEnter,
    handleMouseLeave,
    optionDotRef,
  };
};
