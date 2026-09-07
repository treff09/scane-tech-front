import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { BilingualPipe } from '../../i18n/bilingual.pipe';
import { ApiService, ServiceItem } from '../../services/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective, TranslatePipe, BilingualPipe],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  services: ServiceItem[] = [
    { id: 1, ordre: 1, icone: 'bolt', image: null, titre: 'service.electricite.titre', description: 'service.electricite.description' },
    { id: 2, ordre: 2, icone: 'snowflake', image: null, titre: 'service.climatisation.titre', description: 'service.climatisation.description' },
    { id: 3, ordre: 3, icone: 'fire', image: null, titre: 'service.incendie.titre', description: 'service.incendie.description' },
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getServices().subscribe({
      next: (data) => { if (data?.length) this.services = data; },
      error: () => {},
    });
  }
}
