import { Component } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { CitaService } from '../../../services/cita.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../models/paciente.model';
import { Cita } from '../../../models/cita.model';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../services/toast.service';

@Component({
  selector: 'app-form-cita',
  standalone: false,
  templateUrl: './form-cita.html',
  styleUrl: './form-cita.css',
})
export class FormCita {
  id: number = 0;
  esNuevo: boolean = true;

  pacientes: Paciente[] = [];

  cita: Cita = {
    paciente_id: 0,
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'pendiente'
  };

  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
  // Cargar pacientes para el select
  this.getPacientes();

  // Leer el id desde la ruta
  this.activeRoute.paramMap.subscribe(params => {
    this.id = Number(params.get('id'));

    // Si id es 0, es nuevo
    this.esNuevo = this.id === 0;

    // Si no es nuevo, traer la cita para editar
    if (!this.esNuevo) {
      this.getCitaById();
    }
  });
}

  getPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (res) => {
        this.pacientes = res.pacientes;
        console.log('Pacientes:',res.pacientes);
      },
      error: (err) => {
        console.error('Error al obtener pacientes', err);
      }
    });
  }

  getCitaById(): void {
    this.citaService.getCitaById(this.id).subscribe({
      next: (res) => {
        this.cita = {
          id: res.cita.id,
          paciente_id: Number(res.cita.paciente_id),
          fecha: res.cita.fecha,
          hora: res.cita.hora,
          motivo: res.cita.motivo,
          estado: res.cita.estado
        };
        console.log('Cita:', res.cita);
      },
      error: (err) => {
        console.error('Error al obtener cita', err);
      }
    });
  }

  onSubmit(formCita: NgForm): void {
    if (formCita.invalid || this.cita.paciente_id === 0) {
      formCita.control.markAllAsTouched();
      return;
    }

    if (this.esNuevo) {
      this.citaService.createCita(this.cita).subscribe({
        next: (res) => {
          this.alertService.exito('Cita Creada', res.mensaje);
          this.router.navigate(['/citas']);
        },
        error: (err) => {
          console.error('Error al crear cita', err);
          this.alertService.error('Error', 'No se pudo crear la cita. Intente nuevamente.');
        }
      });
    } else {
      this.citaService.updateCita(this.id, this.cita).subscribe({
        next: (res) => {
          this.alertService.exito(res.mensaje, 'La cita ha sido actualizada exitosamente.');
          this.router.navigate(['/citas']);
        },
        error: (err) => {
          console.error('Error al actualizar cita', err);
          this.alertService.error('Error', 'No se pudo actualizar la cita. Intente nuevamente.');
        }
      });
    }
  }
}
