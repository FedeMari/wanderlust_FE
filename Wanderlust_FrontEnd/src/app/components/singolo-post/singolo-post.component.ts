import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Immagine } from 'src/app/model/immagine/immagine';
import { Post } from 'src/app/model/post/post';
import { Utente } from 'src/app/model/utente/utente';
import { PostService } from 'src/app/services/post-Service/post.service';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-singolo-post',
  templateUrl: './singolo-post.component.html',
  styleUrls: ['./singolo-post.component.css']
})
export class SingoloPostComponent implements OnInit{
  @Input() post?: Post;
  autore?: String;
  categorie?: String;
  listaImmagini: Immagine[] = [];
  immagineURL?: string;
  utente?: Utente;

  constructor(private route: ActivatedRoute, private service: PostService, private serviceUtente: UtenteService , 
    private router: Router, private sanitizer: DomSanitizer) { }
  
  ngOnInit(): void {
    this.service.getAutorePostById(this.post!.id_post!)
    .subscribe({
      next: (response) => {
        this.autore = response;

        this.service.getCategoriePostById(this.post!.id_post!)
          .subscribe({
            next: (responseCategory) => {
              this.categorie = responseCategory;
              
              /*  Nel caso di piu categorie
                  
                  const keys = Object.keys(responseCategory);
                  for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    this[`categoria${i + 1}`] = responseCategory[key];
                  }
               * 
               */

              this.service.getImmaginiPostById(this.post!.id_post!)
                .subscribe({
                  next: (responseImage) => {
                    this.listaImmagini = responseImage.immaginiAssociate!;
                    for (let i = 0; i < this.listaImmagini.length; i++) {
                      if(this.immagineURL !== 'null'){ //credo qui vada corretto con this.listaImmagini[i]
                        this.immagineURL = this.listaImmagini[i].url;
                        break; // Per prendere solo la prima immagine non-null
                      }
                    }
                    
                  },
                  error: (error) => console.log(error)
                });                                                 
            },

            error: (error) => console.log(error)
          });
      },

      error: (error) => console.log(error)
    });
  }

  // Se categorie è definito e rappresenta una categoria valida, viene restituito un oggetto con due proprietà 
  // booleane: 'card-category-tag' impostata a true (per applicare lo stile di base al tag della categoria) e la 
  // classe CSS corrispondente all'oggetto categoryColors basato sulla categoria corrente. Se categorie non è 
  // definito o non è una stringa, viene restituito un oggetto con la sola proprietà 'card-category-tag' impostata 
  // a true.
  getCategoryColors(): any {
    //aggiunge la classe card-category-long solo se la lunghezza della categoria supera 12 caratteri.
    return this.categorie && typeof this.categorie === 'string'
      ? { 'card-category-tag': true, [this.categoryColors[this.categorie]]: true, 'card-category-long': this.categorie.length > 12 }
      : { 'card-category-tag': true };
  }

  // oggetto categoryColors che serve come mappatura tra le categorie dei post (es. "Città", "Natura") e le 
  // classi CSS corrispondenti che si desidera applicare 
  categoryColors: { [key: string]: string } = {
    'Città': 'badge-primary',
    'Natura': 'badge-success',
    'Europa': 'badge-europa',
    'Africa': 'badge-africa',
    'Oceania': 'badge-oceania',
    'Asia': 'badge-asia',
    'America del Nord': 'badge-north-america',
    'America del Sud': 'badge-south-america',
    'America Centrale': 'badge-central-america',
    'Antartide': 'badge-antartide',
  };

  isContentExpanded: boolean = false;

  toggleContentExpand(): void {
    this.isContentExpanded = !this.isContentExpanded;
  }

  isUserLoggedIn: boolean = true;

  dettagliPost(id?: number){
    this.utente = JSON.parse(sessionStorage.getItem('utenteloggato')!);

    if(!this.utente){
      this.isUserLoggedIn = false;
      window.scrollTo({
        top: 200,
        behavior: 'smooth' // Scorrimento verso l'alto della pagina
      });
      return;
    }
    else{
      this.router.navigate(["dettaglipost", id]);      
    }    
  }

  closePopUp(){
    this.isUserLoggedIn = true;
  }

  formattedText?: string;
  anteprima?: SafeHtml;

  setFormattedText(html: string): SafeHtml {
    this.formattedText = html.substring(0,250) + '  [...]';
    return this.anteprima = this.sanitizer.bypassSecurityTrustHtml(this.formattedText);
  }


}
