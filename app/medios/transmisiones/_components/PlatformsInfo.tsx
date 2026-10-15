'use client';

import { FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa';
import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { platforms } from '@/app/data/streams';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

const platformStyles = {
  youtube: {
    icon: <FaYoutube />,
    iconClassName: 'bg-[#ff0000]',
    buttonClassName: 'bg-[#ff0000] hover:bg-[#d90000]',
  },
  facebook: {
    icon: <FaFacebookF />,
    iconClassName: 'bg-[#1877f2]',
    buttonClassName: 'bg-[#1877f2] hover:bg-[#145fc4]',
  },
  tiktok: {
    icon: <FaTiktok />,
    iconClassName: 'bg-black',
    buttonClassName: 'bg-black hover:bg-slate-800',
  },
};

export const PlatformsInfo = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
        <div data-reveal>
          <SectionHeader
            title="Nuestras Plataformas"
            subtitle="Síguenos en nuestras redes sociales para no perderte ninguna transmisión"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {platforms.map((platform) => {
            const styles = platformStyles[platform.id];
            return (
              <article
                key={platform.id}
                data-reveal
                className="flex flex-col items-center rounded-3xl bg-[#fffaf3] p-8 text-center shadow-[0_12px_32px_rgba(15,23,42,0.08)] md:p-10"
              >
                <span
                  className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl text-white shadow-lg ${styles.iconClassName}`}
                >
                  {styles.icon}
                </span>
                <h3 className="mb-3 font-playfair text-3xl font-bold text-navy-900">
                  {platform.name}
                </h3>
                <p className="mb-6 text-2xl leading-relaxed text-navy-700">
                  {platform.description}
                </p>
                <p className="mb-8 text-xl font-semibold text-gold-700">
                  {platform.stats.join(' • ')}
                </p>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-2xl font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 ${styles.buttonClassName}`}
                >
                  {styles.icon}
                  {platform.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformsInfo;
