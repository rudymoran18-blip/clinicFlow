import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:3000/api/citas';

  constructor(private http: HttpClient) {}

  getCitas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCitaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCita(data: Cita): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateCita(id: number, data: Cita): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteCita(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
