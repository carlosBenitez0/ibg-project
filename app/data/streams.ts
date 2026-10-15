import { churchInfo } from '@/app/constants/church';
import { weeklyServices, type WeeklyService } from './services';

export type StreamPlatform = 'youtube' | 'facebook';

export const platformUrls: Record<StreamPlatform, string> = {
  youtube: churchInfo.social.youtube,
  facebook: churchInfo.social.facebook,
};

export interface UpcomingStream {
  id: string;
  title: string;
  description: string;
  service: WeeklyService;
  platform: StreamPlatform;
  /** Duración aproximada de la transmisión (min) */
  durationMinutes: number;
  thumbnail: string;
}

const findService = (description: string) => {
  const service = weeklyServices.find((s) => s.description === description);
  if (!service) throw new Error(`Servicio no encontrado: ${description}`);
  return service;
};

// Cultos que se transmiten en vivo (horario tomado del horario oficial)
// TODO: confirmar con la iglesia qué cultos se transmiten y en qué plataforma
export const upcomingStreams: UpcomingStream[] = [
  {
    id: 'culto-principal',
    title: 'Culto Principal en Vivo',
    description: 'Únete a nuestro servicio principal de adoración y predicación.',
    service: findService('Culto Principal'),
    platform: 'youtube',
    durationMinutes: 120,
    thumbnail: '/images/gallery/culto-principal.jpeg',
  },
  {
    id: 'estudio-biblico',
    title: 'Estudio Bíblico Interactivo',
    description: 'Estudio profundo de la Palabra con participación en el chat.',
    service: findService('Culto de Estudio Bíblico'),
    platform: 'facebook',
    durationMinutes: 90,
    thumbnail: '/images/gallery/estudio-biblico.jpeg',
  },
  {
    id: 'jovenes',
    title: 'Reunión de Jóvenes',
    description: 'Encuentro juvenil con música, enseñanza y actividades.',
    service: findService('Culto de Jóvenes'),
    platform: 'facebook',
    durationMinutes: 90,
    thumbnail: '/images/gallery/culto-jovenes.jpeg',
  },
];

export interface PastStream {
  id: string;
  title: string;
  date: string;
  views: string;
  duration: string;
  platform: StreamPlatform;
  thumbnail: string;
  /** Enlace al video; mientras no exista, apunta al canal */
  url: string;
}

const img = (name: string) => `/images/gallery/${name}.jpeg`;

// TODO: reemplazar por los videos reales del canal
export const pastStreams: PastStream[] = [
  {
    id: 'fe-que-transforma',
    title: 'Mensaje: "La Fe que Transforma"',
    date: 'Domingo pasado',
    views: '245',
    duration: '45 min',
    platform: 'youtube',
    thumbnail: img('culto-domingo'),
    url: platformUrls.youtube,
  },
  {
    id: 'salmo-23',
    title: 'Estudio: "Salmo 23"',
    date: 'Hace 3 días',
    views: '180',
    duration: '35 min',
    platform: 'facebook',
    thumbnail: img('noche-adoracion'),
    url: platformUrls.facebook,
  },
  {
    id: 'creciendo-en-gracia',
    title: 'Conferencia: "Creciendo en Gracia"',
    date: 'Hace 1 semana',
    views: '320',
    duration: '1h 15min',
    platform: 'youtube',
    thumbnail: img('conferencia-avivamiento'),
    url: platformUrls.youtube,
  },
  {
    id: 'noche-de-adoracion',
    title: 'Noche de Adoración',
    date: 'Hace 2 semanas',
    views: '290',
    duration: '50 min',
    platform: 'facebook',
    thumbnail: img('alabanza-banda'),
    url: platformUrls.facebook,
  },
  {
    id: 'dia-del-padre',
    title: 'Celebración del Día del Padre',
    date: 'Hace 3 semanas',
    views: '410',
    duration: '1h 30min',
    platform: 'youtube',
    thumbnail: img('dia-del-padre-1'),
    url: platformUrls.youtube,
  },
  {
    id: 'jovenes-proposito',
    title: 'Jóvenes: "Viviendo con Propósito"',
    date: 'Hace 1 mes',
    views: '205',
    duration: '55 min',
    platform: 'facebook',
    thumbnail: img('presentacion-jovenes'),
    url: platformUrls.facebook,
  },
  {
    id: 'familia-de-dios',
    title: 'Mensaje: "Somos Familia de Dios"',
    date: 'Hace 1 mes',
    views: '268',
    duration: '48 min',
    platform: 'youtube',
    thumbnail: img('dia-del-padre-2'),
    url: platformUrls.youtube,
  },
  {
    id: 'oracion-que-mueve',
    title: 'Culto de Oración: "Oración que Mueve"',
    date: 'Hace 5 semanas',
    views: '150',
    duration: '40 min',
    platform: 'facebook',
    thumbnail: img('culto-oracion'),
    url: platformUrls.facebook,
  },
  {
    id: 'juventud-en-accion',
    title: 'Juventud en Acción',
    date: 'Hace 6 semanas',
    views: '230',
    duration: '1h 05min',
    platform: 'youtube',
    thumbnail: img('culto-jovenes-2'),
    url: platformUrls.youtube,
  },
];

// TODO: confirmar cifras de seguidores con la iglesia
export const platforms = [
  {
    id: 'youtube',
    name: 'YouTube',
    description:
      'Nuestro canal principal, donde transmitimos los cultos dominicales y eventos especiales en alta calidad.',
    stats: ['500+ Suscriptores', '50+ Videos'],
    cta: 'Suscribirse',
    url: churchInfo.social.youtube,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description:
      'Transmisiones interactivas de estudios bíblicos y eventos especiales con participación de la comunidad.',
    stats: ['800+ Seguidores', 'Chat en vivo'],
    cta: 'Seguir Página',
    url: churchInfo.social.facebook,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description:
      'Contenido inspiracional, versículos y momentos especiales de nuestra comunidad en formato corto.',
    stats: ['300+ Seguidores', 'Videos semanales'],
    cta: 'Seguir en TikTok',
    url: churchInfo.social.tiktok,
  },
] as const;
