'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  IoCalendarClearOutline,
  IoNotificationsOutline,
  IoPlay,
  IoTimeOutline,
  IoTvOutline,
} from 'react-icons/io5';
import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { Button } from '@/app/components/shared/ui/Button';
import { formatServiceTime } from '@/app/data/services';
import {
  platformUrls,
  upcomingStreams,
  type UpcomingStream,
} from '@/app/data/streams';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';
import {
  getChurchNow,
  getNextOccurrence,
  googleCalendarUrl,
  isServiceLive,
} from '@/app/utils/schedule';
import { PlatformBadge, platformLabel } from './PlatformBadge';

interface StreamCardProps {
  stream: UpcomingStream;
  /** Hora actual en El Salvador; null hasta montar en el cliente */
  now: Date | null;
}

const StreamCard = ({ stream, now }: StreamCardProps) => {
  const isLive = now
    ? isServiceLive(stream.service, stream.durationMinutes, now)
    : false;
  const channelUrl = platformUrls[stream.platform];
  const reminderUrl = now
    ? googleCalendarUrl({
        title: stream.title,
        description: `${stream.description} Transmisión en ${platformLabel(stream.platform)}: ${channelUrl}`,
        start: getNextOccurrence(stream.service, now),
        durationMinutes: stream.durationMinutes,
      })
    : channelUrl;

  return (
    <article
      data-reveal
      className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)] ${isLive ? 'ring-4 ring-red-500/70' : ''}`}
    >
      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-60 overflow-hidden"
        aria-label={`Abrir ${stream.title} en ${platformLabel(stream.platform)}`}
      >
        <Image
          src={stream.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-navy-900/45" />

        {isLive && (
          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-4 py-1 text-xl font-bold text-white">
            <span className="h-3 w-3 animate-pulse rounded-full bg-white" />
            EN VIVO
          </span>
        )}
        <PlatformBadge
          platform={stream.platform}
          className="absolute right-4 top-4"
        />
        <span className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-4xl text-navy-900 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <IoPlay className="ml-1" />
        </span>
      </a>

      <div className="flex flex-1 flex-col p-8">
        <h3 className="mb-3 font-playfair text-3xl font-bold text-navy-900">
          {stream.title}
        </h3>
        <p className="mb-6 text-2xl leading-relaxed text-navy-700">
          {stream.description}
        </p>

        <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-3 text-xl text-navy-600">
          <li className="flex items-center gap-2">
            <IoCalendarClearOutline className="text-2xl text-gold-600" />
            {stream.service.day}
          </li>
          <li className="flex items-center gap-2">
            <IoTimeOutline className="text-2xl text-gold-600" />
            {formatServiceTime(stream.service.time)}
          </li>
          <li className="flex items-center gap-2">
            <IoTvOutline className="text-2xl text-gold-600" />
            {platformLabel(stream.platform)}
          </li>
        </ul>

        {isLive ? (
          <Button
            href={channelUrl}
            external
            icon={<IoPlay />}
            className="mt-auto w-full bg-none! bg-red-600 hover:bg-red-700"
          >
            Ver Ahora
          </Button>
        ) : (
          <Button
            href={reminderUrl}
            external
            icon={<IoNotificationsOutline />}
            className="mt-auto w-full"
          >
            Programar Recordatorio
          </Button>
        )}
      </div>
    </article>
  );
};

export const UpcomingStreams = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const [now, setNow] = useState<Date | null>(null);

  // La hora se calcula solo en el cliente para evitar diferencias de
  // hidratación; se actualiza cada minuto para encender "EN VIVO".
  useEffect(() => {
    const update = () => setNow(getChurchNow());
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
        <div data-reveal>
          <SectionHeader
            title="Próximas Transmisiones"
            subtitle="Programa tus recordatorios para no perderte nuestros servicios en vivo"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} now={now} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingStreams;
