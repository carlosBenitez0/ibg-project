import { churchInfo } from '@/app/constants/church';
import { formatServiceTime, servicesByWeekOrder } from './services';

export interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  type: 'regular' | 'special';
  /** Asistencia aproximada, p. ej. "150+" */
  attendees?: string;
}

const churchLocation = churchInfo.address.line1;

// Martes, Miércoles y Jueves no cambian en plural
const pluralDay = (day: string) => (day.endsWith('s') ? day : `${day}s`);

// Descripción e imagen de cada culto semanal (clave: descripción del servicio)
const regularDetails: Record<string, { text: string; image: string }> = {
  'Culto Principal': {
    text: 'Servicio principal de adoración y predicación de la Palabra.',
    image: '/images/gallery/culto-principal.jpeg',
  },
  'Culto de Oración': {
    text: 'Nos reunimos para orar unos por otros y por nuestra comunidad.',
    image: '/images/gallery/culto-oracion.jpeg',
  },
  'Culto de Célula de Hogar': {
    text: 'Grupos pequeños en los hogares para compartir y crecer en la fe.',
    image: '/images/gallery/celula-hogar.jpeg',
  },
  'Culto de Estudio Bíblico': {
    text: 'Estudio profundo de la Palabra de Dios para todas las edades.',
    image: '/images/gallery/estudio-biblico.jpeg',
  },
  'Culto de General': {
    text: 'Servicio de toda la congregación para cerrar la semana juntos.',
    image: '/images/gallery/culto-general.jpeg',
  },
  'Culto de Jóvenes': {
    text: 'Encuentro de jóvenes con alabanza, enseñanza y actividades.',
    image: '/images/gallery/culto-jovenes.jpeg',
  },
};

/** Cultos semanales, derivados del horario oficial. */
export const regularEvents: ChurchEvent[] = servicesByWeekOrder.map(
  (service) => ({
    id: `${service.dayNumber}-${service.time}`,
    title: service.description,
    description: regularDetails[service.description]?.text ?? '',
    date: `Todos los ${pluralDay(service.day)}`,
    time: formatServiceTime(service.time),
    location: churchLocation,
    image:
      regularDetails[service.description]?.image ??
      '/images/gallery/culto-principal.jpeg',
    type: 'regular',
  })
);

// TODO: confirmar con la iglesia las fechas y detalles de los eventos especiales
export const specialEvents: ChurchEvent[] = [
  {
    id: 'conferencia-avivamiento',
    title: 'Conferencia de Avivamiento',
    description:
      'Tres días de alabanza, predicación y renovación espiritual para toda la familia.',
    date: '13-15 de Noviembre',
    time: '7:00 PM',
    location: churchLocation,
    image: '/images/gallery/conferencia-avivamiento.jpeg',
    type: 'special',
    attendees: '200+',
  },
  {
    id: 'retiro-damas',
    title: 'Retiro de Damas',
    description:
      'Fin de semana de comunión, oración y crecimiento espiritual para las mujeres de la iglesia.',
    date: '5-6 de Diciembre',
    time: '9:00 AM',
    location: 'Centro de Retiros El Paraíso',
    image: '/images/gallery/reunion-damas.jpeg',
    type: 'special',
    attendees: '50+',
  },
];
