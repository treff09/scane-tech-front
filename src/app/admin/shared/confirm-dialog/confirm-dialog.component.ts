import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() titre = 'Confirmer la suppression';
  @Input() message = 'Cette action est définitive et ne peut pas être annulée.';
  @Input() texteConfirmer = 'Supprimer';
  @Input() texteAnnuler = 'Annuler';
  @Input() enCours = false;

  @Output() confirmer = new EventEmitter<void>();
  @Output() annuler = new EventEmitter<void>();
}
