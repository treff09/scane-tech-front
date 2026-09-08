import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApiService, MessageContactItem } from '../admin-api.service';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-messages-admin',
  standalone: true,
  imports: [CommonModule, PaginationComponent, ConfirmDialogComponent],
  templateUrl: './messages-admin.component.html',
  styleUrls: ['../shared/admin.css', './messages-admin.component.css'],
})
export class MessagesAdminComponent implements OnInit {
  items: MessageContactItem[] = [];
  chargement = true;
  ouvert: number | null = null;
  page = 1;
  afficherTout = false;

  confirmSuppressionOuvert = false;
  itemASupprimer: MessageContactItem | null = null;
  suppressionEnCours = false;

  get itemsAffiches(): MessageContactItem[] {
    if (this.afficherTout) return this.items;
    const debut = (this.page - 1) * 5;
    return this.items.slice(debut, debut + 5);
  }

  constructor(private api: AdminApiService) {}

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.chargement = true;
    this.page = 1;
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
    this.itemASupprimer = item;
    this.confirmSuppressionOuvert = true;
  }

  confirmerSuppression(): void {
    if (!this.itemASupprimer) return;
    this.suppressionEnCours = true;
    this.api.deleteMessage(this.itemASupprimer.id).subscribe(() => {
      this.suppressionEnCours = false;
      this.fermerConfirmation();
      this.charger();
    });
  }

  fermerConfirmation(): void {
    this.confirmSuppressionOuvert = false;
    this.itemASupprimer = null;
  }
}
