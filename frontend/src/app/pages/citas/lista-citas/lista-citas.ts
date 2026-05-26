import { Component } from '@angular/core';
import { CitaService } from '../../../services/cita.service';
import { Router } from '@angular/router';
import { Cita } from '../../../models/cita.model';
import { AlertService } from '../../../services/toast.service';

@Component({
  selector: 'app-lista-citas',
  standalone: false,
  templateUrl: './lista-citas.html',
  styleUrl: './lista-citas.css',
})
export class ListaCitas {
  citas: Cita[] = [];

  constructor(
    private citaService: CitaService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getCitas();
  }

  getCitas(): void {
    this.citaService.getCitas().subscribe({
      next: (res) => {
        this.citas = res.citas;
      },
      error: (err) => {
        console.error('Error al obtener citas', err);
      }
    });
  }

  nuevaCita(): void {
    this.router.navigate(['/citas/form', 0]);
  }

  editarCita(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/citas/form', id]);
  }

  eliminarCita(id: number | undefined): void {
    if (!id) return;

    this.alertService.confirmarEliminacion().then((result) => {
      if (result.isConfirmed) {
        this.citaService.deleteCita(id).subscribe({
          next: (res) => {
            this.alertService.exito('Cita Eliminada', 'La cita ha sido eliminada exitosamente.');
            this.getCitas();
          },
          error: (err) => {
            console.error('Error al eliminar cita', err);
            this.alertService.error('Error', 'No se pudo eliminar la cita. Intente nuevamente.');
          }
        });
      }
    });
  }
}
