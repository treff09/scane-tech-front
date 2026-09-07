import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealDirective } from '../../directives/reveal.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  form: FormGroup;
  envoiEnCours = false;
  envoiReussi = false;
  envoiEchoue = false;

  // Coordonnees exactes de l'agence (Les Cimes Immobilier, Marcory Potopoto).
  // Seul le point d'arrivee est fixe : chaque visiteur qui clique sur la carte
  // obtient son propre itineraire depuis sa position via Google Maps.
  mapUrl: SafeResourceUrl;

  constructor(private fb: FormBuilder, private api: ApiService, sanitizer: DomSanitizer) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      sujet: [''],
      message: ['', Validators.required],
    });

    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(
      'https://maps.google.com/maps?q=Les+Cimes+Immobilier+Marcory+Potopoto+Abidjan&hl=fr&z=17&output=embed'
    );
  }

  envoyer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.envoiEnCours = true;
    this.envoiReussi = false;
    this.envoiEchoue = false;

    this.api.sendContactMessage(this.form.value).subscribe({
      next: () => {
        this.envoiEnCours = false;
        this.envoiReussi = true;
        this.form.reset();
      },
      error: () => {
        this.envoiEnCours = false;
        this.envoiEchoue = true;
      },
    });
  }
}
