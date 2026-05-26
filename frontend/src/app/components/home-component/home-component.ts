import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {


  lstCitas: any[] = [];
  fechaActual: Date = new Date();
  cantidadCitasHoy: number = 0;
  cantidadPacientes: number = 0;

  constructor(private router: Router,
              private citasService: CitaService,
              private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.getCitas();
    this.getPacientes();
  }

  getCitas(): void {
    this.citasService.getCitas().subscribe({
      next: (res) => {
        this.lstCitas = res.citas;
        this.cantidadCitasHoy = res.citas.length;
        this.cantidadPacientes = res.pacientes.length;
        console.log(res);
      },
      error: (err) => {
        console.error('Error al obtener citas', err);
      }
    });
  }

  getPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (res) => {
        this.cantidadPacientes = res.pacientes.length;
      },
      error: (err) => {
        console.error('Error al obtener pacientes', err);
      }
    });
  }


}
