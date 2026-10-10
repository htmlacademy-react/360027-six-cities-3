import { Reviews } from '@/types/review';

export const reviews: Reviews = [
  {
    id: '1',
    date: '2019-04-24T12:00:00.000Z',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4,
  },
  {
    id: '2',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    comment:
      'Great location near the canals, the apartment was clean and the host was very helpful. Would definitely stay here again.',
    rating: 5,
  },
];
