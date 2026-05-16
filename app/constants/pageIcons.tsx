import { PiChurchBold } from 'react-icons/pi';
import { IoLocationOutline } from 'react-icons/io5';
import { MdEvent } from 'react-icons/md';
import { FaPeopleRoof } from 'react-icons/fa6';
import { MdEmojiPeople } from 'react-icons/md';
import { FaTv } from 'react-icons/fa';
import { TbLogs } from 'react-icons/tb';

// Iconos para dropdown del navbar (14px)
export const navbarIconsMap: Record<string, React.ReactNode> = {
  'Sobre nosotros': <PiChurchBold className="text-gray-700 text-[14px]" />,
  Ubicación: <IoLocationOutline className="text-gray-700 text-[14px]" />,
  Eventos: <MdEvent className="text-gray-700 text-[14px]" />,
  Ministerios: <FaPeopleRoof className="text-gray-700 text-[14px]" />,
  Evangelismo: <MdEmojiPeople className="text-gray-700 text-[14px]" />,
  Transmisiones: <FaTv className="text-gray-700 text-[14px]" />,
  Blog: <TbLogs className="text-gray-700 text-[14px]" />,
};

// Iconos para PageHeader (más grandes, color dorado)
export const pageHeaderIconsMap: Record<string, React.ReactNode> = {
  'Sobre nosotros': (
    <PiChurchBold className="w-14 h-14 md:w-16 md:h-16 text-[#d7a119]" />
  ),
  Ubicación: (
    <IoLocationOutline className="w-14 h-14 md:w-16 md:h-16 text-[#d7a119]" />
  ),
  Eventos: <MdEvent className="w-14 h-14 md:w-16 md:h-16 text-[#d7a119]" />,
  Ministerios: (
    <FaPeopleRoof className="w-14 h-14 md:w-16 md:h-16 text-[#d7a119]" />
  ),
  Evangelismo: (
    <MdEmojiPeople className="w-14 h-14 md:w-16 md:h-16 text-[#d7a119]" />
  ),
  Transmisiones: <FaTv className="w-14 h-14 md:w-16 md:h-16 text-[#d7a119]" />,
  Blog: <TbLogs className="w-14 h-14 md:w-16 md:h-16 text-[#d7a119]" />,
};
