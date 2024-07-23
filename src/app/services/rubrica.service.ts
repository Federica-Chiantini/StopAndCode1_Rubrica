import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { tipoPersona } from '../models/interfaccia';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RubricaService {

  constructor(private http : HttpClient, private router : Router) { }

  tuttiIcontatti() : Observable<tipoPersona[]> {
    return this.http.get<tipoPersona[]>(environment.APIurl)
  }

  contattoSelezionato(id : string) : Observable<tipoPersona> { //mostra solo il contatto selezionato tramite id
    return this.http.get<tipoPersona>(environment.APIurl + id)
  }

  aggingiUtente(utente : tipoPersona) : Observable<tipoPersona>{
    return this.http.post<tipoPersona>(environment.APIurl, utente)
  }

  cancellaUtente(id : number): Observable<tipoPersona>{
    return this.http.delete<tipoPersona>(environment.APIurl + id)
}

modifica : boolean = false;  //usato per verificare lo stato in cui si trova il form : 
//TRUE= modifica utente esistente 
//FALSE= aggiungi nuovo utente
testoDaModificare ?: tipoPersona  //salva i campi del contatto da modificare

DatidaModificare(body : tipoPersona){
  this.modifica = true; //modifica utente esistente
  this.testoDaModificare = body //prende i dati da modificare
  this.router.navigate(['nuovo']) //invia a pagina del form gia' compilata
}

modificaUtente(oggetto : tipoPersona, id : number){
  return this.http.patch(environment.APIurl + id, oggetto)
}
}
