import { churchInfo } from '@/app/constants/church';

interface MapEmbedProps {
  /** Clases de alto del iframe */
  heightClassName?: string;
  className?: string;
}

/** Mapa de Google con la ubicación de la iglesia y una etiqueta superpuesta. */
export const MapEmbed = ({
  heightClassName = 'h-[42rem] md:h-[52rem]',
  className = '',
}: MapEmbedProps) => (
  <div
    className={`relative rounded-3xl bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.10)] md:p-6 ${className}`}
  >
    <iframe
      src={churchInfo.map.embedUrl}
      title="Mapa de la Iglesia Bautista Getsemaní"
      className={`w-full rounded-2xl border-0 ${heightClassName}`}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
    <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-sm md:bottom-10 md:left-10 md:right-auto">
      <p className="font-playfair text-2xl font-bold text-navy-900">
        {churchInfo.name}
      </p>
      <p className="text-xl text-navy-700">{churchInfo.address.line1}</p>
    </div>
  </div>
);

export default MapEmbed;
