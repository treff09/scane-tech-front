import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

const STORAGE_KEY = 'scane-tech-cookie-consent';

export interface CookiePrefs {
  necessaires: true;
  statistiques: boolean;
  publicitaires: boolean;
}

type Section = 'infos' | 'necessaires' | 'statistiques' | 'publicitaires';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.css',
})
export class CookieConsentComponent implements OnInit {
  visible = false;
  personnaliserOuvert = false;

  // Chaque section peut s'ouvrir/se fermer independamment, comme dans le modele fourni.
  ouvertes: Record<Section, boolean> = {
    infos: false,
    necessaires: false,
    statistiques: false,
    publicitaires: false,
  };

  statistiques = true;
  publicitaires = true;

  ngOnInit(): void {
    const enregistre = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!enregistre) {
      setTimeout(() => (this.visible = true), 300);
    }
  }

  toggleCustomize(): void {
    this.personnaliserOuvert = !this.personnaliserOuvert;
  }

  toggleSection(section: Section): void {
    this.ouvertes[section] = !this.ouvertes[section];
  }

  toutAccepter(): void {
    this.enregistrer({ necessaires: true, statistiques: true, publicitaires: true });
  }

  toutRefuser(): void {
    this.enregistrer({ necessaires: true, statistiques: false, publicitaires: false });
  }

  sauvegarder(): void {
    this.enregistrer({ necessaires: true, statistiques: this.statistiques, publicitaires: this.publicitaires });
  }

  private enregistrer(prefs: CookiePrefs): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    this.visible = false;
  }
}
