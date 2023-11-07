import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post/post';
import { Utente } from 'src/app/model/utente/utente';
import { PostService } from 'src/app/services/post-Service/post.service';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';

@Component({
  selector: 'app-i-miei-preferiti',
  templateUrl: './i-miei-preferiti.component.html',
  styleUrls: ['./i-miei-preferiti.component.css']
})
export class IMieiPreferitiComponent implements OnInit{
  utente?: Utente;
  currentPost?: Post;

  currentPage: number = 1;

  constructor(private route: ActivatedRoute, private service: UtenteService, private servicePost: PostService,
     private router: Router) {}


  ngOnInit(): void {
    this.utente = JSON.parse(sessionStorage.getItem('utenteloggato')!);
    this.service
      .getPreferitiUtenteById(this.utente!.id_utente!)
      .subscribe(
        {
          next: data => {
                  console.log(data);
                  this.utente = data;
                },
          error: error => console.log(error)
        }
      );
  }

  rimuoviPreferito(postId?: number){
    if (postId) {
      this.service.removePreferitoUtenteById(postId, this.utente!.id_utente!)
      .subscribe({
        next: () => {
          console.log('Post rimosso con successo.');
          this.router.navigate(['/','mieipreferiti']).then
              (() => window.location.reload());
          
        },
        error: error => console.log(error)
      });
    }
  }


}
