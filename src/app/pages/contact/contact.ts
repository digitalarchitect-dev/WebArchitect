import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SITE } from '../../site.config';

type SubmitState = 'idle' | 'sending' | 'sent';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly site = SITE;
  protected readonly state = signal<SubmitState>('idle');

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  protected readonly sending = computed(() => this.state() === 'sending');

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.state.set('sending');
    setTimeout(() => {
      this.state.set('sent');
      this.form.reset();
    }, 800);
  }

  protected reset(): void {
    this.state.set('idle');
  }
}
