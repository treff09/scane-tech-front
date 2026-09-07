import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { BilingualPipe } from '../../i18n/bilingual.pipe';
import { LanguageService } from '../../i18n/language.service';
import { ApiService, ValeurItem } from '../../services/api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective, TranslatePipe, BilingualPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  valeurs: ValeurItem[] = [
    { id: 1, titre: 'valeur.fiabilite.titre', description: 'valeur.fiabilite.description', ordre: 1 },
    { id: 2, titre: 'valeur.respect.titre', description: 'valeur.respect.description', ordre: 2 },
    { id: 3, titre: 'valeur.expertise.titre', description: 'valeur.expertise.description', ordre: 3 },
  ];

  // La video ne demarre qu'au clic, pour ne pas alourdir le chargement de la page.
  videoLancee = false;

  constructor(private api: ApiService, public lang: LanguageService) {}

  // Bascule automatiquement vers la version anglaise de la video quand EN
  // est selectionne. Depose le fichier "presentation-scane-tech-en.mp4"
  // dans src/assets/images/ pour que ca fonctionne (voir LISEZ-MOI.txt).
  get videoSrc(): string {
    return this.lang.lang() === 'en'
      ? 'assets/images/presentation-scane-tech-en.mp4'
      : 'assets/images/presentation-scane-tech.mp4';
  }

  lancerVideo(): void {
    this.videoLancee = true;
  }

  ngOnInit(): void {
    this.api.getValeurs().subscribe({
      next: (data) => { if (data?.length) this.valeurs = data; },
      error: () => {},
    });
  }
}
