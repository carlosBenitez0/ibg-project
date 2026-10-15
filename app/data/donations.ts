// Contenido de la página de Donaciones.
// Las cuentas bancarias y el enlace de PayPal viven en constants/church.ts.

export type DonationPurposeId = 'offering' | 'missions' | 'construction';

export interface DonationPurpose {
  id: DonationPurposeId;
  title: string;
  description: string;
}

export const donationPurposes: DonationPurpose[] = [
  {
    id: 'offering',
    title: 'Ofrenda General',
    description:
      'Apoya las operaciones generales de la iglesia y sus ministerios.',
  },
  {
    id: 'missions',
    title: 'Misiones',
    description: 'Contribuye a nuestros esfuerzos evangelísticos y misioneros.',
  },
  {
    id: 'construction',
    title: 'Construcción',
    description: 'Ayuda con mejoras y expansión de nuestras instalaciones.',
  },
];

/** Montos sugeridos en USD */
export const predefinedAmounts = [10, 25, 50, 100];

export const MAX_DONATION_AMOUNT = 10_000;

export const donationImpact = [
  {
    id: 'ministries',
    title: 'Ministerios Locales',
    description: 'Apoyas programas que bendicen a familias en Chalatenango.',
  },
  {
    id: 'evangelism',
    title: 'Evangelismo',
    description: 'Permites que más personas conozcan el amor de Cristo.',
  },
  {
    id: 'infrastructure',
    title: 'Infraestructura',
    description:
      'Contribuyes al mantenimiento y mejora de nuestras instalaciones.',
  },
] as const;
