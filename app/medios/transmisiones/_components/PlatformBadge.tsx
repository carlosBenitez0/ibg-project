import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import type { StreamPlatform } from '@/app/data/streams';

const styles: Record<
  StreamPlatform,
  { icon: React.ReactNode; className: string; label: string }
> = {
  youtube: {
    icon: <FaYoutube />,
    className: 'bg-[#ff0000]',
    label: 'YouTube',
  },
  facebook: {
    icon: <FaFacebookF />,
    className: 'bg-[#1877f2]',
    label: 'Facebook',
  },
};

interface PlatformBadgeProps {
  platform: StreamPlatform;
  className?: string;
}

/** Ícono circular de la plataforma (YouTube / Facebook). */
export const PlatformBadge = ({
  platform,
  className = '',
}: PlatformBadgeProps) => (
  <span
    title={styles[platform].label}
    className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white shadow-md ${styles[platform].className} ${className}`}
  >
    {styles[platform].icon}
    <span className="sr-only">{styles[platform].label}</span>
  </span>
);

export const platformLabel = (platform: StreamPlatform) =>
  styles[platform].label;

export default PlatformBadge;
