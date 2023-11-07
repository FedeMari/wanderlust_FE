import { HttpClient } from '@angular/common/http';
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
  selector: 'app-i-miei-post',
  templateUrl: './i-miei-post.component.html',
  styleUrls: ['./i-miei-post.component.css']
})
export class IMieiPostComponent implements OnInit{
  utente: Utente = new Utente();
  currentPost?: Post;
  newPost: Post = new Post();
  categorie?: Categoria[] = [];
  immagineInserita: Immagine = new Immagine();

  currentPage: number = 1;  
  
  constructor(private route: ActivatedRoute, private service: UtenteService, private servicePost: PostService, 
    private serviceCategoria: CategoriaService, private serviceImmagine: ImmagineService,
    private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.utente = JSON.parse(sessionStorage.getItem('utenteloggato')!)
    this.service.getArticoliUtenteById(this.utente!.id_utente!)
      .subscribe(
        {
          next: data => {
                  console.log(data);
                  this.utente = data;
                },
          error: error => console.log(error)
        }
      );

      this.serviceCategoria.getAllCategorie().subscribe({
        next: data => {
          console.log(data);
          data.sort((a, b) => a.nome_categoria!.localeCompare(b.nome_categoria!)); //ordine alfabetico categorie
          this.categorie = data;
        },
        error: error => console.log(error)
      })    
  }

  activateAddPost: boolean = false;

  aggiuntaPost(){    
    this.activateAddPost = true;
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Scorrimento fluido
    });
  }  

  activateUpdatePost: boolean = false;

  aggiornamentoPost(postVecchio: Post){
    this.currentPost = postVecchio;
    this.activateUpdatePost = true;
    window.scrollTo({
      top: 150,
      behavior: 'smooth' // Scorrimento verso l'alto della pagina
    });
  }

  eliminazionePost(id_post?: number){
    if (id_post) {
      this.servicePost.deletePostById(id_post)
      .subscribe({
        next: () => {
          console.log('Post eliminato con successo.');
          this.router.navigate(['/','mieiarticoli']).then
              (() => window.location.reload());
          
        },
        error: error => console.log(error)
      });
    }
  }

  onSubmitAdd(){
    console.log(this.newPost);
    this.savePost();
  }

  selectedCategory!: Categoria;

  uploadedImageURL!: string;

  erroreTitolo: boolean = false;
  messaggioErroreTitolo: string = 'Inserisci un Titolo.';

  erroreContenuto: boolean = false;
  messaggioErroreContenuto: string = 'Inserisci un Contenuto: assicurati di aver inserito almeno 400 caratteri (inclusi spazi e punteggiatura).';

  erroreCategoria: boolean = false;
  messaggioErrore: string = 'Seleziona una categoria.';

  erroreImmagine: boolean = false;
  messaggioErroreImmagine: string = 'Inserisci un URL per l\'immagine.';

  savePost(){
    //controllo Titolo in aggiunta post
    if (!this.newPost.titolo) {
      this.erroreTitolo = true;
      return;
    }
    this.erroreTitolo = false;

    //controllo Contenuto in aggiunta post
    if (!this.newPost.contenuto || this.newPost.contenuto.length < 400) {
      this.erroreContenuto = true;
      return;
    }
    this.erroreContenuto = false;

    //controllo categoria in aggiunta post
    if (!this.selectedCategory) {
      this.erroreCategoria = true;
      return;
    }
    this.erroreCategoria = false;

    //controllo immagine in aggiunta post
    if (!this.uploadedImageURL) {
      this.erroreImmagine = true;
      return;
    }
    this.erroreImmagine = false;
    
    this.newPost.data = this.getCurrentDate();

    this.servicePost.addPost(this.newPost, this.utente!.id_utente!)
          .subscribe({
            next: (data) => {
              console.log(data);
              this.newPost = new Post();
              
              //aggiunta della categoria al nuovo post
              this.servicePost.addCategoriePostById(data.id_post!, this.selectedCategory)
                .subscribe({
                  next: (postData) => {
                    console.log('Categoria assegnata al post:', postData);

                    //inserimento dell'immagine nel database, al pari di noi che aggiungiamo in modo HardCoded 
                    //le categorie e conseguente associazione al post
                    this.immagineInserita.url = this.uploadedImageURL;

                    this.serviceImmagine.addImmagine(postData.id_post!,this.immagineInserita)
                    .subscribe({
                      next: (response) => {
                        console.log('Immagine inserita nel DB e associata al post:', response);
                        this.router.navigate(['/','mieiarticoli']).then
                        (() => window.location.reload());
                      },
                      error: (err) => console.log(err)
                    });
                  },

                  error: (err) => console.log(err)
                });
            },

            error: (err) => console.log(err)
          });
  }

  getCurrentDate(): Date {
    return new Date();
  }

  onSubmitUpdate(){
    console.log(this.currentPost);
    this.aggiornaPost();
  }

  updatedCategoria!: Categoria;

  aggiornaPost(){
    //controllo Titolo in aggiunta post
    if (!this.currentPost!.titolo) {
      this.erroreTitolo = true;
      return;
    }
    this.erroreTitolo = false;

    //controllo Contenuto in aggiunta post
    if (!this.currentPost!.contenuto || this.currentPost!.contenuto.length < 400) {
      this.erroreContenuto = true;
      return;
    }
    this.erroreContenuto = false;

    //controllo categoria in aggiornamento post
    if (!this.updatedCategoria) {
      this.erroreCategoria = true;
      return;
    }
    this.erroreCategoria = false;

    this.currentPost!.data = this.getCurrentDate();

    this.servicePost.updatePost(this.currentPost!, this.utente!.id_utente!)
      .subscribe(
        {
          next: data => {
                  console.log(data);
                  this.currentPost = data;

                  //aggiornamento della categoria al post
                  this.servicePost.addCategoriePostById(data.id_post!, this.updatedCategoria)
                  .subscribe({
                    next: (postData) => {
                      console.log('Categoria associata al post aggiornata:', postData);
                      this.router.navigate(['/','mieiarticoli']).then
                      (() => window.location.reload());
                    },

                    error: (err) => console.log(err)
                  });
                },

          error: (err) => console.log(err)
        });
  }

  closePopUp(){
    this.activateUpdatePost = false;
    this.activateAddPost = false;
  }

  //soluzione migliore per evitare un'altra chiamata al backend

  // Creiamo una mappa che associa ad ogni postId un booleano
  postMenuStatus: { [postId: number]: boolean } = {};

  toggleMenuPost(postId: number) {
    if (this.postMenuStatus[postId] === undefined) { //se non c'è corrispondenza nella mappa allora inserisce il valore
        this.postMenuStatus[postId] = false;
    }
    this.postMenuStatus[postId] = !this.postMenuStatus[postId]; //se invece è presente un valore, deve cambiarlo
  }

}
