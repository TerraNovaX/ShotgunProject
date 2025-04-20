export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  is_premium: boolean;
  created_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type EventParticipant = {
  user_id: string;
  event_id: string;
  registered_at: string;
};

export const allUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
];

export const eventParticipants: EventParticipant[] = [
  { user_id: '1', event_id: '1', registered_at: '2025-04-10T12:00:00' },
  { user_id: '2', event_id: '2', registered_at: '2025-04-12T14:00:00' },
];

export const allEvents: Event[] = [
  {
    id: '1',
    title: 'Concert électro',
    description: 'Une soirée électro avec les meilleurs DJ du moment.',
    date: '2025-04-20T21:00:00',
    location: 'Paris - Bataclan',
    category: 'Musique',
    is_premium: true,
    created_at: '2025-04-10T12:00:00',
  },
  {
    id: '2',
    title: 'Festival de jazz',
    description: '3 jours de concerts jazz en plein air.',
    date: '2025-05-01T18:00:00',
    location: 'Marseille - Vieux Port',
    category: 'Festival',
    is_premium: false,
    created_at: '2025-04-20T10:00:00',
  },
  {
    id: '3',
    title: 'Soirée étudiante',
    description: 'Viens fêter la fin des partiels avec nous !',
    date: '2025-04-21T16:00:00',
    location: 'Lyon - Le Sucre',
    category: 'Soirée',
    is_premium: false,
    created_at: '2025-04-13T09:00:00',
  },
  {
    id: '4',
    title: 'Anniversaire de Lola',
    description: 'Viens fêter les 25 ans de Lola ',
    date: '2025-05-10T19:30:00',
    location: 'Toulouse - Chez Lola',
    category: 'Privé',
    is_premium: false,
    created_at: '2025-04-14T11:30:00',
  },
  {
    id: '5',
    title: 'Marathon de Bordeaux',
    description: '42km à travers les rues de Bordeaux.',
    date: '2025-06-02T08:00:00',
    location: 'Bordeaux - Quais',
    category: 'Sport',
    is_premium: false,
    created_at: '2025-04-15T14:20:00',
  },
  {
    id: '6',
    title: 'Apéro rooftop',
    description: 'DJ, cocktails et sunset ',
    date: '2025-04-30T18:30:00',
    location: 'Nice - Roof by the Sea',
    category: 'Soirée',
    is_premium: true,
    created_at: '2025-04-10T18:00:00',
  },
  {
    id: '7',
    title: 'Projection film en plein air',
    description: 'Ciné sous les étoiles avec popcorn offert !',
    date: '2025-07-15T21:30:00',
    location: 'Nantes - Parc du Grand Blottereau',
    category: 'Cinéma',
    is_premium: false,
    created_at: '2025-04-09T17:00:00',
  },
  {
    id: '8',
    title: 'Tournoi de basket 3v3',
    description: 'Forme ton équipe et viens gagner la coupe ',
    date: '2025-05-20T10:00:00',
    location: 'Lille - Gymnase Municipal',
    category: 'Sport',
    is_premium: false,
    created_at: '2025-04-11T15:45:00',
  },
  {
    id: '9',
    title: 'Fête de la musique',
    description: 'Musique gratuite dans toutes les rues !',
    date: '2025-06-21T12:00:00',
    location: 'Dans toute la France',
    category: 'Musique',
    is_premium: false,
    created_at: '2025-04-01T09:00:00',
  },
  {
    id: '10',
    title: 'Atelier de cuisine',
    description: 'Découvre les bases de la cuisine thaïlandaise ',
    date: '2025-05-05T15:00:00',
    location: 'Montpellier - La Fabrique',
    category: 'Atelier',
    is_premium: true,
    created_at: '2025-04-07T11:00:00',
  },
];
