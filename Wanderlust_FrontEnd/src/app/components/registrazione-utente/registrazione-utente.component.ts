import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/model/utente/utente';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';

@Component({
  selector: 'app-registrazione-utente',
  templateUrl: './registrazione-utente.component.html',
  styleUrls: ['./registrazione-utente.component.css']
})

export class RegistrazioneUtenteComponent implements OnInit {
  utente: Utente = new Utente();

  constructor(private service: UtenteService, private router: Router) { }

  ngOnInit(): void {
    const video = document.getElementById('background-video') as HTMLVideoElement;
    video.play();
  }

  onSubmit() : void {
    console.log(this.utente);
    this.saveUtente();
  }

  private saveUtente() {
    this.service.addUtente(this.utente)
          .subscribe({
            next: (data) => {
              console.log(data);
              this.utente = new Utente();
              this.showRegistrationMessage();
            },
            error: (err) => {
              switch(err.status){
                case 409:
                  this.showErrorEmailMessage();
                  break;
                case 406:
                  this.showErrorPasswordMessage();
                  break;
                case 401:
                  this.showErrorSpaceMessage();
              }
            }
          });
  }
  

  showMessage: boolean = false;

  showRegistrationMessage(): void {
    this.showMessage = true;
    // Il messaggio scompare dopo 4 secondi
    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
  }

  showErrorMessage: boolean = false;

  showErrorPasswordMessage(){
    this.showErrorMessage = true;
      // Il messaggio scompare dopo 4 secondi
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 4000);
  }

  showSecondErrorMessage: boolean = false;

  showErrorEmailMessage(){
    this.showSecondErrorMessage = true;
      // Il messaggio scompare dopo 4 secondi
      setTimeout(() => {
        this.showSecondErrorMessage = false;
      }, 4000);
  }

  showThirdErrorMessage: boolean = false;

  showErrorSpaceMessage(){
    this.showThirdErrorMessage = true;
      // Il messaggio scompare dopo 4 secondi
      setTimeout(() => {
        this.showSecondErrorMessage = false;
      }, 4000);
  }


}
