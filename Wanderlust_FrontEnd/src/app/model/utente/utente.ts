import { Post } from "../post/post";

export class Utente {
    id_utente?: number;
    nome?: string;
    cognome?: string;
    email?: string;
    password?: string;
    
    newPassword?: string;
    isAdmin?: boolean;
    
    articoli?: Post[];
    postPreferiti?: Post[];
}

// Il <?> è un operatore che permette di valutare prima l'esistenza della variabile a sx e poi procedere
// con quanto si trova a dx. E' una misura di sicurezza per garantirci la navigazione
// Il <!> è un operatore che indica ad angular che siamo sicuri di ciò che stiamo passando
