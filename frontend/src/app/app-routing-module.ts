import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPacientes } from './pages/pacientes/lista-pacientes/lista-pacientes';
import { FormPaciente } from './pages/pacientes/form-paciente/form-paciente';
import { ListaCitas } from './pages/citas/lista-citas/lista-citas';
import { FormCita } from './pages/citas/form-cita/form-cita';
import { HomeComponent } from './components/home-component/home-component';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },


  { path: 'pacientes', component: ListaPacientes },
  { path: 'pacientes/form/:id', component: FormPaciente },

  { path: 'citas', component: ListaCitas },
  { path: 'citas/form/:id', component: FormCita }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
