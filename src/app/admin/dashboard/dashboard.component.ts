import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../admin-api.service';

interface Carte {
  titre: string;
  lien: string;
  compte: number;
  icone: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  cartes: Carte[] = [
    { titre: 'Services', lien: '/admin/services', compte: 0, icone: '⚡' },
    { titre: 'Valeurs', lien: '/admin/valeurs', compte: 0, icone: '★' },
    { titre: 'Nos directions', lien: '/admin/directions', compte: 0, icone: '⌂' },
    { titre: 'Réalisations', lien: '/admin/realisations', compte: 0, icone: '▤' },
    { titre: 'Logos clients', lien: '/admin/clients', compte: 0, icone: '◈' },
    { titre: 'Messages reçus', lien: '/admin/messages', compte: 0, icone: '✉' },
  ];

  messagesNonTraites = 0;

  constructor(private api: AdminApiService) {}

  ngOnInit(): void {
    this.api.listServices().subscribe((d) => (this.cartes[0].compte = d.length));
    this.api.listValeurs().subscribe((d) => (this.cartes[1].compte = d.length));
    this.api.listDirections().subscribe((d) => (this.cartes[2].compte = d.length));
    this.api.listRealisations().subscribe((d) => (this.cartes[3].compte = d.length));
    this.api.listClients().subscribe((d) => (this.cartes[4].compte = d.length));
    this.api.listMessages().subscribe((d) => {
      this.cartes[5].compte = d.length;
      this.messagesNonTraites = d.filter((m) => !m.traite).length;
    });
  }
}
