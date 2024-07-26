import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RubricaService } from '../../services/rubrica.service';
import { tipoPersona } from '../../models/interfaccia';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nuovo-contatto',
  templateUrl: './nuovo-contatto.component.html',
  styleUrl: './nuovo-contatto.component.scss'
})
export class NuovoContattoComponent{

  constructor(public servizioR : RubricaService, private router : Router){}

  formNuovoContatto = new FormGroup({ //formGroup
    //formControls
    persona : new FormControl("fisica", Validators.required), 
    sociale : new FormControl("", [Validators.minLength(3), Validators.required]),
      //####
    nome : new FormControl("", [Validators.minLength(3), Validators.required]),
    cognome : new FormControl("", [Validators.minLength(3), Validators.required]),
    email: new FormControl("", Validators.email),
    data : new FormControl("", Validators.required),
    //formGroup annidato indirizzo
    indirizzo : new FormGroup ({
      via : new FormControl("", [Validators.minLength(4), Validators.required]),
      cap : new FormControl("", [Validators.minLength(5), Validators.maxLength(5)]),
      citta : new FormControl("", [Validators.minLength(3), Validators.required]),
      provincia : new FormControl("", [Validators.minLength(2), Validators.required]),
      nazione : new FormControl("", [Validators.minLength(4), Validators.required])
    }), //###
    prefisso : new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern(/^\d{2}/gmi)]),
    tel : new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/(^(1?)(\s?)([\s]?)((\(\d{3}\))|(\d{3}))([\s]?)([\s-]?)(\d{3})([\s-]?)(\d{4})+$)/gmi)]),

    id : new FormControl(new Date().getTime())
  })//####

  idEsistente : Number = 0 //mi serve per verificare se e' un id gia' esistente e quindi deve modificare un contatto gia' creato (0 valore di default)

  ngOnInit(){
    //##modifica se modifica = true
    if(this.servizioR.modifica){
      this.servizioR.contattoSelezionato(this.servizioR.idDaModificare!).subscribe(
        {
          next : (dati) => {
            if(dati.persona === 'fisica'){
              dati.sociale = ''
            }else{
              dati.nome=''
              dati.cognome=''
              dati.data=''
            }
            this.formNuovoContatto.setValue(dati)
            this.idEsistente = dati.id, 
            console.log(dati)},
          error : (e) => {alert("problema con il server")}
        }
      )
    }
    //##MODIFICA

    //cambio di campi attivi se si clicca su radibutton fisica o sociale (fisica cliccato di default)
    this.formNuovoContatto.get('sociale')?.disable(),
    this.formNuovoContatto.get('persona')?.valueChanges.subscribe(
      valore => {
        if(valore === "fisica"){
            this.formNuovoContatto.get('nome')?.enable(),
            this.formNuovoContatto.get('cognome')?.enable(),
            this.formNuovoContatto.get('data')?.enable(),
            this.formNuovoContatto.get('sociale')?.disable()
        }else{
            this.formNuovoContatto.get('sociale')?.enable(),
            this.disabilitaPersFisica()
        }
        this.formNuovoContatto.get('nome')?.updateValueAndValidity()
      }
    ) //##
}

//metodo per disabilitare campi di persona fisica 
disabilitaPersFisica(){
  this.formNuovoContatto.get('nome')?.disable(),
  this.formNuovoContatto.get('cognome')?.disable(),
  this.formNuovoContatto.get('data')?.disable()
}

//getter
get form(){
  return this.formNuovoContatto as FormGroup
}
get datiForm(){
  return this.form.value as tipoPersona
}

//metodo per ripulire tutti i campi del form (compare solo se il form e' valido)
pulisciCampi(){
  this.formNuovoContatto.reset()
}

//ngSubmit
inviaForm(){
  console.log(this.formNuovoContatto.value)
        //##MODIFICA solo se idEsistente e' uguale a id di questo "nuovo" form
  if(this.datiForm.id === this.idEsistente){this.servizioR.modificaUtente(this.datiForm, this.datiForm.id).subscribe({
    next: (c) => (this.router.navigate([''])),
    error : (e : HttpErrorResponse) => (alert(`errore ${e.status}: ${e.message}`))
  })
}
else{ //aggiunge nuovo utente se la condizione sopra non si verifica
  this.servizioR.aggingiUtente(this.datiForm).subscribe({
    next: (c) => (this.router.navigate([''])),
    error : (e : HttpErrorResponse) => (alert(`errore ${e.status}: ${e.message}`)
  )}
  )
}
  }

}

