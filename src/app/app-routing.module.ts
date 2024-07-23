import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaContattiComponent } from './components/lista-contatti/lista-contatti.component';
import { NuovoContattoComponent } from './components/nuovo-contatto/nuovo-contatto.component';
import { ContattoComponent } from './components/contatto/contatto.component';

const routes: Routes = [
  {path: "", component: ListaContattiComponent},
  {path: "nuovo", component: NuovoContattoComponent},
  {path: ":id", component: ContattoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
