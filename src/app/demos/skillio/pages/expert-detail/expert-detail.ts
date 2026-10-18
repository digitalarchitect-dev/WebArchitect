import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EXPERTS, REVIEWS, ExpertReview } from '../../models/expert';
import { SkillioStore } from '../../services/skillio-store';

@Component({ selector: 'app-skillio-expert-detail', imports: [FormsModule, RouterLink], templateUrl: './expert-detail.html' })
export class SkillioExpertDetail {
  protected readonly store = inject(SkillioStore);
  private readonly route = inject(ActivatedRoute);
  protected readonly name = signal('');
  protected readonly message = signal('');
  protected readonly phone = signal('');
  protected readonly email = signal('');
  protected readonly budget = signal('');
  protected readonly deadline = signal('');
  protected readonly reviewText = signal('');
  protected readonly reviewAuthor = signal('');
  protected readonly reviewRating = signal(5);
  protected readonly expert = computed(() => EXPERTS.find((item) => item.id === this.route.snapshot.paramMap.get('id')));
  protected readonly similar = computed(() => EXPERTS.filter((item) => item.category === this.expert()?.category && item.id !== this.expert()?.id).slice(0, 2));
  protected readonly reviews = computed(() => [...(REVIEWS[this.expert()?.id ?? ''] ?? []), ...(this.store.userReviews()[this.expert()?.id ?? ''] ?? [])]);

  protected submit(): void { if (this.name().trim() && this.message().trim() && this.phone().trim() && this.email().trim()) this.store.sendRequest(); }

  protected addReview(): void {
    if (!this.reviewAuthor().trim() || !this.reviewText().trim() || !this.expert()) return;
    const review: ExpertReview = { author: this.reviewAuthor().trim(), date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }), rating: this.reviewRating(), text: this.reviewText().trim() };
    this.store.addReview(this.expert()!.id, review); this.reviewAuthor.set(''); this.reviewText.set(''); this.reviewRating.set(5);
  }
}
