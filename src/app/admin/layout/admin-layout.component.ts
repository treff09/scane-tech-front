import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  menuMobileOuvert = false;

  constructor(public auth: AuthService, private router: Router) {}

  deconnexion(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
