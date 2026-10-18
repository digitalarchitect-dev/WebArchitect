import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SITE } from '../../site.config';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-site-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './site-layout.html',
  host: { class: 'theme-portfolio block min-h-screen bg-bg text-text' },
})
export class SiteLayout {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
  protected readonly nav: NavItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Проекты', path: '/projects' },
    { label: 'Обо мне', path: '/about' },
    { label: 'Контакты', path: '/contact' },
  ];
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
