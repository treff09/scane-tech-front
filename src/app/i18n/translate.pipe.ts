import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';

// Usage dans un template : {{ 'nav.accueil' | t }}
// Le pipe est "impur" pour se re-evaluer automatiquement au changement de langue.
@Pipe({ name: 't', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  private lang = inject(LanguageService);

  transform(key: string | null | undefined): string {
    if (!key) return '';
    return this.lang.translate(key);
  }
}
