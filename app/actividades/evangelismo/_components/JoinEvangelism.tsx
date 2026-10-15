'use client';

import {
  IoCalendarClearOutline,
  IoHeartOutline,
  IoLogoWhatsapp,
} from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { Button } from '@/app/components/shared/ui/Button';
import { whatsappHref } from '@/app/constants/church';
import { evangelismTeam } from '@/app/data/evangelism';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

const icons = {
  calendar: <IoCalendarClearOutline />,
  people: <GoPeople />,
  heart: <IoHeartOutline />,
};

export const JoinEvangelism = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-navy-900 px-5 py-20 text-white sm:px-8 md:px-10 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <h2
          data-reveal
          className="font-playfair text-4xl font-bold sm:text-5xl md:text-6xl"
        >
          Únete al Ministerio de Evangelismo
        </h2>
        <p
          data-reveal
          className="mt-6 max-w-3xl text-2xl leading-relaxed text-gold-300 md:text-3xl"
        >
          Sé parte de la Gran Comisión. Únete a nuestro equipo de evangelismo y
          ayuda a llevar el mensaje de salvación a nuestra comunidad.
        </p>

        <ul className="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {evangelismTeam.map((item) => (
            <li
              key={item.title}
              data-reveal
              className="flex flex-col items-center rounded-3xl bg-white/10 p-8 backdrop-blur-sm"
            >
              <span className="mb-4 text-5xl text-gold-400">
                {icons[item.icon]}
              </span>
              <h3 className="mb-2 font-playfair text-3xl font-bold">
                {item.title}
              </h3>
              <p className="text-2xl text-white/85">{item.text}</p>
            </li>
          ))}
        </ul>

        <div
          data-reveal
          className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
        >
          <Button
            href={whatsappHref(
              'Hola, quiero unirme al equipo de evangelismo de la iglesia.'
            )}
            external
            size="lg"
            icon={<IoLogoWhatsapp />}
          >
            Unirme al Equipo
          </Button>
          <Button href="/actividades/ministerios" variant="white" size="lg">
            Ver Ministerios
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JoinEvangelism;
