import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { BilingualPipe } from '../../i18n/bilingual.pipe';
import { ApiService, ServiceItem, ClientRefItem } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, TranslatePipe, BilingualPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
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

  constructor(private api: ApiService) {}

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
}
