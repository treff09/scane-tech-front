import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SplashComponent } from './components/splash/splash.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { routeFadeAnimation } from './route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SplashComponent, CookieConsentComponent],
  templateUrl: './app.component.html',
  animations: [routeFadeAnimation],
})
export class AppComponent {
  showSplash = true;
  // L'interface d'administration a son propre habillage (barre laterale) :
  // on masque le header/footer/splash/bandeau cookies du site public dessus.
  estAdmin = false;

  constructor(private router: Router) {
    this.estAdmin = this.router.url.startsWith('/admin');
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.estAdmin = e.urlAfterRedirects.startsWith('/admin');
      });
  }

  onSplashFinished(): void {
    this.showSplash = false;
  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return outlet?.activatedRouteData?.['animation'];
  }
}
