import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post/post';
import { Utente } from 'src/app/model/utente/utente';
import { PostService } from 'src/app/services/post-Service/post.service';

@Component({
  selector: 'wanderlust-navbar',
  templateUrl: './wanderlust-navbar.component.html',
  styleUrls: ['./wanderlust-navbar.component.css']
})
export class WanderlustNavbarComponent implements OnInit{
  listaArticoli: Post[] = [];
  utente: Utente = new Utente();
  randomPost: Post = new Post();
  randomIndex?: number;

  constructor(private route: ActivatedRoute, private service: PostService, private router: Router) { }

  ngOnInit(): void {
    this.utente = JSON.parse(sessionStorage.getItem('utenteloggato')!);
    this.service.getAllPosts()
    .subscribe({
      next: (response: Post[]) => {
        this.listaArticoli = response;
      },
      error: (err) => console.log(err)
    })

  }

  // exploreDreamDiscover() {
  //   if (this.listaArticoli.length > 0) {
  //     //math.floor arrotonda, math.random [0,1)]
  //     this.randomIndex = Math.floor(Math.random() * this.listaArticoli.length);
  //     this.randomPost = this.listaArticoli[this.randomIndex];
  //     console.log(this.randomIndex);
  //     this.router.navigate(['dettaglipost', this.randomPost.id_post]);
  //   }
  // }

}
