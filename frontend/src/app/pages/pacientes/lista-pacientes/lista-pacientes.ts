import { Component } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Router } from '@angular/router';
import { Paciente } from '../../../models/paciente.model';
import { AlertService } from '../../../services/toast.service';

@Component({
  selector: 'app-lista-pacientes',
  standalone: false,
  templateUrl: './lista-pacientes.html',
  styleUrl: './lista-pacientes.css',
})
export class ListaPacientes {
  pacientes: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private alertService: AlertService,

  ) {}

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (res) => {
        this.pacientes = res.pacientes;
      },
      error: (err) => {
        console.error('Error al obtener pacientes', err);
      }
    });
  }

  nuevoPaciente(): void {
    this.router.navigate(['/pacientes/form', 0]);
  }

  editarPaciente(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/pacientes/form', id]);
  }

  eliminarPaciente(id: number | undefined): void {
    if (!id) return;
    this.alertService.confirmarEliminacion().then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.deletePaciente(id).subscribe({
          next: () => {
            this.alertService.exito('Paciente Eliminado', 'El paciente ha sido eliminado exitosamente.');
            this.getPacientes();
          },
          error: (err) => {
            console.error('Error al eliminar paciente', err);
            this.alertService.error('Error', 'No se pudo eliminar el paciente. Intente nuevamente.');
          }
        });
      }
    });
  }
}
