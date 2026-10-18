export interface PortfolioProject {
  slug: 'autohub' | 'techbox' | 'skillio' | 'tilda-auto' | 'tilda-vanlove';
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  stack: string[];
  path: string;
  accentClass: string;
  external?: boolean;
  preview?: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'autohub',
    title: 'AutoHub',
    category: 'Каталог автомобилей',
    summary:
      'Каталог подержанных автомобилей с поиском, фильтрами, галереей, карточками и избранным.',
    highlights: ['Фильтры с сохранением в URL', 'Галерея с клавиатурным управлением', 'Избранное'],
    stack: ['Angular', 'Signals', 'Tailwind CSS'],
    path: '/projects/autohub',
    accentClass: 'from-amber-500/30 to-zinc-900',
    preview: 'assets/project-previews/autohub.webp',
  },
  {
    slug: 'techbox',
    title: 'Techbox',
    category: 'Интернет-магазин электроники',
    summary:
      'Магазин техники с категориями, карточками товаров, характеристиками и сравнением до четырёх позиций.',
    highlights: ['Сравнение товаров', 'Таблица характеристик', 'Фильтры и сортировка'],
    stack: ['Angular', 'Router', 'localStorage'],
    path: '/projects/techbox',
    accentClass: 'from-orange-500/35 to-orange-950',
    preview: 'assets/project-previews/techbox.webp',
  },
  {
    slug: 'skillio',
    title: 'Skillio',
    category: 'Каталог специалистов и услуг',
    summary:
      'Маркетплейс исполнителей с категориями, поиском по навыкам, рейтингами и страницами специалистов.',
    highlights: ['Категории и поиск', 'Фильтры по цене и рейтингу', 'Страницы исполнителей'],
    stack: ['Angular', 'Forms', 'Router'],
    path: '/projects/skillio',
    accentClass: 'from-orange-400/35 to-orange-950',
    preview: 'assets/project-previews/skillio.webp',
  },
  {
    slug: 'tilda-auto',
    title: 'AutoDemo',
    category: 'Многостраничный сайт · Tilda',
    summary: 'Многостраничный автомобильный сайт с каталогом, заказом, формами и пользовательскими сценариями.',
    highlights: ['Каталог автомобилей', 'Заказ и формы', 'Несколько страниц'],
    stack: ['Tilda', 'Zero Block'],
    path: 'https://autodemo.tilda.ws/',
    accentClass: 'from-orange-400/35 to-orange-950',
    external: true,
    preview: 'assets/project-previews/autodemo.webp',
  },
  {
    slug: 'tilda-vanlove',
    title: 'VanLove',
    category: 'Одностраничный лендинг · Tilda',
    summary: 'Одностраничный лендинг мероприятия по знакомству с атмосферной подачей и понятным сценарием участия.',
    highlights: ['Промо мероприятия', 'Сценарий знакомства', 'Мобильная версия'],
    stack: ['Tilda', 'Zero Block'],
    path: 'https://vanlovedemko.tilda.ws/',
    accentClass: 'from-orange-400/35 to-orange-950',
    external: true,
    preview: 'assets/project-previews/vanlove.webp',
  },
];
