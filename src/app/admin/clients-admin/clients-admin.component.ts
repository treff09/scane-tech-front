import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../admin-api.service';
import { ClientRefItem } from '../../services/api.service';

@Component({
  selector: 'app-clients-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clients-admin.component.html',
  styleUrls: ['../shared/admin.css'],
})
export class ClientsAdminComponent implements OnInit {
  items: ClientRefItem[] = [];
  chargement = true;
  modalOuvert = false;
  edition: ClientRefItem | null = null;
  form: FormGroup;
  enregistrement = false;
  erreur = '';
  fichierChoisi: File | null = null;

  constructor(private api: AdminApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      ordre: [0, Validators.required],
    });
  }

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.chargement = true;
    this.api.listClients().subscribe({
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

  ouvrirEdition(item: ClientRefItem): void {
    this.edition = item;
    this.fichierChoisi = null;
    this.form.reset({ nom: item.nom, ordre: item.ordre });
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
    if (!this.edition && !this.fichierChoisi) {
      this.erreur = 'Choisis un logo pour ce nouveau client.';
      return;
    }

    this.enregistrement = true;
    this.erreur = '';

    const data = new FormData();
    data.append('nom', this.form.value.nom);
    data.append('ordre', this.form.value.ordre);
    if (this.fichierChoisi) data.append('logo', this.fichierChoisi);

    const requete = this.edition
      ? this.api.updateClient(this.edition.id, data)
      : this.api.createClient(data);

    requete.subscribe({
      next: () => { this.enregistrement = false; this.modalOuvert = false; this.charger(); },
      error: () => { this.enregistrement = false; this.erreur = "Erreur lors de l'enregistrement."; },
    });
  }

  supprimer(item: ClientRefItem): void {
    if (!confirm(`Supprimer le logo "${item.nom}" ?`)) return;
    this.api.deleteClient(item.id).subscribe(() => this.charger());
  }
}
