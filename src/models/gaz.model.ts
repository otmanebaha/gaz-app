export class GazModel {
    nom: string;
    telephone: string;
    activite: string;
    transaction: string;
    emplacement: string;
    nombreVisites: number;
    tissirPresentoir: number;
    tissirChariot: number;
    totalPresentoir: number;
    totalChariot: number;
    butaPresentoir: number;
    butaChariot: number;
    afriquiaPresentoir: number;
    afriquiaChariot: number;
    besoinClients: any[];
    note: string;
    tissirPartMarche: number;
    totalPartMarche: number;
    butaPartMarche: number;
    afriquiaPartMarche: number;
    photoTag: string;
    photoEmp: string;
    photoStore: string;
    nfc: string;
    lat: number;
    long: number;
    ville: string;
    quartier: string;
    cadeau1: string;
    cadeau2: string;
    cadeau3: string;
    constructor() {
        this.lat = 0;
        this.long = 0;
        this.nom = '';
        this.telephone = '';
        this.activite = '';
        this.transaction = '';
        this.emplacement = '';
        this.besoinClients = [];
        this.note = '';
        this.photoTag = '';
        this.photoEmp = '';
        this.photoStore = '';
        this.nfc = '';
        this.ville = '';
        this.quartier = '';
        this.cadeau1 = '';
        this.cadeau2 = '';
        this.cadeau3 = '';
    }
}
