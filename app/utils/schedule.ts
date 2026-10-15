import type { WeeklyService } from '@/app/data/services';
import { churchInfo } from '@/app/constants/church';

export const CHURCH_TIME_ZONE = 'America/El_Salvador';

/**
 * Fecha cuyo reloj local coincide con la hora de El Salvador, para comparar
 * horarios sin importar la zona horaria del visitante.
 */
export const getChurchNow = (date: Date = new Date()) =>
  new Date(date.toLocaleString('en-US', { timeZone: CHURCH_TIME_ZONE }));

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/** ¿El servicio está ocurriendo ahora mismo? */
export const isServiceLive = (
  service: WeeklyService,
  durationMinutes: number,
  now: Date
) => {
  if (now.getDay() !== service.dayNumber) return false;
  const current = now.getHours() * 60 + now.getMinutes();
  const start = toMinutes(service.time);
  return current >= start && current < start + durationMinutes;
};

/** Próximo inicio del servicio (hoy si aún no empieza). */
export const getNextOccurrence = (service: WeeklyService, now: Date) => {
  const start = toMinutes(service.time);
  const current = now.getHours() * 60 + now.getMinutes();
  let daysAhead = (service.dayNumber - now.getDay() + 7) % 7;
  if (daysAhead === 0 && current >= start) daysAhead = 7;

  const next = new Date(now);
  next.setDate(now.getDate() + daysAhead);
  next.setHours(Math.floor(start / 60), start % 60, 0, 0);
  return next;
};

const pad = (value: number) => String(value).padStart(2, '0');

const formatCalendarDate = (date: Date) =>
  `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;

/** Enlace para crear un recordatorio semanal en Google Calendar. */
export const googleCalendarUrl = ({
  title,
  description,
  start,
  durationMinutes,
}: {
  title: string;
  description: string;
  start: Date;
  durationMinutes: number;
}) => {
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location: `${churchInfo.name}, ${churchInfo.address.line1}`,
    dates: `${formatCalendarDate(start)}/${formatCalendarDate(end)}`,
    ctz: CHURCH_TIME_ZONE,
    recur: 'RRULE:FREQ=WEEKLY',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
