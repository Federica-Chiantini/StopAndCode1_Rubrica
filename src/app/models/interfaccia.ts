export interface tipoPersona {
    "persona": string,
    "sociale": string,
    "nome": string,
    "cognome": string,
    "email" : string,
    "data" : string,
    "indirizzo": {
        "via": string,
        "cap": string,
        "citta": string,
        "provincia": string,
        "nazione": string
      },
    "prefisso": string,
    "tel": string,
    "id": number,
}