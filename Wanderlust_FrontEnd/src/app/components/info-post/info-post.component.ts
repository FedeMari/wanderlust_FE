import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Immagine } from 'src/app/model/immagine/immagine';
import { Post } from 'src/app/model/post/post';
import { PostService } from 'src/app/services/post-Service/post.service';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-info-post',
  templateUrl: './info-post.component.html',
  styleUrls: ['./info-post.component.css']
})
export class InfoPostComponent implements OnInit{
  post?: Post = new Post();
  private id = 0;

  autore?: String;
  listaImmagini: Immagine[] = [];
  immagineURL?: string;

  constructor(private route: ActivatedRoute, private service: PostService, private router: Router,
    private sanitizer: DomSanitizer) {}


  ngOnInit(): void {
    // snapshot è una proprietà dell'oggetto route che rappresenta uno snapshot dell'attuale stato dell'URL 
    // dell'applicazione in un dato momento. Consente di accedere ai parametri presenti nell'URL.
    // la stringa di codice assegna il valore del parametro "id" presente nell'URL corrente alla 
    // proprietà id dell'oggetto corrente
    this.id = this.route.snapshot.params['id'];

    this.service.getAutorePostById(this.id)
    .subscribe({
      next: (response) => {
        this.autore = response;

        this.service.getImmaginiPostById(this.id)
                .subscribe({
                  next: (responseImage) => {
                    this.listaImmagini = responseImage.immaginiAssociate!;
                    for (let i = 0; i < this.listaImmagini.length; i++) {
                      if(this.immagineURL !== 'null'){ //credo qui vada corretto con this.listaImmagini[i]
                        this.immagineURL = this.listaImmagini[i].url;
                        break; // Per assegnare solo la prima immagine non-null
                      }
                    }
                    
                  },                  
                  error: (error) => console.log(error)
                });

      },
      error: (error) => console.log(error)
    });

    this.showInfoPost();
  }

  showInfoPost(){
    this.service
      .getPostById(this.id)
      .subscribe(
        {
          next: data => {
                  console.log(data);
                  this.post = data;
                },
          error: error => console.log(error)
        }
      );

  }

  goBack() {
    window.history.back();
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
