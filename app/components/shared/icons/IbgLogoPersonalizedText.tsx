import Image from 'next/image';
import Link from 'next/link';

interface IbgLogoPersonalizedTextProps {
  textColorClassName?: string;
}

export const IbgLogoPersonalizedText = ({
  textColorClassName = 'text-white',
}: IbgLogoPersonalizedTextProps) => {
  return (
    <div className="flex items-center gap-6">
      <Link href="/" aria-label="Ir al inicio">
        <Image
          src="/icons/ibglogo.png"
          alt="logo-ibg"
          width={30}
          height={30}
          className="h-auto w-auto"
        />
      </Link>
      <div className={textColorClassName}>
        <p className="[font-family:var(--font-playfair-display)] font-extrabold text-[18px] select-none">
          Iglesia Bautista
        </p>
        <p className="[font-family:var(--font-playfair-display)] font-extrabold text-[14px] select-none">
          Getsemaní
        </p>
      </div>
    </div>
  );
};
