import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class AdminLoginComponent {
  form: FormGroup;
  enCours = false;
  erreur = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  connexion(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enCours = true;
    this.erreur = '';

    const { username, password } = this.form.value;
    this.auth.login(username, password).subscribe({
      next: () => {
        this.enCours = false;
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.enCours = false;
        this.erreur = err?.status === 401
          ? 'Identifiants incorrects.'
          : "Impossible de se connecter. Vérifiez que le serveur Django est bien lancé.";
      },
    });
  }
}
