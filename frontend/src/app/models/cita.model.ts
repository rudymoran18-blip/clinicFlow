import { Paciente } from './paciente.model';

export interface Cita {
  id?: number;
  paciente_id: number;
  fecha: string;
  hora: string;
  motivo: string;
  estado: string;
  Paciente?: Paciente;
}
