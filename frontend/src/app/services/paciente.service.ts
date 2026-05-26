import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:3000/api/pacientes';

  constructor(private http: HttpClient) {}

  getPacientes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPacienteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPaciente(data: Paciente): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updatePaciente(id: number, data: Paciente): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deletePaciente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
