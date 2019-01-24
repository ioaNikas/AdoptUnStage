import { Url } from 'url';

export interface Entreprise {
    civilite: string;
    name: string;
    username: string;
    description: string;
    email: string;
    role: string[];
    password: string;
    raisonSociale: string;
    secteur: string;
    statut: string;
    adresse: string;
    ville: string;
    codePostal: string;
    logo: Url;
    prenom: string;
    contactMail: string;
    tel: string;
    siteWeb: string;


}