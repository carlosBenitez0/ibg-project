'use client';

import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

interface CtaSectionProps {
  title: string;
  description: string;
  /** Botones de acción (normalmente <Button />) */
  children?: React.ReactNode;
  variant?: 'navy' | 'gold';
}

const variants = {
  navy: {
    section: 'bg-navy-900',
    description: 'text-gold-300',
  },
  gold: {
    section: 'bg-linear-to-r from-[#e9c400] to-[#cf8433]',
    description: 'text-white/95',
  },
};

/** Franja final de llamada a la acción que cierra las páginas internas. */
export const CtaSection = ({
  title,
  description,
  children,
  variant = 'navy',
}: CtaSectionProps) => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const styles = variants[variant];

  return (
    <section
      ref={sectionRef}
      className={`w-full px-5 py-20 text-white sm:px-8 md:px-10 md:py-28 ${styles.section}`}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <h2
          data-reveal
          className="font-playfair text-4xl font-bold sm:text-5xl md:text-6xl"
        >
          {title}
        </h2>
        <p
          data-reveal
          className={`mt-6 max-w-3xl text-2xl leading-relaxed md:text-3xl ${styles.description}`}
        >
          {description}
        </p>
        {children && (
          <div
            data-reveal
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default CtaSection;
