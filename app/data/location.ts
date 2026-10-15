// Contenido de la página de Ubicación.
// TODO: confirmar rutas, tiempos y referencias con la iglesia (vienen de Bolt).

export interface TransportStep {
  title: string;
  description: string;
}

export interface TransportOption {
  id: 'car' | 'bus';
  title: string;
  steps: TransportStep[];
}

export const transportOptions: TransportOption[] = [
  {
    id: 'car',
    title: 'En Vehículo Propio',
    steps: [
      {
        title: 'Desde San Salvador',
        description:
          'Tomar la Carretera Troncal del Norte (CA-4) hacia Chalatenango. Al llegar a la ciudad, seguir la señalización hacia Reubicación 1.',
      },
      {
        title: 'Estacionamiento',
        description:
          'Disponible en las instalaciones de la iglesia, con espacio para aproximadamente 50 vehículos.',
      },
      {
        title: 'Tiempo estimado',
        description: '1 hora 30 minutos desde San Salvador.',
      },
    ],
  },
  {
    id: 'bus',
    title: 'En Transporte Público',
    steps: [
      {
        title: 'Ruta 125',
        description:
          'Desde la Terminal de Oriente en San Salvador. Buses cada 30 minutos hacia Chalatenango.',
      },
      {
        title: 'Conexión local',
        description:
          'Desde el centro de Chalatenango, tomar el bus urbano hacia Reubicación 1 (cada 15 minutos).',
      },
      {
        title: 'Costo aproximado',
        description: '$2.50 desde San Salvador + $0.25 de conexión local.',
      },
    ],
  },
];

export const nearbyPlaces = [
  'Tienda La Bendición (50 m)',
  'Escuela Nacional de Reubicación 1 (100 m)',
  'Centro de Salud (200 m)',
  'Parque Central (300 m)',
];

export const landmarks = [
  'Edificio de dos plantas color blanco',
  'Cruz dorada en la fachada principal',
  'Portón verde con letrero visible',
  'Jardín frontal con flores',
];
