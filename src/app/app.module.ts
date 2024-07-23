import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaContattiComponent } from './components/lista-contatti/lista-contatti.component';
import { ContattoComponent } from './components/contatto/contatto.component';
import { provideHttpClient } from '@angular/common/http';
import { NuovoContattoComponent } from './components/nuovo-contatto/nuovo-contatto.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListaContattiComponent,
    ContattoComponent,
    NuovoContattoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
