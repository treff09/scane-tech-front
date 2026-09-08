import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { CountUpDirective } from '../../directives/count-up.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { BilingualPipe } from '../../i18n/bilingual.pipe';
import { LanguageService } from '../../i18n/language.service';
import { ApiService, ServiceItem, ClientRefItem } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, CountUpDirective, TranslatePipe, BilingualPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('heroBg') heroBg?: ElementRef<HTMLElement>;

  services: ServiceItem[] = [
    { id: 1, ordre: 1, icone: 'bolt', image: null, titre: 'service.electricite.titre', description: 'service.electricite.description' },
    { id: 2, ordre: 2, icone: 'snowflake', image: null, titre: 'service.climatisation.titre', description: 'service.climatisation.description' },
    { id: 3, ordre: 3, icone: 'fire', image: null, titre: 'service.incendie.titre', description: 'service.incendie.description' },
  ];

  // Logos par defaut, remplaces par le contenu de l'admin Django des que disponible.
  clients: ClientRefItem[] = [
    { id: 1, nom: 'CGRAE', logo: 'assets/images/cgrae.png', ordre: 1 },
    { id: 2, nom: 'Univelect', logo: 'assets/images/univelect.png', ordre: 2 },
  ];

  constructor(private api: ApiService, public lang: LanguageService) {}

  // Decoupe le titre du hero en mots pour l'animer en cascade ("effet ecriture").
  get titreMots(): string[] {
    return this.lang.translate('hero.title').split(' ');
  }

  ngOnInit(): void {
    this.api.getServices().subscribe({
      next: (data) => { if (data?.length) this.services = data; },
      error: () => {},
    });
    this.api.getClientReferences().subscribe({
      next: (data) => { if (data?.length) this.clients = data; },
      error: () => {},
    });
  }

  // Leger effet de parallaxe : la photo de fond du hero se deplace un peu
  // moins vite que le scroll, ce qui donne une impression de profondeur.
  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.heroBg) return;
    const decalage = window.scrollY * 0.25;
    this.heroBg.nativeElement.style.transform = `translateY(${decalage}px)`;
  }
}
