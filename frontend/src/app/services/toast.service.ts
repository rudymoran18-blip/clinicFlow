import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  confirmarEliminacion(mensaje: string = 'Esta acción no se puede deshacer') {
    return Swal.fire({
      title: '¿Eliminar Paciente?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    });
  }

  exito(titulo: string, mensaje: string) {
    return Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
      timer: 3000,
      showConfirmButton: false
    });
  }

  error(titulo: string, mensaje: string) {
    return Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje
    });
  }
}
