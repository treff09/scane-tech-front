import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuOuvert = false;
  logoPulse = false;

  constructor(private router: Router, public lang: LanguageService) {}

  ngOnInit(): void {
    // Petit rebond du logo a chaque retour sur la page d'accueil.
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (e.urlAfterRedirects === '/') {
          this.logoPulse = false;
          setTimeout(() => (this.logoPulse = true), 0);
        }
      });
  }

  toggleMenu(): void {
    this.menuOuvert = !this.menuOuvert;
  }
}
