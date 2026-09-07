import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../admin-api.service';
import { RealisationItem } from '../../services/api.service';

@Component({
  selector: 'app-realisations-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './realisations-admin.component.html',
  styleUrls: ['../shared/admin.css'],
})
export class RealisationsAdminComponent implements OnInit {
  items: RealisationItem[] = [];
  chargement = true;
  modalOuvert = false;
  edition: RealisationItem | null = null;
  form: FormGroup;
  enregistrement = false;
  erreur = '';
  fichierChoisi: File | null = null;

  constructor(private api: AdminApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      client: [''],
      description: [''],
      titre_en: [''],
      description_en: [''],
      date: [''],
      ordre: [0, Validators.required],
    });
  }

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.chargement = true;
    this.api.listRealisations().subscribe({
      next: (data) => { this.items = data; this.chargement = false; },
      error: () => { this.chargement = false; },
    });
  }

  ouvrirCreation(): void {
    this.edition = null;
    this.fichierChoisi = null;
    this.form.reset({ ordre: this.items.length + 1 });
    this.erreur = '';
    this.modalOuvert = true;
  }

  ouvrirEdition(item: RealisationItem): void {
    this.edition = item;
    this.fichierChoisi = null;
    this.form.reset({
      titre: item.titre, client: item.client, description: item.description,
      titre_en: item.titre_en || '', description_en: item.description_en || '',
      date: item.date || '', ordre: item.ordre,
    });
    this.erreur = '';
    this.modalOuvert = true;
  }

  fermer(): void { this.modalOuvert = false; }

  onFichier(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fichierChoisi = input.files?.[0] ?? null;
  }

  enregistrer(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.enregistrement = true;
    this.erreur = '';

    const data = new FormData();
    Object.entries(this.form.value).forEach(([cle, val]) => {
      if (val !== null && val !== undefined && val !== '') data.append(cle, val as string);
    });
    if (this.fichierChoisi) data.append('image', this.fichierChoisi);

    const requete = this.edition
      ? this.api.updateRealisation(this.edition.id, data)
      : this.api.createRealisation(data);

    requete.subscribe({
      next: () => { this.enregistrement = false; this.modalOuvert = false; this.charger(); },
      error: () => { this.enregistrement = false; this.erreur = "Erreur lors de l'enregistrement."; },
    });
  }

  supprimer(item: RealisationItem): void {
    if (!confirm(`Supprimer "${item.titre}" ?`)) return;
    this.api.deleteRealisation(item.id).subscribe(() => this.charger());
  }
}
