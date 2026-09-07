import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { DirectionsComponent } from './pages/directions/directions.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';
import { ContactComponent } from './pages/contact/contact.component';

import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { AdminLoginComponent } from './admin/login/login.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { ServicesAdminComponent } from './admin/services-admin/services-admin.component';
import { ValeursAdminComponent } from './admin/valeurs-admin/valeurs-admin.component';
import { DirectionsAdminComponent } from './admin/directions-admin/directions-admin.component';
import { RealisationsAdminComponent } from './admin/realisations-admin/realisations-admin.component';
import { ClientsAdminComponent } from './admin/clients-admin/clients-admin.component';
import { MessagesAdminComponent } from './admin/messages-admin/messages-admin.component';
import { authGuard } from './admin/auth/auth.guard';

export const routes: Routes = [
  // --- Site public (vraie navigation par URL, une page par section) ---
  { path: '', component: HomeComponent, data: { animation: 'accueil' } },
  { path: 'a-propos', component: AboutComponent, data: { animation: 'apropos' } },
  { path: 'services', component: ServicesComponent, data: { animation: 'services' } },
  { path: 'nos-directions', component: DirectionsComponent, data: { animation: 'directions' } },
  { path: 'realisations', component: RealisationsComponent, data: { animation: 'realisations' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'contact' } },

  // --- Interface d'administration ---
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'services', component: ServicesAdminComponent },
      { path: 'valeurs', component: ValeursAdminComponent },
      { path: 'directions', component: DirectionsAdminComponent },
      { path: 'realisations', component: RealisationsAdminComponent },
      { path: 'clients', component: ClientsAdminComponent },
      { path: 'messages', component: MessagesAdminComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];
