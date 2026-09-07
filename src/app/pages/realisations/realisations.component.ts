import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { BilingualPipe } from '../../i18n/bilingual.pipe';
import { ApiService, RealisationItem, ClientRefItem } from '../../services/api.service';

@Component({
  selector: 'app-realisations',
  standalone: true,
  imports: [CommonModule, RevealDirective, TranslatePipe, BilingualPipe],
  templateUrl: './realisations.component.html',
  styleUrl: './realisations.component.css',
})
export class RealisationsComponent implements OnInit {
  realisations: RealisationItem[] = [];

  clients: ClientRefItem[] = [
    { id: 1, nom: 'CGRAE', logo: 'assets/images/cgrae.png', ordre: 1 },
    { id: 2, nom: 'Univelect', logo: 'assets/images/univelect.png', ordre: 2 },
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getRealisations().subscribe({
      next: (data) => { this.realisations = data ?? []; },
      error: () => {},
    });
    this.api.getClientReferences().subscribe({
      next: (data) => { if (data?.length) this.clients = data; },
      error: () => {},
    });
  }
}
