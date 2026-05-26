import { Component } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../models/paciente.model';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../services/toast.service';

@Component({
  selector: 'app-form-paciente',
  standalone: false,
  templateUrl: './form-paciente.html',
  styleUrl: './form-paciente.css',
})
export class FormPaciente {
  id: number = 0;
  esNuevo: boolean = true;

  paciente: Paciente = {
    nombre: '',
    telefono: '',
    fecha_nacimiento: '',
    genero: ''
  };

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.esNuevo = this.id === 0;


      if (!this.esNuevo) {
        this.getPacienteById();
      }
    });
  }

  getPacienteById(): void {
    this.pacienteService.getPacienteById(this.id).subscribe({
      next: (res) => {
        this.paciente = res.paciente;
      },
      error: (err) => {
        console.error('Error al obtener paciente', err);
      }
    });
  }


  onSubmit(formPaciente: NgForm): void {
    if (formPaciente.invalid) {
      formPaciente.control.markAllAsTouched();
      return;
    }

    if (this.esNuevo) {
      this.pacienteService.createPaciente(this.paciente).subscribe({
        next: (res) => {
          this.alertService.exito('Paciente Creado', res.mensaje);
          this.router.navigate(['/pacientes']);
        },
        error: (err) => {
          console.error('Error al crear paciente', err);
          this.alertService.error('Error', err.error?.mensaje || 'No se pudo crear el paciente. Intente nuevamente.');
        }
      });
    } else {
      this.pacienteService.updatePaciente(this.id, this.paciente).subscribe({
        next: (res) => {
          this.alertService.exito('Paciente Actualizado', res.mensaje);
          this.router.navigate(['/pacientes']);
        },
        error: (err) => {
          console.error('Error al actualizar paciente', err);
          this.alertService.error('Error', err.error?.mensaje || 'No se pudo actualizar el paciente. Intente nuevamente.');
        }
      });
    }
  }
}
