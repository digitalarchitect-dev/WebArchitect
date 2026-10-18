import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXPERTS } from '../../models/expert';
import { SkillioStore } from '../../services/skillio-store';

@Component({ selector: 'app-skillio-favorites', imports: [RouterLink], templateUrl: './favorites.html' })
export class SkillioFavorites {
  protected readonly store = inject(SkillioStore);
  protected readonly items = computed(() => EXPERTS.filter((expert) => this.store.favorites().includes(expert.id)));
}
