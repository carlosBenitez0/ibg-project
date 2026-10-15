// Ministerios de la iglesia.
// TODO: confirmar líderes, horarios y participantes con la iglesia (vienen de Bolt).

export type MinistryIcon =
  | 'book'
  | 'youth'
  | 'music'
  | 'children'
  | 'women'
  | 'outreach';

export interface Ministry {
  id: string;
  title: string;
  description: string;
  icon: MinistryIcon;
  /** Clases del degradado del icono */
  color: string;
  participants: string;
  schedule: string;
  leader: string;
  activities: string[];
}

export const ministries: Ministry[] = [
  {
    id: 'escuela-dominical',
    title: 'Escuela Dominical',
    description:
      'Enseñanza bíblica para todas las edades, desde niños hasta adultos mayores.',
    icon: 'book',
    color: 'from-gold-400 to-bronze-500',
    participants: '100+',
    schedule: 'Domingos 2:30 PM',
    leader: 'Hermana Ana Martínez',
    activities: ['Clases por edades', 'Estudios temáticos', 'Actividades didácticas'],
  },
  {
    id: 'jovenes',
    title: 'Grupo de Jóvenes',
    description:
      'Espacio para el crecimiento espiritual y el compañerismo de los jóvenes.',
    icon: 'youth',
    color: 'from-bronze-500 to-gold-400',
    participants: '40+',
    schedule: 'Sábados 6:00 PM',
    leader: 'Pastor David Rodríguez',
    activities: [
      'Estudios bíblicos',
      'Actividades recreativas',
      'Proyectos de servicio',
    ],
  },
  {
    id: 'alabanza',
    title: 'Ministerio de Alabanza',
    description:
      'Ministerio musical que dirige la adoración en nuestros servicios.',
    icon: 'music',
    color: 'from-navy-600 to-navy-400',
    participants: '25+',
    schedule: 'Viernes 7:00 PM',
    leader: 'Hermano Carlos Vásquez',
    activities: [
      'Ensayos semanales',
      'Presentaciones especiales',
      'Talleres musicales',
    ],
  },
  {
    id: 'infantil',
    title: 'Ministerio Infantil',
    description:
      'Actividades y enseñanza especialmente diseñadas para los más pequeños.',
    icon: 'children',
    color: 'from-gold-300 to-bronze-400',
    participants: '60+',
    schedule: 'Domingos 4:00 PM',
    leader: 'Hermana Lucía Hernández',
    activities: [
      'Escuela dominical infantil',
      'Actividades lúdicas',
      'Programas especiales',
    ],
  },
  {
    id: 'damas',
    title: 'Ministerio de Damas',
    description:
      'Encuentros de hermandad, oración y estudios bíblicos para mujeres.',
    icon: 'women',
    color: 'from-bronze-400 to-gold-400',
    participants: '30+',
    schedule: 'Jueves 7:00 PM',
    leader: 'Pastora María Elena López',
    activities: [
      'Estudios bíblicos',
      'Retiros espirituales',
      'Proyectos comunitarios',
    ],
  },
  {
    id: 'evangelismo',
    title: 'Evangelismo',
    description:
      'Misiones y actividades de alcance para compartir el amor de Cristo.',
    icon: 'outreach',
    color: 'from-navy-800 to-navy-600',
    participants: '20+',
    schedule: 'Sábados 2:00 PM',
    leader: 'Hermano Miguel Torres',
    activities: [
      'Evangelismo callejero',
      'Visitas domiciliares',
      'Campañas especiales',
    ],
  },
];

export const joinSteps = [
  {
    title: 'Ora y Reflexiona',
    description: 'Busca la dirección de Dios sobre dónde Él quiere que sirvas.',
  },
  {
    title: 'Habla con el Líder',
    description:
      'Contacta al líder del ministerio para conocer más detalles.',
  },
  {
    title: 'Comienza a Servir',
    description:
      'Únete a las actividades y comienza tu servicio en el Reino.',
  },
];
