import Image from 'next/image';
import {
  IoCalendarClearOutline,
  IoLocationOutline,
  IoLogoWhatsapp,
  IoTimeOutline,
} from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { Button } from '@/app/components/shared/ui/Button';
import { whatsappHref } from '@/app/constants/church';
import type { ChurchEvent } from '@/app/data/events';

interface SpecialEventCardProps {
  event: ChurchEvent;
}

/** Tarjeta horizontal de un evento especial con registro por WhatsApp. */
export const SpecialEventCard = ({ event }: SpecialEventCardProps) => {
  const details = [
    { icon: <IoCalendarClearOutline />, text: event.date },
    { icon: <IoTimeOutline />, text: event.time },
    { icon: <IoLocationOutline />, text: event.location },
    ...(event.attendees
      ? [{ icon: <GoPeople />, text: `${event.attendees} asistentes` }]
      : []),
  ];

  return (
    <article
      data-reveal
      className="group grid overflow-hidden rounded-3xl bg-white shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)] lg:grid-cols-2"
    >
      <div className="relative h-72 overflow-hidden lg:h-auto lg:min-h-96">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-900/60 to-transparent" />
        <span className="absolute right-4 top-4 rounded-full bg-bronze-500 px-4 py-1 text-xl font-semibold text-white">
          Especial
        </span>
      </div>

      <div className="flex flex-col justify-center p-8 md:p-10">
        <h3 className="mb-3 font-playfair text-3xl font-bold text-navy-900 transition-colors duration-300 group-hover:text-gold-700 md:text-4xl">
          {event.title}
        </h3>
        <p className="mb-6 text-2xl leading-relaxed text-navy-700">
          {event.description}
        </p>

        <ul className="mb-8 flex flex-col gap-3">
          {details.map((detail) => (
            <li
              key={detail.text}
              className="flex items-center gap-3 text-xl text-navy-600"
            >
              <span className="text-2xl text-gold-600">{detail.icon}</span>
              {detail.text}
            </li>
          ))}
        </ul>

        <Button
          href={whatsappHref(
            `Hola, quiero registrarme en el evento "${event.title}" (${event.date}).`
          )}
          external
          icon={<IoLogoWhatsapp />}
        >
          Registrarse
        </Button>
      </div>
    </article>
  );
};

export default SpecialEventCard;
