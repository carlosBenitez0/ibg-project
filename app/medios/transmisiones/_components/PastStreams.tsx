'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoEyeOutline, IoPlay, IoTimeOutline } from 'react-icons/io5';
import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { Button } from '@/app/components/shared/ui/Button';
import { pastStreams } from '@/app/data/streams';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';
import { PlatformBadge, platformLabel } from './PlatformBadge';

const INITIAL_COUNT = 6;
const PAGE_SIZE = 3;

export const PastStreams = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const sectionRef = useRevealOnScroll<HTMLElement>({
    dependencies: [visibleCount],
  });

  const visibleStreams = pastStreams.slice(0, visibleCount);
  const hasMore = visibleCount < pastStreams.length;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-linear-to-br from-[#fffaf3] to-gold-50 px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-440 flex-col gap-14">
        <div data-reveal>
          <SectionHeader
            title="Mensajes Anteriores"
            subtitle="Revive nuestros servicios pasados y comparte con otros"
          />
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleStreams.map((stream) => (
            <li key={stream.id} data-reveal>
              <a
                href={stream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={stream.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy-900/40" />
                  <PlatformBadge
                    platform={stream.platform}
                    className="absolute right-4 top-4 h-10! w-10! text-xl!"
                  />
                  <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-3xl text-navy-900 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                    <IoPlay className="ml-1" />
                  </span>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-lg text-white">
                    <IoTimeOutline />
                    {stream.duration}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-playfair text-2xl font-bold text-navy-900 transition-colors duration-300 group-hover:text-gold-700 md:text-[2.2rem]">
                    {stream.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between text-xl text-navy-600">
                    <span>{stream.date}</span>
                    <span className="flex items-center gap-1">
                      <IoEyeOutline />
                      {stream.views} vistas
                    </span>
                  </div>
                  <span className="sr-only">
                    Ver en {platformLabel(stream.platform)}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className="flex justify-center">
            <Button
              variant="navy"
              size="lg"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Ver Más Videos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PastStreams;
