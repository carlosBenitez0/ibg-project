// Horario oficial de cultos semanales.
// Lo usan el hook del próximo servicio (Home), Ubicación, Eventos y Contacto.

export interface WeeklyService {
  /** 0 = Domingo … 6 = Sábado (igual que Date.getDay()) */
  dayNumber: number;
  day: string;
  /** Hora en formato 24 h, `HH:mm` */
  time: string;
  /** Texto corto para tarjetas, p. ej. "Domingo 4:00PM" */
  subtitle: string;
  description: string;
}

export const weeklyServices: WeeklyService[] = [
  {
    dayNumber: 0,
    day: 'Domingo',
    time: '16:00',
    subtitle: 'Domingo 4:00PM',
    description: 'Culto Principal',
  },
  {
    dayNumber: 2,
    day: 'Martes',
    time: '16:00',
    subtitle: 'Martes 4:00PM',
    description: 'Culto de Oración',
  },
  {
    dayNumber: 3,
    day: 'Miércoles',
    time: '17:00',
    subtitle: 'Miércoles 5:00PM',
    description: 'Culto de Célula de Hogar',
  },
  {
    dayNumber: 4,
    day: 'Jueves',
    time: '16:00',
    subtitle: 'Jueves 4:00PM',
    description: 'Culto de Estudio Bíblico',
  },
  {
    dayNumber: 6,
    day: 'Sábado',
    time: '16:00',
    subtitle: 'Sábado 4:00PM',
    description: 'Culto de General',
  },
  {
    dayNumber: 6,
    day: 'Sábado',
    time: '18:00',
    subtitle: 'Sábado 6:00PM',
    description: 'Culto de Jóvenes',
  },
];

/** Convierte `16:00` en `4:00 PM`. */
export const formatServiceTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
};

/** Servicios ordenados empezando por el domingo. */
export const servicesByWeekOrder = [...weeklyServices].sort(
  (a, b) => a.dayNumber - b.dayNumber || a.time.localeCompare(b.time)
);
