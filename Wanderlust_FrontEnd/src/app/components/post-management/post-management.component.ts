import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Categoria } from 'src/app/model/categoria/categoria';
import { Immagine } from 'src/app/model/immagine/immagine';
import { Post } from 'src/app/model/post/post';
import { Utente } from 'src/app/model/utente/utente';
import { CategoriaService } from 'src/app/services/categoria-Service/categoria.service';
import { ImmagineService } from 'src/app/services/immagine-Service/immagine.service';
import { PostService } from 'src/app/services/post-Service/post.service';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.css']
})
export class PostManagementComponent implements OnInit{  
  utente: Utente = new Utente();
  listaPost: Post[] = [];
  listaPostBackup: Post[] = [];
  categorie?: Categoria[] = [];

  currentPage: number = 1;

  constructor(private route: ActivatedRoute, private service: PostService, private serviceUtente:UtenteService,
    private router: Router, private serviceCategoria: CategoriaService) {}

  ngOnInit(): void {
    this.service.getAllPosts()
    .subscribe({
      next: (response: Post[]) => {
        this.listaPost = response;
        this.listaPostBackup = response;

        this.serviceCategoria.getAllCategorie().subscribe({
          next: data => {
            data.sort((a, b) => a.nome_categoria!.localeCompare(b.nome_categoria!)); //ordine alfabetico categorie
            this.categorie = data;
          },
          error: error => console.log(error)
        })
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }          
    });      
  }

  goBack() {
    window.history.back();
  }

  noPost: boolean = false;

  ricercaPostPerTitolo(key: string): void {
    console.log(key);
    const results: Post[] = [];
    for (const post of this.listaPost) {
      if (post.titolo!.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(post);
      }
    }
    //aggiorniamo i post visibili sulla pagina
    this.listaPost = results;
    //se non c'è alcuna ricerca effettuata o il risultato è nullo ridammi tutti i post
    if (!key) {
      this.noPost = false;
      this.listaPost = this.listaPostBackup;
    }

    if (results.length === 0 && key) {
      this.noPost = true;
    }
  }

  eliminazionePost(id_post?: number){
    if (id_post) {
      this.service.deletePostById(id_post)
      .subscribe({
        next: () => {
          console.log('Post eliminato con successo.');
          this.router.navigate(['/','gestionepost']).then
              (() => window.location.reload());
          
        },
        error: error => console.log(error)
      });
    }
  }
  
  // Creiamo una mappa che associa ad ogni postId un booleano
  postMenuStatus: { [postId: number]: boolean } = {};

  toggleMenuPost(postId: number) {
    if (this.postMenuStatus[postId] === undefined) { //se non c'è corrispondenza nella mappa allora inserisce il valore
        this.postMenuStatus[postId] = false;
    }
    this.postMenuStatus[postId] = !this.postMenuStatus[postId]; //se invece è presente un valore, deve cambiarlo
  }

}
