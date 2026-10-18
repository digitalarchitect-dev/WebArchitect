import { Component } from '@angular/core';
import { SITE } from '../../site.config';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
})
export class About {
  protected readonly site = SITE;
  protected readonly skills = [
    { group: 'Frontend', items: ['Angular', 'TypeScript', 'Signals', 'Tailwind CSS', 'RxJS'] },
    { group: 'Качество', items: ['Vitest', 'Playwright', 'Доступность WCAG', 'Lighthouse'] },
    { group: 'Инструменты', items: ['Git', 'Vite', 'Figma', 'REST API'] },
  ];
  protected readonly principles = [
    {
      title: 'Адаптивность',
      text: 'Каждый экран проверяю на телефоне, планшете и компьютере, а не только в одном размере.',
    },
    {
      title: 'Доступность',
      text: 'Навигация с клавиатуры, читаемый контраст, понятная разметка для скринридеров.',
    },
    {
      title: 'Скорость',
      text: 'Ленивая загрузка маршрутов и изображений, аккуратный размер бандла.',
    },
    {
      title: 'Понятный код',
      text: 'Компоненты, типизация и структура, в которой легко разобраться следующему разработчику.',
    },
  ];
}
