// Campañas evangelísticas y estadísticas de impacto.
// TODO: confirmar fechas, lugares y cifras con la iglesia (vienen de Bolt).

export interface OutreachCampaign {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: number;
  description: string;
  /** La primera imagen se muestra grande */
  images: string[];
  impact: string;
}

const img = (name: string) => `/images/gallery/${name}.jpeg`;

export const campaigns: OutreachCampaign[] = [
  {
    id: 'parque-central',
    title: 'Evangelismo en el Parque Central',
    date: '15 de Agosto, 2026',
    location: 'Parque Central, Chalatenango',
    participants: 25,
    description:
      'Compartimos el amor de Cristo con las familias que visitaban el parque.',
    images: [
      img('evangelismo-calle-1'),
      img('evangelismo-calle-2'),
      img('evangelismo-comunidad-1'),
    ],
    impact: '50+ personas alcanzadas, 8 decisiones por Cristo',
  },
  {
    id: 'casa-por-casa',
    title: 'Campaña Casa por Casa',
    date: '8 de Agosto, 2026',
    location: 'Reubicación 1',
    participants: 18,
    description:
      'Visitamos hogares llevando la Palabra de Dios y orando por las familias.',
    images: [
      img('evangelismo-comunidad-2'),
      img('evangelismo-comunidad-3'),
      img('evangelismo-calle-2'),
    ],
    impact:
      '80+ hogares visitados, 12 familias interesadas en estudios bíblicos',
  },
  {
    id: 'convivio-comunitario',
    title: 'Convivio Comunitario',
    date: '19 de Julio, 2026',
    location: 'Instalaciones de la iglesia',
    participants: 30,
    description:
      'Compartimos alimentos, alabanza y el mensaje de salvación con nuestros vecinos.',
    images: [img('convivio-3'), img('convivio-1'), img('convivio-2')],
    impact: '120+ personas atendidas, 20 decisiones por Cristo',
  },
  {
    id: 'jornada-exterior',
    title: 'Jornada de Alcance al Aire Libre',
    date: '28 de Junio, 2026',
    location: 'Reubicación 1, Chalatenango',
    participants: 20,
    description:
      'Actividades, oración y testimonio en las calles de nuestra comunidad.',
    images: [
      img('actividad-exterior-2'),
      img('actividad-exterior-1'),
      img('evangelismo-comunidad-1'),
    ],
    impact: '100+ personas impactadas, 15 decisiones por Cristo',
  },
  {
    id: 'evangelismo-juvenil',
    title: 'Evangelismo Juvenil',
    date: '30 de Mayo, 2026',
    location: 'Reubicación 1, Chalatenango',
    participants: 15,
    description:
      'Los jóvenes compartieron con otros jóvenes sobre el propósito de vida en Cristo.',
    images: [
      img('fogata-jovenes'),
      img('grupo-iglesia-1'),
      img('grupo-iglesia-2'),
    ],
    impact: '200+ jóvenes alcanzados, 25 interesados en el grupo juvenil',
  },
  {
    id: 'celebracion-familiar',
    title: 'Celebración Familiar',
    date: '18 de Abril, 2026',
    location: 'Instalaciones de la iglesia',
    participants: 40,
    description:
      'Una noche de celebración con las familias de la comunidad y un mensaje de esperanza.',
    images: [
      img('celebracion-2'),
      img('celebracion-1'),
      img('grupo-iglesia-1'),
    ],
    impact: '300+ personas participaron, 30 decisiones por Cristo',
  },
];

export type ImpactStatIcon = 'people' | 'heart' | 'map' | 'handshake';

export interface ImpactStat {
  icon: ImpactStatIcon;
  value: string;
  label: string;
  iconClassName?: string;
}

export const impactStats: ImpactStat[] = [
  { icon: 'people', value: '850+', label: 'Personas Alcanzadas' },
  {
    icon: 'heart',
    value: '138',
    label: 'Decisiones por Cristo',
    iconClassName: 'from-bronze-500 to-gold-400',
  },
  {
    icon: 'map',
    value: '12',
    label: 'Campañas Realizadas',
    iconClassName: 'from-navy-600 to-navy-400',
  },
  {
    icon: 'handshake',
    value: '45',
    label: 'Nuevos Miembros',
    iconClassName: 'from-navy-800 to-navy-600',
  },
];

export const evangelismTeam = [
  { icon: 'calendar', title: 'Reuniones', text: 'Sábados 2:00 PM' },
  { icon: 'people', title: 'Equipo', text: '20+ evangelistas activos' },
  { icon: 'heart', title: 'Requisitos', text: 'Corazón por las almas' },
] as const;
