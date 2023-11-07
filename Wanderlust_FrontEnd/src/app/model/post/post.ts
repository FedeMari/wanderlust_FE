import { Categoria } from "../categoria/categoria";
import { Immagine } from "../immagine/immagine";
import { Utente } from "../utente/utente";

export class Post {
    id_post?: number;
    data?: Date;
    titolo?: string;
    contenuto?: string;

    utente?: Utente;

    categorie?: Categoria[];
    immaginiAssociate?: Immagine[];

    isFavorite?: boolean = false;

    autoreBackup?: string;
    immagineBackup?: string;
}
