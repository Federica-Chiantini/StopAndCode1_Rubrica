import { Component, OnInit } from '@angular/core';
import { RubricaService } from '../../services/rubrica.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { tipoPersona } from '../../models/interfaccia';

@Component({
  selector: 'app-contatto',
  templateUrl: './contatto.component.html',
  styleUrl: './contatto.component.scss'
})
export class ContattoComponent implements OnInit{

  constructor(public rubSer : RubricaService, private route : ActivatedRoute, private router : Router){}

  contatto ?: tipoPersona

  ngOnInit(): void {
    const idC = this.route.snapshot.paramMap.get('id')!
    this.rubSer.contattoSelezionato(idC).subscribe({
      next : (c) => {this.contatto = c},
    error : (e : HttpErrorResponse) => { console.log(e.statusText)}
})
}

cancella(id : number){ //cancella utente dalla lista di contatti
  this.rubSer.cancellaUtente(id).subscribe({
    next: (c) => (this.router.navigate(['']) ),
    error : (e : HttpErrorResponse) => (alert(`errore ${e.status}: ${e.message}`))
  })
}

DatidaModificare(id :number){
  this.rubSer.modifica = true; //modifica utente esistente
  this.rubSer.idDaModificare = id.toString() //prende i dati da modificare
  console.log(id)
  this.router.navigate(['nuovo/' + id]) //invia a pagina del form gia' compilata
}


}
