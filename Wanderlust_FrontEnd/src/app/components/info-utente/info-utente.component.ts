import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post/post';
import { Utente } from 'src/app/model/utente/utente';
import { PostService } from 'src/app/services/post-Service/post.service';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';

@Component({
  selector: 'app-info-utente',
  templateUrl: './info-utente.component.html',
  styleUrls: ['./info-utente.component.css']
})
export class InfoUtenteComponent implements OnInit{
  utente: Utente = new Utente();
  private id = 0;


  constructor(private route: ActivatedRoute, private service: UtenteService, private router: Router,
    private servicePost: PostService) {}

  ngOnInit(): void {
    this.showInfoUtente();
  }

  private showInfoUtente(){
    this.id = this.route.snapshot.params['id'];    
    this.service.getUtenteById(this.id)
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

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showNewPassword: boolean = false;

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  
  updateUser(){
    if(this.utente.newPassword){
      this.utente.password=this.utente.newPassword;
    }
    
    this.service
      .updateUtente(this.utente)
      .subscribe(
        {
          next: data => {
                  console.log(data);
                  this.utente = data;
                  this.showUpdateMessage();
                },
          error: (err) => {
            switch(err.status){
              case 409:
                this.showErrorEmailMessage();
                break;
              case 406:
                this.showErrorPasswordMessage();
            }
          }
        }
      );
  }

  showMessage: boolean = false;

  showUpdateMessage(): void {
    this.showMessage = true;
    // Il messaggio scompare dopo 5 secondi
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  showErrorMessage: boolean = false;

  showErrorPasswordMessage(){
    this.showErrorMessage = true;
      // Il messaggio scompare dopo 5 secondi
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 5000);
  }

  showSecondErrorMessage: boolean = false;

  showErrorEmailMessage(){
    this.showSecondErrorMessage = true;
      // Il messaggio scompare dopo 5 secondi
      setTimeout(() => {
        this.showSecondErrorMessage = false;
      }, 5000);
  }

  infoAccount(){
    this.router.navigate(["mioaccount", this.id]).then
    (() => window.location.reload());
  }

  disattivaAccount: boolean = false;

  wantToDeleteAccount(){
    this.disattivaAccount = true;    
  }

  annulla(){
    this.disattivaAccount = false;
  }

  deleteAccount(){
    this.disattivaAccount = false;
    this.service.deleteUtenteById(this.id)
    .subscribe({
      next: data => {
        console.log("Utente eliminato con successo");
        this.disattivaAccount = false;
        sessionStorage.removeItem('utenteloggato');
        this.router.navigate(['/','homepage']).then
              (() => window.location.reload());
      },
      error: (err) => console.log(err)
    });
  }
}
