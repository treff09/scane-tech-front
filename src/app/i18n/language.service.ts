import { Injectable, signal } from '@angular/core';
import { Lang, TRANSLATIONS } from './translations';

const STORAGE_KEY = 'scane-tech-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  // Signal reactif : tous les composants et le pipe "t" se mettent a jour
  // automatiquement quand la langue change.
  lang = signal<Lang>(this.getInitialLang());

  private getInitialLang(): Lang {
    if (typeof window === 'undefined') return 'fr';
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved === 'en' ? 'en' : 'fr';
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }

  toggle(): void {
    this.setLang(this.lang() === 'fr' ? 'en' : 'fr');
  }

  translate(key: string): string {
    const dict = TRANSLATIONS[this.lang()];
    // Si la cle n'existe pas (ex: contenu dynamique venant de l'API Django,
    // qui reste en francais tant que le backend n'est pas lui-meme bilingue),
    // on affiche le texte tel quel plutot qu'une cle brute illisible.
    return dict[key] ?? key;
  }
}
