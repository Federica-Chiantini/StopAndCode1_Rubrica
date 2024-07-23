import { Component } from '@angular/core';
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
export class NuovoContattoComponent {
  constructor(public servizioR : RubricaService, private router : Router){}

  formNuovoContatto = new FormGroup({ //formGroup
    //formControls
    persona : new FormControl("fisica", Validators.required), 
    sociale : new FormControl("", Validators.required
      //#### PURTROPPO NON SONO RIUSCITA A FARLO FUNZIONARE MA HO VOLUTO COMUNQUE LASCIARLO QUI PER MOSTRARTI IL CUSTOM VALIDATOR CHE STAVO PREPARANDO
      /* (rs : AbstractControl) => { 
      const valore : string = rs.value;
      const sigleAmmesse = ['spa' , 'srl' , 'sas' , 'snc' , 'ss']
      if(valore.includes('spa') || valore.includes('srl')){ 
      return null 
      }
      return {sigleAmmesse}
      }*/
      //####
    ),
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
      const dati = this.servizioR.testoDaModificare //prende i dati da contatto gia' creato
      this.idEsistente = dati!.id //prende id contatto esistente
      this.formNuovoContatto.patchValue({
        "persona": dati!.persona,
        "nome": dati!.nome,
        "cognome": dati!.cognome,
        "sociale": dati!.sociale,
        "email": dati!.email,
        "data": dati!.data,
        "indirizzo": {
          "via": dati!.indirizzo.via,
          "cap": dati!.indirizzo.cap,
          "citta": dati!.indirizzo.citta,
          "provincia": dati!.indirizzo.provincia,
          "nazione": dati!.indirizzo.nazione
        },
        "prefisso" : dati!.prefisso,
        "tel" : dati!.tel,
        "id": dati!.id,
})
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
        //##MODIFICA solo se idEsistente e' uguale a id di questo "nuovo" form
  if(this.datiForm.id === this.idEsistente){this.servizioR.modificaUtente(this.datiForm, this.datiForm.id).subscribe({
    next: (c) => (this.router.navigate([''])),
    error : (e : HttpErrorResponse) => (alert(`errore ${e.status}: ${e.message}`))
  })
  //NB: MI DA errore 500 ad ogni modifica ma poi mi appare il contatto completo nella lista e anche nel server
}//##MODIFICA

  console.log(this.formNuovoContatto.value),

  //aggiunge nuovo utente se la condizione sopra non si verifica
    this.servizioR.aggingiUtente(this.datiForm).subscribe({
      next: (c) => (this.router.navigate([''])),
      error : (e : HttpErrorResponse) => (alert(`errore ${e.status}: ${e.message}`)
    )}
    )
  }
}

