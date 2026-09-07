import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApiService, MessageContactItem } from '../admin-api.service';

@Component({
  selector: 'app-messages-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages-admin.component.html',
  styleUrls: ['../shared/admin.css', './messages-admin.component.css'],
})
export class MessagesAdminComponent implements OnInit {
  items: MessageContactItem[] = [];
  chargement = true;
  ouvert: number | null = null;

  constructor(private api: AdminApiService) {}

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.chargement = true;
    this.api.listMessages().subscribe({
      next: (data) => { this.items = data; this.chargement = false; },
      error: () => { this.chargement = false; },
    });
  }

  toggleOuvert(id: number): void {
    this.ouvert = this.ouvert === id ? null : id;
  }

  marquerTraite(item: MessageContactItem, event: Event): void {
    event.stopPropagation();
    this.api.marquerTraite(item.id, !item.traite).subscribe(() => {
      item.traite = !item.traite;
    });
  }

  supprimer(item: MessageContactItem, event: Event): void {
    event.stopPropagation();
    if (!confirm('Supprimer ce message ?')) return;
    this.api.deleteMessage(item.id).subscribe(() => this.charger());
  }
}
