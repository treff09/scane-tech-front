import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ServiceItem, ValeurItem, DirectionItem, RealisationItem, ClientRefItem,
} from '../services/api.service';

const API = environment.apiUrl;

export interface MessageContactItem {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
  date_envoi: string;
  traite: boolean;
}

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  constructor(private http: HttpClient) {}

  // --- Services ---
  listServices(): Observable<ServiceItem[]> { return this.http.get<ServiceItem[]>(`${API}/services/`); }
  createService(data: Partial<ServiceItem>): Observable<ServiceItem> { return this.http.post<ServiceItem>(`${API}/services/`, data); }
  updateService(id: number, data: Partial<ServiceItem>): Observable<ServiceItem> { return this.http.patch<ServiceItem>(`${API}/services/${id}/`, data); }
  deleteService(id: number): Observable<void> { return this.http.delete<void>(`${API}/services/${id}/`); }

  // --- Valeurs ---
  listValeurs(): Observable<ValeurItem[]> { return this.http.get<ValeurItem[]>(`${API}/valeurs/`); }
  createValeur(data: Partial<ValeurItem>): Observable<ValeurItem> { return this.http.post<ValeurItem>(`${API}/valeurs/`, data); }
  updateValeur(id: number, data: Partial<ValeurItem>): Observable<ValeurItem> { return this.http.patch<ValeurItem>(`${API}/valeurs/${id}/`, data); }
  deleteValeur(id: number): Observable<void> { return this.http.delete<void>(`${API}/valeurs/${id}/`); }

  // --- Directions ---
  listDirections(): Observable<DirectionItem[]> { return this.http.get<DirectionItem[]>(`${API}/directions/`); }
  createDirection(data: Partial<DirectionItem>): Observable<DirectionItem> { return this.http.post<DirectionItem>(`${API}/directions/`, data); }
  updateDirection(id: number, data: Partial<DirectionItem>): Observable<DirectionItem> { return this.http.patch<DirectionItem>(`${API}/directions/${id}/`, data); }
  deleteDirection(id: number): Observable<void> { return this.http.delete<void>(`${API}/directions/${id}/`); }

  // --- Realisations (avec upload d'image) ---
  listRealisations(): Observable<RealisationItem[]> { return this.http.get<RealisationItem[]>(`${API}/realisations/`); }
  createRealisation(data: FormData): Observable<RealisationItem> { return this.http.post<RealisationItem>(`${API}/realisations/`, data); }
  updateRealisation(id: number, data: FormData): Observable<RealisationItem> { return this.http.patch<RealisationItem>(`${API}/realisations/${id}/`, data); }
  deleteRealisation(id: number): Observable<void> { return this.http.delete<void>(`${API}/realisations/${id}/`); }

  // --- Client references (avec upload de logo) ---
  listClients(): Observable<ClientRefItem[]> { return this.http.get<ClientRefItem[]>(`${API}/clients/`); }
  createClient(data: FormData): Observable<ClientRefItem> { return this.http.post<ClientRefItem>(`${API}/clients/`, data); }
  updateClient(id: number, data: FormData): Observable<ClientRefItem> { return this.http.patch<ClientRefItem>(`${API}/clients/${id}/`, data); }
  deleteClient(id: number): Observable<void> { return this.http.delete<void>(`${API}/clients/${id}/`); }

  // --- Messages de contact ---
  listMessages(): Observable<MessageContactItem[]> { return this.http.get<MessageContactItem[]>(`${API}/contact/`); }
  marquerTraite(id: number, traite: boolean): Observable<MessageContactItem> { return this.http.patch<MessageContactItem>(`${API}/contact/${id}/`, { traite }); }
  deleteMessage(id: number): Observable<void> { return this.http.delete<void>(`${API}/contact/${id}/`); }
}
