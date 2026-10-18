import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';

export interface PhotoCredit {
  file: string;
  source: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
}

type Manifest = Record<string, PhotoCredit[]>;

@Component({
  selector: 'app-photo-credits',
  templateUrl: './photo-credits.html',
})
export class PhotoCredits {
  protected readonly manifest = httpResource<Manifest>(() => 'assets/cars/attribution.json');
  protected readonly credits = computed(() =>
    Object.values(this.manifest.value() ?? {})
      .flat()
      .sort((a, b) => a.title.localeCompare(b.title, 'en')),
  );
}
