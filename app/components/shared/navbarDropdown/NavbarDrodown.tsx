'use client';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavbarDropdown } from '@/app/hooks/shared/useNavbarDropdown';
import { FaChevronDown } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { PiChurchBold } from 'react-icons/pi';
import { FaPeopleRoof } from 'react-icons/fa6';
import { MdEvent } from 'react-icons/md';
import { MdEmojiPeople } from 'react-icons/md';
import { FaTv } from 'react-icons/fa';
import { TbLogs } from 'react-icons/tb';

// import { useClickOutside } from '@/app/hooks/shared/useClickOutside';

interface NavbarDropdownProps {
  label: string;
  options: { label: string; href: string }[];
  onClick: (label: string) => void;
  inOptionClick: (label: string) => void;
  sectionSelected: string;
  optionSelected: string;
}

export const NavbarDrodown = ({
  label,
  options,
  onClick,
  inOptionClick,
  sectionSelected,
  optionSelected,
}: NavbarDropdownProps) => {
  gsap.registerPlugin(useGSAP);

  const {
    arrowRef,
    dropdownRef,
    labelRef,
    isOpen,
    setIsOpen,
    handleMouseEnter,
    handleMouseLeave,
    optionDotRef,
  } = useNavbarDropdown();

  const iconsMap: Record<string, React.ReactNode> = {
    'Sobre nosotros': <PiChurchBold className="text-gray-700 text-[14px]" />,
    Ubicación: <IoLocationOutline className="text-gray-700 text-[14px]" />,
    Eventos: <MdEvent className="text-gray-700 text-[14px]" />,
    Ministerios: <FaPeopleRoof className="text-gray-700 text-[14px]" />,
    Evangelismo: <MdEmojiPeople className="text-gray-700 text-[14px]" />,
    Transmisiones: <FaTv className="text-gray-700 text-[14px]" />,
    Blog: <TbLogs className="text-gray-700 text-[14px]" />,
  };

  const getIcon = (icon: string) => {
    const iconSelected: React.ReactNode = iconsMap[icon];
    return iconSelected;
  };

  useGSAP(() => {
    // Animación de la flecha
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotate: isOpen ? 180 : 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    // Animación de CORTINA
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        clipPath: isOpen ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        opacity: isOpen ? 1 : 0,
        duration: 0.2,
        ease: 'power3.inOut',
      });
    }

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        width: isOpen ? '100%' : 0,
        duration: 0.2,
        ease: 'power2.inOut',
      });
    }
  }, [isOpen]);

  useGSAP(() => {
    if (optionDotRef.current) {
      gsap.to(optionDotRef.current, {
        opacity: 0,
        duration: 1,
        scale: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'power3.inOut',
      });
    }
  }, [optionSelected]);

  return (
    <li
      className="text-[14px] relative cursor-pointer "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(label)}
    >
      <div className="flex items-center gap-2 pb-2">
        <p
          className={`whitespace-nowrap ${sectionSelected === label ? 'text-yellow-500' : ''}`}
        >
          {label}
        </p>
        <span ref={arrowRef} className="inline-block shrink-0">
          <FaChevronDown
            className={`text-[10px] ${sectionSelected === label ? 'text-yellow-500' : ''}`}
          />
        </span>
        <div
          className="absolute left-0 bottom-0 w-0 h-1 bg-yellow-500"
          ref={labelRef}
        />
      </div>

      <div
        ref={dropdownRef}
        className="absolute top-full left-0 pt-4 w-56 opacity-0 z-50 min-w-max"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <div className="bg-white rounded-2xl py-4 flex flex-col shadow-lg shadow-black/20">
          {options.map((option) => (
            <Link
              key={option.label}
              // href={option.href}
              href="/page-under-construction"
              className={`relative px-5 sm:px-8 py-3 text-gray-700 hover:bg-gray-100 flex items-center justify-start gap-4 ${option.label === optionSelected ? 'bg-gray-100' : ''}`}
              onClick={() => {
                inOptionClick(option.label);
                setIsOpen(false);
              }}
            >
              <span className="flex w-5 shrink-0 items-center justify-center text-[16px] text-gray-700">
                {getIcon(option.label)}
              </span>
              <span className="text-gray-700 font-medium whitespace-nowrap">
                {option.label}
              </span>
              {option.label === optionSelected && (
                <div
                  ref={optionDotRef}
                  className="absolute left-2 top-[50%] translate-y-[-50%] rounded-full bg-yellow-500 w-3 h-3 shadow-[0_0_10px_0_rgba(0,0,0,0.5)]"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
};
