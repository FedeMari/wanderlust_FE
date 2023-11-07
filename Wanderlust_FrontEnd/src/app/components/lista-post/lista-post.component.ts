import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Categoria } from 'src/app/model/categoria/categoria';
import { Post } from 'src/app/model/post/post';
import { Utente } from 'src/app/model/utente/utente';
import { CategoriaService } from 'src/app/services/categoria-Service/categoria.service';
import { PostService } from 'src/app/services/post-Service/post.service';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';


@Component({
  selector: 'app-lista-post',
  templateUrl: './lista-post.component.html',
  styleUrls: ['./lista-post.component.css']
})

export class ListaPostComponent implements OnInit{
  listaPost: Post[] = [];
  utente: Utente = new Utente();
  listaPostBackup: Post[] = [];
  categorie?: Categoria[] = [];
  listapostPreferiti: Post[] = [];

  currentPage: number = 1;

  constructor(private route: ActivatedRoute, private service: PostService, private serviceUtente:UtenteService,
     private router: Router, private serviceCategoria: CategoriaService){

      // l'attributo [(ngModel)] sta tentando di legare il valore selezionato nel <select> con la variabile 
      // searchCategoria nella tua componente Angular. Quando si utilizza l'approccio di two-way data binding con 
      // [(ngModel)], l'opzione con disabled selected può non funzionare correttamente per l'opzione predefinita 
      // del select.

      // Per risolvere il problema, puoi provare a inizializzare la variabile searchCategoria con un valore 
      // predefinito nella componente Angular o nel suo costruttore. In questo modo, il valore corrispondente 
      // sarà selezionato di default nel select.
      this.searchCategoria = ''; //risolviamo con valore di Default

  }
  ngOnInit(): void {
    this.utente = JSON.parse(sessionStorage.getItem('utenteloggato')!);
    this.service.getAllPosts()
      .subscribe(
        {
          next: (response: Post[]) => {
            this.listaPost = response;
            this.listaPostBackup = response;

            this.serviceCategoria.getAllCategorie().subscribe({
              next: data => {
                data.sort((a, b) => a.nome_categoria!.localeCompare(b.nome_categoria!)); //ordine alfabetico categorie
                this.categorie = data;

                this.serviceUtente.getPreferitiUtenteById(this.utente!.id_utente!)
                .subscribe({
                  next: (risultati) => {
                    this.listapostPreferiti = risultati.postPreferiti!;
                    this.controlloPreferiti();
                  },
                  error: (err) => console.log(err)
                })
              },
              error: error => console.log(error)
            })
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message)
          }
        }
      );
  }

  toggleBookmark(post: Post){
    if(post.isFavorite){
      this.serviceUtente.removePreferitoUtenteById(post.id_post!, this.utente!.id_utente!)
      .subscribe({
        next: () => {
          console.log('Post rimosso con successo.');
          post.isFavorite = false;
          return;          
        },
        error: error => console.log(error)
      });

    } else {
      this.serviceUtente.addPreferitoUtenteById(post, this.utente!.id_utente!)
      .subscribe({
        next: () => {
          console.log('Post aggiunto ai preferiti con successo.');
          post.isFavorite = true;
          return;
        },
        error: error => console.log(error)
      });
    }
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

  // forkJoin è un operatore di combinazione in RxJS che combina gli ultimi valori emessi da più Observable in 
  // un unico Observable, ma solo quando tutti gli Observable hanno completato. In pratica, attende che tutti gli 
  // Observable passati come argomenti abbiano emesso un valore e siano stati completati prima di restituire i 
  // risultati combinati.

  // Nel contesto del tuo codice, forkJoin viene utilizzato per affrontare il problema delle chiamate asincrone 
  // sovrapposte all'interno del ciclo for nel metodo ricercaPostPerAutore.

  // ogni chiamata asincrona a this.service.getAutorePostById otterrà i dati relativi a un post specifico. 
  // Quando tutti i dati saranno stati ottenuti, l'Observable restituito da forkJoin emetterà un array con tutti 
  // i nomi degli autori corrispondenti ai post
  
  ricercaPostPerAutore(key: string): void {

    //risulta necessario posizionarlo prima perchè qui a differenza del titolo dobbiamo fare delle chiamate asincrone
    if (!key) {
      this.noPost = false;      
      this.listaPost = this.listaPostBackup;
    }

    const observables = this.listaPost.map(post => this.service.getAutorePostById(post.id_post!));

    forkJoin(observables).subscribe({
      next: (autori: string[]) => {
        //costante di appoggio per creare la lista e travasare il risultato in listaPost
        const results: Post[] = [];
        for (let i = 0; i < autori.length; i++) {
          const autore = autori[i].trim(); //perchè io nel JSON faccio restituire esplicitamente nome + " " + cognome
          console.log(autore);
  
          if (autore.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            results.push(this.listaPost[i]);
          }
        }

        this.listaPost = results;
        
        if (results.length === 0  && key) {
          this.noPost = true;
        }
        
      },
      error: (err) => console.log(err)
    });
  }

  categoryPost?: string;
  searchCategoria?: string;
  
  ricercaPostPerCategoria(key: string): void {

    //a differenza delle altre ricerche, dove risettiamo la lista completa quando non ci sono piu parole qui 
    // è necessario farlo forzatamente
    this.noPost = false;
    this.listaPost = this.listaPostBackup;
    
    console.log(this.noPost);
    console.log(key);
    const results: Post[] = [];
    const observables = this.listaPost.map(post => this.service.getCategoriePostById(post.id_post!));

    forkJoin(observables).subscribe({
      next: (categorie: string[]) => {
        for (let i = 0; i < categorie.length; i++) {
          this.categoryPost = categorie[i];

          if (this.categoryPost!.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            results.push(this.listaPost[i]);
          }
        }

        //aggiorniamo i post visibili sulla pagina
        this.listaPost = results;
        
        if(results.length >0){
          console.log('ciao');
        }

        ///

        if (results.length === 0 && key) {
          this.noPost = true;
          console.log(this.noPost);
        }
      },
      error: (err) => console.log(err)
    });
  }

  orderBy?: string;
  cresc?: boolean = false;

  ordinamentoPost(tipoOrdinamento: string) {
    if (tipoOrdinamento === 'position' && this.cresc === true) {
      this.listaPost.sort((a, b) => a.id_post! - b.id_post!);
    } else if(tipoOrdinamento === 'position' && this.cresc === false){
      this.listaPost.sort((a, b) => b.id_post! - a.id_post!);
    }

    if (tipoOrdinamento === 'name' && this.cresc === true) {
      this.listaPost.sort((a, b) => b.titolo!.localeCompare(a.titolo!)); 
      // confronto lessicografico di stringhe in ordine crescente
    } else if (tipoOrdinamento === 'name' && this.cresc === false) {
      this.listaPost.sort((a, b) => a.titolo!.localeCompare(b.titolo!)); 
      // confronto lessicografico di stringhe in ordine decrescente
    }

    if (tipoOrdinamento === 'date' && this.cresc === false) {
      this.listaPost.sort((a, b) => {
        const dateA = new Date(a.data!).getTime();
        const dateB = new Date(b.data!).getTime();
        console.log('Date A:', dateA, 'Date B:', dateB);
        return dateB - dateA; //prima il piu recente così
        //Quando si sottrae dateA da dateB, il risultato sarà un valore positivo se la data di dateB è 
        //successiva a dateA. Questo significa che, nell'ordinamento decrescente, i post con la data di 
        //inserimento più recente verranno posizionati prima nella lista.
      });
    } else if (tipoOrdinamento === 'date' && this.cresc === true) {
      this.listaPost.sort((a, b) => {
        const dateA = new Date(a.data!).getTime();
        const dateB = new Date(b.data!).getTime();
        return dateA - dateB; //prima il piu recente così
        //Quando si sottrae dateA da dateB, il risultato sarà un valore positivo se la data di dateB è 
        //successiva a dateA. Questo significa che, nell'ordinamento decrescente, i post con la data di 
        //inserimento più recente verranno posizionati prima nella lista.
      });
    }
  }

  cambioOrdine(changeOrder: string){
    if(this.cresc === true){
      this.cresc = false;
    } else if(this.cresc === false){
      this.cresc = true;
    }

    this.ordinamentoPost(changeOrder);
  }

  espandiFiltri?: boolean = false;

  openFilter(){
    this.espandiFiltri = true;
  }

  closeFilter(){
    this.espandiFiltri = false;
  }

  controlloPreferiti(){
    for (const postPreferito of this.listapostPreferiti) {
      const postCorrispondente = this.listaPost.find(post => post.id_post === postPreferito.id_post);
      if (postCorrispondente) {
        postCorrispondente.isFavorite = true;
      }
    }
  }

  titoloAria?: string;

  updateBookmarkTooltip(post: any) {
    if (post.isFavorite) {
      this.titoloAria = 'Rimuovi Post dai Preferiti';
    } else {
      this.titoloAria = 'Aggiungi Post ai Preferiti';
    }
  }
    
}
