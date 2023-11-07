import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/model/utente/utente';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';

@Component({
  selector: 'app-login-utente',
  templateUrl: './login-utente.component.html',
  styleUrls: ['./login-utente.component.css']
})
export class LoginUtenteComponent implements OnInit{
  utente: Utente = new Utente();

  constructor(private service: UtenteService, private router: Router) {}

  ngOnInit(): void {
    const video = document.getElementById('background-video') as HTMLVideoElement;
    video.play();
  }

  onSubmit() : void {
    console.log(this.utente);
    this.accessoUtente();
  }

  private accessoUtente() {
      this.service.loginUtente(this.utente)
          .subscribe({
            next: data => {
              console.log(data);
              sessionStorage.setItem('utenteloggato', JSON.stringify(data));

              this.utente = new Utente();

              this.amministratore();
              
              this.router.navigate(['/','homepage']).then
              (() => window.location.reload());
            },
            error: (err) => {
              switch(err.status){
                case 406:
                  this.showErrorLogin();
                  break;
                default:
                  console.log(err);
              }
            }
          });
  }

  amministratore(){
    const admin = JSON.parse(sessionStorage.getItem('utenteloggato')!);
    if (admin.email === 'gemelli.95@hotmail.it' && admin.password === 'Wanderlust_2023') {
      sessionStorage.setItem('administrator', 'Sei un amministratore.');
    }
  }

  errorLogin: boolean = false;

  showErrorLogin(){
    this.errorLogin = true;
    // Il messaggio scompare dopo 4 secondi
    setTimeout(() => {
      this.errorLogin = false;
    }, 4000);
  }

}
