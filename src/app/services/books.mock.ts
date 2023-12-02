import { Book } from '@interfaces/book.interface';
import { DemiCardConfig } from 'demiurge';

export const MOCK_BOOKS: DemiCardConfig<Book>[] = [
  {
    id: '01',
    title: '1984',
    description: 'Continue reading ...',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '01',
      title: '1984',
      author: 'George Orwell',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
        porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
        mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
        Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
        Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
        vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
        tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
        Suspendisse eget maximus ante.`,
      genres: ['distopic', 'classic'],
    },
  },
  {
    id: '02',
    title: 'Un mundo feliz',
    description: 'Novela distopica',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '02',
      title: 'Un mundo feliz',
      author: 'Aldous Huxley',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['distopic', 'adventure', 'classic'],
    },
  },
  {
    id: '03',
    title: 'Snow Crash',
    description: 'Cyberpunk',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '03',
      title: 'Snow Crash',
      author: 'Neal Stephenson',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['distopic', 'adventure', 'classic', 'cyberpunk'],
    },
  },
  {
    id: '04',
    title: 'Eragon',
    description: 'Fantasia',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '04',
      title: 'Eragon',
      author: 'Christopher Paolini',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['fantasy', 'adventure'],
    },
  },
  {
    id: '05',
    title: 'Madrid Zombie',
    description: 'Novela Interactiva',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '05',
      title: 'Madrid Zombie',
      author: 'Bruno Piqué',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['apocalyptic', 'adventure', 'zombies', 'terror', 'horror'],
    },
  },
  {
    id: '06',
    title: 'Cisne Negro',
    description: 'Ensayo',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '06',
      title: 'Cisne Negro',
      author: 'Nassim Nicholas Taleb',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['economy', 'philosophy', 'classic'],
    },
  },
  {
    id: '07',
    title: 'Economia Basica',
    description: 'Ensayo',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '07',
      title: 'Economia Basica',
      author: 'Thomas Sowell',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['economy', 'classic'],
    },
  },
  {
    id: '08',
    title: 'Lean Startup',
    description: 'Ensayo',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '08',
      title: 'Lean Startup',
      author: 'Eric Ries',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['economy', 'management', 'startup', 'classic'],
    },
  },
  {
    id: '09',
    title: 'Gambito de Caballo',
    description: 'Novela',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '09',
      title: 'Gambito de Caballo',
      author: 'William Faulkner',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['intelectual', 'adventure', 'noir', 'suspense'],
    },
  },
  {
    id: '10',
    title: 'Fahrenheit 451',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    description: 'Distopía',
    data: {
      id: '10',
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['distopic', 'adventure', 'classic'],
    },
  },
  {
    id: '11',
    title: 'Blade Runner',
    description: 'Cyberpunk',
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
    data: {
      id: '11',
      title: 'Blade Runner',
      author: 'Philip K. Dick',
      cover:
        'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      vestibulum finibus nisl id interdum. Curabitur viverra, lectus at
      porttitor scelerisque, augue quam tincidunt tellus, vel varius nulla
      mauris ut ex. Ut sem leo, laoreet in leo at, facilisis cursus odio.
      Nullam ac sapien felis. Sed hendrerit quis erat egestas sollicitudin.
      Curabitur sit amet volutpat elit. Ut at enim accumsan, laoreet ex sed,
      vehicula nibh. Mauris sapien elit, auctor tincidunt condimentum in,
      tristique vitae eros. Proin cursus vestibulum urna non tincidunt.
      Suspendisse eget maximus ante.`,
      genres: ['distopic', 'adventure', 'classic', 'cyberpunk'],
    },
  },
];
