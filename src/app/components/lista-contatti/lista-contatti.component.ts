import { Component, OnInit } from '@angular/core';
import { RubricaService } from '../../services/rubrica.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tipoPersona } from '../../models/interfaccia';

@Component({
  selector: 'app-lista-contatti',
  templateUrl: './lista-contatti.component.html',
  styleUrl: './lista-contatti.component.scss'
})
export class ListaContattiComponent implements OnInit {

  rubricaCompleta : tipoPersona[] = [];
  msg : string = ""; //messaggio di errore

  constructor(private sr : RubricaService){}

  ngOnInit(): void {
    this.sr.tuttiIcontatti().subscribe(
      {
        next : (c) => {this.rubricaCompleta = c, this.msg=""}, 
        error : (e : HttpErrorResponse) => {this.msg = `Errore ${e.status} : ${e.statusText}`} //msg errore compilato in caso di errore
      }
    )}


}
