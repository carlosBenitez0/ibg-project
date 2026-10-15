'use client';

import Image from 'next/image';
import {
  IoCalendarClearOutline,
  IoHeartOutline,
  IoLocationOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { Button } from '@/app/components/shared/ui/Button';
import type { OutreachCampaign } from '@/app/data/evangelism';
import { useShare } from '@/app/hooks/shared/useShare';

interface CampaignCardProps {
  campaign: OutreachCampaign;
  /** Alterna el lado de la galería en pantallas grandes */
  reversed?: boolean;
}

export const CampaignCard = ({ campaign, reversed }: CampaignCardProps) => {
  const share = useShare();
  const [mainImage, ...thumbnails] = campaign.images;

  const details = [
    { icon: <IoCalendarClearOutline />, text: campaign.date },
    { icon: <IoLocationOutline />, text: campaign.location },
    { icon: <GoPeople />, text: `${campaign.participants} participantes` },
  ];

  return (
    <article
      data-reveal
      className="grid grid-cols-1 gap-8 overflow-hidden rounded-3xl bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.10)] md:p-10 lg:grid-cols-2 lg:gap-12"
    >
      <div
        className={`flex flex-col justify-center ${reversed ? 'lg:order-2' : ''}`}
      >
        <h3 className="mb-4 font-playfair text-3xl font-bold text-navy-900 md:text-4xl">
          {campaign.title}
        </h3>
        <p className="mb-6 text-2xl leading-relaxed text-navy-700">
          {campaign.description}
        </p>

        <ul className="mb-6 flex flex-col gap-3">
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

        <div className="mb-8 rounded-2xl border-l-4 border-gold-500 bg-gold-50 p-5">
          <h4 className="mb-1 flex items-center gap-2 text-xl font-semibold text-gold-800">
            <IoHeartOutline className="text-2xl" />
            Impacto
          </h4>
          <p className="text-2xl text-navy-800">{campaign.impact}</p>
        </div>

        <Button
          onClick={() =>
            share({
              title: campaign.title,
              text: `${campaign.title}: ${campaign.impact}`,
            })
          }
          icon={<IoShareSocialOutline />}
          className="self-start"
        >
          Compartir Testimonio
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative col-span-2 h-72 overflow-hidden rounded-2xl md:h-96">
          <Image
            src={mainImage}
            alt={`${campaign.title} - imagen principal`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        {thumbnails.map((image, index) => (
          <div
            key={image}
            className="relative h-36 overflow-hidden rounded-2xl md:h-44"
          >
            <Image
              src={image}
              alt={`${campaign.title} - imagen ${index + 2}`}
              fill
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </article>
  );
};

export default CampaignCard;
