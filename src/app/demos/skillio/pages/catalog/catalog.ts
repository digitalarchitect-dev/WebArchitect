import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CATEGORIES, EXPERTS } from '../../models/expert';
import { SkillioStore } from '../../services/skillio-store';

@Component({ selector: 'app-skillio-catalog', imports: [FormsModule, RouterLink, DecimalPipe], templateUrl: './catalog.html' })
export class SkillioCatalog {
  protected readonly experts = EXPERTS;
  protected readonly categories = CATEGORIES;
  protected readonly category = signal('Все категории');
  protected readonly sort = signal('relevance');
  protected readonly query = signal('');
  protected readonly store = inject(SkillioStore);
  private readonly route = inject(ActivatedRoute);
  protected readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim(); const category = this.category();
    const items = this.experts.filter((expert) => (category === 'Все категории' || expert.category === category) && (!q || [expert.name, expert.role, expert.category, expert.location, ...expert.tags].join(' ').toLowerCase().includes(q)));
    return [...items].sort((a, b) => this.sort() === 'price' ? a.hourlyRate - b.hourlyRate : this.sort() === 'rating' ? b.rating - a.rating : Number(b.available) - Number(a.available));
  });
  constructor() { this.route.queryParamMap.subscribe((params) => this.query.set(params.get('q') ?? '')); }
}
