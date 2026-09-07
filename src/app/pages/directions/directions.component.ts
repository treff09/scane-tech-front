import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { BilingualPipe } from '../../i18n/bilingual.pipe';
import { ApiService, DirectionItem } from '../../services/api.service';

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [CommonModule, RevealDirective, TranslatePipe, BilingualPipe],
  templateUrl: './directions.component.html',
  styleUrl: './directions.component.css',
})
export class DirectionsComponent implements OnInit {
  directions: DirectionItem[] = [
    {
      id: 1, ordre: 1, nom: 'direction.operations.nom',
      sous_titre: 'direction.operations.sousTitre',
      description: 'direction.operations.description',
    },
    {
      id: 2, ordre: 2, nom: 'direction.qhse.nom',
      sous_titre: 'direction.qhse.sousTitre',
      description: 'direction.qhse.description',
    },
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getDirections().subscribe({
      next: (data) => { if (data?.length) this.directions = data; },
      error: () => {},
    });
  }
}
