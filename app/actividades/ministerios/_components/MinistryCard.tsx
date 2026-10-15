import {
  IoBookOutline,
  IoHeartOutline,
  IoLogoWhatsapp,
  IoMusicalNotesOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { LuBaby, LuHandshake, LuUserRound } from 'react-icons/lu';
import { Button } from '@/app/components/shared/ui/Button';
import { whatsappHref } from '@/app/constants/church';
import type { Ministry, MinistryIcon } from '@/app/data/ministries';

const icons: Record<MinistryIcon, React.ReactNode> = {
  book: <IoBookOutline />,
  youth: <GoPeople />,
  music: <IoMusicalNotesOutline />,
  children: <LuBaby />,
  women: <IoHeartOutline />,
  outreach: <LuHandshake />,
};

interface MinistryCardProps {
  ministry: Ministry;
}

export const MinistryCard = ({ ministry }: MinistryCardProps) => {
  const details = [
    { icon: <LuUserRound />, label: 'Líder', value: ministry.leader },
    { icon: <IoTimeOutline />, label: 'Horario', value: ministry.schedule },
    {
      icon: <GoPeople />,
      label: 'Participantes',
      value: ministry.participants,
    },
  ];

  return (
    <article
      data-reveal
      className="group flex h-full flex-col rounded-3xl bg-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)] md:p-10"
    >
      <div className="mb-6 flex items-center gap-5">
        <div
          className={`flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r text-4xl text-white transition-transform duration-300 group-hover:scale-110 ${ministry.color}`}
        >
          {icons[ministry.icon]}
        </div>
        <h3 className="font-playfair text-3xl font-bold text-navy-900 md:text-4xl">
          {ministry.title}
        </h3>
      </div>

      <p className="mb-8 text-2xl leading-relaxed text-navy-700">
        {ministry.description}
      </p>

      <dl className="mb-8 flex flex-col gap-3 rounded-2xl bg-[#fffaf3] p-6">
        {details.map((detail) => (
          <div key={detail.label} className="flex items-center gap-3 text-xl">
            <span className="text-2xl text-gold-600">{detail.icon}</span>
            <dt className="font-semibold text-navy-900">{detail.label}:</dt>
            <dd className="text-navy-700">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mb-8">
        <h4 className="mb-4 text-xl font-semibold uppercase tracking-wider text-navy-600">
          Actividades
        </h4>
        <ul className="flex flex-wrap gap-3">
          {ministry.activities.map((activity) => (
            <li
              key={activity}
              className="rounded-full bg-gold-100 px-4 py-2 text-xl text-gold-800"
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>

      <Button
        href={whatsappHref(
          `Hola, me gustaría unirme al ministerio "${ministry.title}".`
        )}
        external
        icon={<IoLogoWhatsapp />}
        className="mt-auto w-full"
      >
        Quiero Unirme
      </Button>
    </article>
  );
};

export default MinistryCard;
