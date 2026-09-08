import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../admin-api.service';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ValeurItem } from '../../services/api.service';

@Component({
  selector: 'app-valeurs-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent, ConfirmDialogComponent],
  templateUrl: './valeurs-admin.component.html',
  styleUrls: ['../shared/admin.css'],
})
export class ValeursAdminComponent implements OnInit {
  items: ValeurItem[] = [];
  chargement = true;
  page = 1;
  afficherTout = false;

  confirmSuppressionOuvert = false;
  itemASupprimer: ValeurItem | null = null;
  suppressionEnCours = false;

  get itemsAffiches(): ValeurItem[] {
    if (this.afficherTout) return this.items;
    const debut = (this.page - 1) * 5;
    return this.items.slice(debut, debut + 5);
  }
  modalOuvert = false;
  edition: ValeurItem | null = null;
  form: FormGroup;
  enregistrement = false;
  erreur = '';

  constructor(private api: AdminApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      titre_en: [''],
      description_en: [''],
      ordre: [0, Validators.required],
    });
  }

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.chargement = true;
    this.page = 1;
    this.api.listValeurs().subscribe({
      next: (data) => { this.items = data; this.chargement = false; },
      error: () => { this.chargement = false; },
    });
  }

  ouvrirCreation(): void {
    this.edition = null;
    this.form.reset({ ordre: this.items.length + 1 });
    this.erreur = '';
    this.modalOuvert = true;
  }

  ouvrirEdition(item: ValeurItem): void {
    this.edition = item;
    this.form.reset({
      titre: item.titre, description: item.description,
      titre_en: item.titre_en || '', description_en: item.description_en || '',
      ordre: item.ordre,
    });
    this.erreur = '';
    this.modalOuvert = true;
  }

  fermer(): void { this.modalOuvert = false; }

  enregistrer(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.enregistrement = true;
    this.erreur = '';
    const requete = this.edition
      ? this.api.updateValeur(this.edition.id, this.form.value)
      : this.api.createValeur(this.form.value);

    requete.subscribe({
      next: () => { this.enregistrement = false; this.modalOuvert = false; this.charger(); },
      error: () => { this.enregistrement = false; this.erreur = "Erreur lors de l'enregistrement."; },
    });
  }

  supprimer(item: ValeurItem): void {
    this.itemASupprimer = item;
    this.confirmSuppressionOuvert = true;
  }

  confirmerSuppression(): void {
    if (!this.itemASupprimer) return;
    this.suppressionEnCours = true;
    this.api.deleteValeur(this.itemASupprimer.id).subscribe(() => {
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
