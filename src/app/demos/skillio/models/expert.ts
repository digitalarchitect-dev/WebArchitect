export interface Expert {
  id: string;
  name: string;
  initials: string;
  role: string;
  category: string;
  location: string;
  bio: string;
  rating: number;
  reviews: number;
  projects: number;
  hourlyRate: number;
  available: boolean;
  accent: string;
  tags: string[];
  responseTime: string;
  image: string;
}

export interface ExpertReview {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export const CATEGORIES = ['Все категории', 'Дизайн', 'Разработка', 'Маркетинг', 'Тексты', 'Фото и видео'];

export const EXPERTS: Expert[] = [
  {
    id: 'anna-morozova', name: 'Анна Морозова', initials: 'АМ', role: 'UX/UI дизайнер', category: 'Дизайн',
    location: 'Москва', bio: 'Проектирую понятные цифровые продукты: от первого прототипа до аккуратной дизайн-системы.',
    rating: 5, reviews: 48, projects: 72, hourlyRate: 2500, available: true, accent: 'from-rose-300 to-orange-200', tags: ['Figma', 'UX-исследования', 'Web'], responseTime: 'отвечает 20 минут', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=480&h=480&fit=crop&crop=faces',
  },
  {
    id: 'maxim-volkov', name: 'Максим Волков', initials: 'МВ', role: 'Frontend-разработчик', category: 'Разработка',
    location: 'Санкт-Петербург', bio: 'Собираю быстрые интерфейсы на Angular и TypeScript. Люблю чистую архитектуру и детали.',
    rating: 4.9, reviews: 36, projects: 54, hourlyRate: 3200, available: true, accent: 'from-cyan-300 to-blue-200', tags: ['Angular', 'TypeScript', 'API'], responseTime: 'отвечает 1 час', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=480&h=480&fit=crop&crop=faces',
  },
  {
    id: 'sofia-lebedeva', name: 'София Лебедева', initials: 'СЛ', role: 'Контент-стратег', category: 'Тексты',
    location: 'Казань', bio: 'Помогаю брендам говорить человеческим языком и превращать контент в понятный путь к покупке.',
    rating: 4.8, reviews: 29, projects: 41, hourlyRate: 1800, available: true, accent: 'from-amber-300 to-yellow-100', tags: ['Стратегия', 'Копирайтинг', 'Tone of voice'], responseTime: 'отвечает сегодня', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=480&h=480&fit=crop&crop=faces',
  },
  {
    id: 'ilya-sokolov', name: 'Илья Соколов', initials: 'ИС', role: 'Performance-маркетолог', category: 'Маркетинг',
    location: 'Екатеринбург', bio: 'Настраиваю рекламу и аналитику для роста заявок. Показываю цифры и объясняю решения.',
    rating: 4.9, reviews: 22, projects: 38, hourlyRate: 2800, available: false, accent: 'from-violet-300 to-indigo-200', tags: ['Контекст', 'Аналитика', 'Воронки'], responseTime: 'отвечает за 3 часа', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=480&h=480&fit=crop&crop=faces',
  },
  {
    id: 'marina-orlova', name: 'Марина Орлова', initials: 'МО', role: 'Фотограф предметной съёмки', category: 'Фото и видео',
    location: 'Москва', bio: 'Снимаю продукты так, чтобы их хотелось рассмотреть ближе. Студия и продакшн под ключ.',
    rating: 5, reviews: 17, projects: 31, hourlyRate: 3500, available: true, accent: 'from-emerald-300 to-teal-100', tags: ['Предметная съёмка', 'Lightroom', 'Видео'], responseTime: 'отвечает за 2 часа', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=480&h=480&fit=crop&crop=faces',
  },
  {
    id: 'kirill-ustinov', name: 'Кирилл Устинов', initials: 'КУ', role: 'Fullstack-разработчик', category: 'Разработка',
    location: 'Новосибирск', bio: 'Разрабатываю сервисы, которые легко поддерживать: frontend, backend и интеграции в одном процессе.',
    rating: 4.7, reviews: 19, projects: 27, hourlyRate: 2900, available: true, accent: 'from-sky-300 to-indigo-100', tags: ['React', 'Node.js', 'PostgreSQL'], responseTime: 'отвечает за 40 минут', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=480&fit=crop&crop=faces',
  },
  {
    id: 'daria-krylova', name: 'Дарья Крылова', initials: 'ДК', role: 'Бренд-дизайнер', category: 'Дизайн',
    location: 'Нижний Новгород', bio: 'Создаю выразительные айдентики и визуальные системы для продуктов, которые хотят запомниться.',
    rating: 4.9, reviews: 31, projects: 46, hourlyRate: 2300, available: true, accent: 'from-fuchsia-300 to-pink-100', tags: ['Айдентика', 'Логотипы', 'Брендинг'], responseTime: 'отвечает сегодня', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=480&h=480&fit=crop&crop=faces',
  },
  {
    id: 'roman-belov', name: 'Роман Белов', initials: 'РБ', role: 'Видеограф', category: 'Фото и видео',
    location: 'Сочи', bio: 'Снимаю живые истории для брендов и команд. От идеи и сценария до готового ролика.',
    rating: 4.8, reviews: 14, projects: 24, hourlyRate: 3000, available: false, accent: 'from-orange-300 to-red-100', tags: ['Съёмка', 'Монтаж', 'Reels'], responseTime: 'отвечает за 1 день', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=480&h=480&fit=crop&crop=faces',
  },
];

export const REVIEWS: Record<string, ExpertReview[]> = {
  'anna-morozova': [
    { author: 'Мария К.', date: '12 мая 2024', rating: 5, text: 'Анна быстро разобралась в задаче и собрала прототип, который сразу показали команде. Очень внимательна к деталям.' },
    { author: 'Алексей Р.', date: '28 апреля 2024', rating: 5, text: 'Понравилось, что Анна объясняет решения и не пропадает после передачи макетов.' },
  ],
  'maxim-volkov': [
    { author: 'Никита С.', date: '4 июня 2024', rating: 5, text: 'Максим аккуратно подключил API и оставил понятную документацию. Сроки выдержал.' },
    { author: 'Ольга Т.', date: '19 мая 2024', rating: 4.8, text: 'Сильный разработчик, спокойно работает с меняющимися требованиями.' },
  ],
};
