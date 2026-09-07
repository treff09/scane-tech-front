import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_BASE = environment.apiUrl;

export interface ServiceItem {
  id: number;
  titre: string;
  description: string;
  titre_en?: string;
  description_en?: string;
  icone: string;
  image: string | null;
  ordre: number;
}

export interface ValeurItem {
  id: number;
  titre: string;
  description: string;
  titre_en?: string;
  description_en?: string;
  ordre: number;
}

export interface DirectionItem {
  id: number;
  nom: string;
  sous_titre: string;
  description: string;
  nom_en?: string;
  sous_titre_en?: string;
  description_en?: string;
  ordre: number;
}

export interface RealisationItem {
  id: number;
  titre: string;
  client: string;
  description: string;
  titre_en?: string;
  description_en?: string;
  image: string | null;
  date: string | null;
  ordre: number;
}

export interface ContactPayload {
  nom: string;
  email: string;
  telephone?: string;
  sujet?: string;
  message: string;
}

export interface ClientRefItem {
  id: number;
  nom: string;
  logo: string;
  ordre: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${API_BASE}/services/`);
  }

  getValeurs(): Observable<ValeurItem[]> {
    return this.http.get<ValeurItem[]>(`${API_BASE}/valeurs/`);
  }

  getDirections(): Observable<DirectionItem[]> {
    return this.http.get<DirectionItem[]>(`${API_BASE}/directions/`);
  }

  getRealisations(): Observable<RealisationItem[]> {
    return this.http.get<RealisationItem[]>(`${API_BASE}/realisations/`);
  }

  getClientReferences(): Observable<ClientRefItem[]> {
    return this.http.get<ClientRefItem[]>(`${API_BASE}/clients/`);
  }

  sendContactMessage(payload: ContactPayload): Observable<ContactPayload> {
    return this.http.post<ContactPayload>(`${API_BASE}/contact/`, payload);
  }
}
