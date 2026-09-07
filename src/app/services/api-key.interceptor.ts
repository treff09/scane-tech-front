import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Ajoute automatiquement le token API a chaque requete envoyee vers le
// backend Django (uniquement vers apiUrl, pas vers d'autres domaines
// eventuels comme Google Maps).
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.apiUrl)) {
    req = req.clone({
      setHeaders: { 'X-API-Key': environment.apiToken },
    });
  }
  return next(req);
};
