// Datos de contacto e información institucional de la iglesia.
// Fuente única para todas las páginas: si algo cambia, se cambia aquí.
// Los valores marcados con TODO vienen del prototipo de Bolt y deben
// confirmarse con la iglesia antes de publicar.

const MAP_QUERY = 'Reubicación 1, Chalatenango, El Salvador';

export const churchInfo = {
  name: 'Iglesia Bautista Getsemaní',
  shortName: 'IBG',
  address: {
    line1: 'Reubicación 1, Chalatenango',
    line2: 'El Salvador, Centroamérica',
  },
  // TODO: confirmar con la iglesia
  phones: {
    office: '+503 2335-1234',
    whatsapp: '+503 7890-5678',
    emergencies: '+503 9876-5432',
  },
  // TODO: confirmar con la iglesia
  emails: {
    general: 'info@getsemani.org.sv',
    pastoral: 'pastoral@getsemani.org.sv',
    youth: 'jovenes@getsemani.org.sv',
    donations: 'donaciones@getsemani.org.sv',
  },
  officeHours: [
    { days: 'Lunes a Viernes', hours: '8:00 AM - 5:00 PM' },
    { days: 'Sábados', hours: '8:00 AM - 12:00 PM' },
  ],
  map: {
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`,
  },
  // TODO: confirmar con la iglesia
  social: {
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
    tiktok: 'https://www.tiktok.com/',
  },
  // TODO: confirmar con la iglesia
  donations: {
    paypalUrl: 'https://www.paypal.com/',
    bankAccounts: [
      {
        bank: 'Banco Agrícola',
        accountNumber: '0000-0000-0000',
        accountType: 'Cuenta de Ahorros',
        holder: 'Iglesia Bautista Getsemaní',
      },
      {
        bank: 'Banco Cuscatlán',
        accountNumber: '0000-0000-0000',
        accountType: 'Cuenta Corriente',
        holder: 'Iglesia Bautista Getsemaní',
      },
    ],
  },
} as const;

/** Convierte un número con formato (+503 7890-5678) a solo dígitos. */
export const toDigits = (phone: string) => phone.replace(/\D/g, '');

/** Enlace `tel:` para un número con formato. */
export const telHref = (phone: string) => `tel:+${toDigits(phone)}`;

/** Enlace a WhatsApp con un mensaje opcional precargado. */
export const whatsappHref = (
  message?: string,
  phone: string = churchInfo.phones.whatsapp
) =>
  `https://wa.me/${toDigits(phone)}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
