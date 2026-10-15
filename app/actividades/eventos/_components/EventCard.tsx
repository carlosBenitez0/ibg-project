import Image from 'next/image';
import { IoCalendarClearOutline, IoTimeOutline } from 'react-icons/io5';
import { IoLocationOutline } from 'react-icons/io5';
import type { ChurchEvent } from '@/app/data/events';

interface EventCardProps {
  event: ChurchEvent;
}

/** Tarjeta de un culto semanal. */
export const EventCard = ({ event }: EventCardProps) => {
  const details = [
    { icon: <IoCalendarClearOutline />, text: event.date },
    { icon: <IoTimeOutline />, text: event.time },
    { icon: <IoLocationOutline />, text: event.location },
  ];

  return (
    <article
      data-reveal
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-900/60 to-transparent" />
        <span className="absolute right-4 top-4 rounded-full bg-gold-500 px-4 py-1 text-xl font-semibold text-white">
          Semanal
        </span>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <h3 className="mb-3 font-playfair text-3xl font-bold text-navy-900 transition-colors duration-300 group-hover:text-gold-700">
          {event.title}
        </h3>
        <p className="mb-6 text-2xl leading-relaxed text-navy-700">
          {event.description}
        </p>

        <ul className="mt-auto flex flex-col gap-3">
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
      </div>
    </article>
  );
};

export default EventCard;
