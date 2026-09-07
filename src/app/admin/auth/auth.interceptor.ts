import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

// Ajoute l'en-tete "Authorization: Token ..." aux requetes vers l'API
// quand un admin est connecte. Necessaire pour les operations d'ecriture
// (creer/modifier/supprimer) depuis l'interface d'administration.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token && req.url.startsWith(environment.apiUrl)) {
    req = req.clone({
      setHeaders: { Authorization: `Token ${token}` },
    });
  }

  return next(req);
};
