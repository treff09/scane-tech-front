import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { apiKeyInterceptor } from './services/api-key.interceptor';
import { authInterceptor } from './admin/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([apiKeyInterceptor, authInterceptor])),
    provideRouter(routes),
    provideAnimations(),
  ],
};
