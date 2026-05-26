import { NgModule, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//FECHA
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ListaCitas } from './pages/citas/lista-citas/lista-citas';
import { FormCita } from './pages/citas/form-cita/form-cita';
import { ListaPacientes } from './pages/pacientes/lista-pacientes/lista-pacientes';
import { FormPaciente } from './pages/pacientes/form-paciente/form-paciente';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { SidebarComponent } from './components/sidebar-component/sidebar-component';
import { HomeComponent } from './components/home-component/home-component';


@NgModule({
  declarations: [
    App,
    ListaCitas,
    FormCita,
    ListaPacientes,
    FormPaciente,
    Navbar,
    Footer,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [App]
})
export class AppModule { }
