import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../admin-api.service';
import { ServiceItem } from '../../services/api.service';

@Component({
  selector: 'app-services-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './services-admin.component.html',
  styleUrls: ['./services-admin.component.css', '../shared/admin.css'],
})
export class ServicesAdminComponent implements OnInit {
  items: ServiceItem[] = [];
  chargement = true;

  modalOuvert = false;
  edition: ServiceItem | null = null;
  form: FormGroup;
  enregistrement = false;
  erreur = '';

  constructor(private api: AdminApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      titre_en: [''],
      description_en: [''],
      icone: ['bolt'],
      ordre: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.chargement = true;
    this.api.listServices().subscribe({
      next: (data) => { this.items = data; this.chargement = false; },
      error: () => { this.chargement = false; },
    });
  }

  ouvrirCreation(): void {
    this.edition = null;
    this.form.reset({ icone: 'bolt', ordre: this.items.length + 1 });
    this.erreur = '';
    this.modalOuvert = true;
  }

  ouvrirEdition(item: ServiceItem): void {
    this.edition = item;
    this.form.reset({
      titre: item.titre, description: item.description,
      titre_en: item.titre_en || '', description_en: item.description_en || '',
      icone: item.icone, ordre: item.ordre,
    });
    this.erreur = '';
    this.modalOuvert = true;
  }

  fermer(): void {
    this.modalOuvert = false;
  }

  enregistrer(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.enregistrement = true;
    this.erreur = '';
    const data = this.form.value;
    const requete = this.edition
      ? this.api.updateService(this.edition.id, data)
      : this.api.createService(data);

    requete.subscribe({
      next: () => { this.enregistrement = false; this.modalOuvert = false; this.charger(); },
      error: () => { this.enregistrement = false; this.erreur = "Erreur lors de l'enregistrement."; },
    });
  }

  supprimer(item: ServiceItem): void {
    if (!confirm(`Supprimer le service "${item.titre}" ?`)) return;
    this.api.deleteService(item.id).subscribe(() => this.charger());
  }
}
