import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from 'src/app/model/utente/utente';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';

//Qui sono specificati i file che sono direttamente connessi con questo e quindi 
//accedono direttamente a quanto dichiarato qui
@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.css']
})
export class ListaUtentiComponent implements OnInit{
  utenti?: Utente[];
  utentiBackup?: Utente[];

  constructor(private route: ActivatedRoute, private service: UtenteService, private router: Router) { }

  //quando viene chiamato il componente esegui il metodo descritto
  ngOnInit(): void{
    this.reloadData();
  }

  reloadData(): void {
    this.service.getAllUtenti()
        .subscribe({
          next: (response: Utente[]) => {
            this.utenti = response.sort((a,b) => a.cognome!.localeCompare(b.cognome!));
            this.utentiBackup = this.utenti;
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message)
          }
        });
  }

  dettagliUtente(id?: number){
    this.router.navigate(["dettagliutente", id]);
  }

  removeUser: boolean = false;  
  idUserToRemove?: number;

  wantToRemoveUser(id?: number) {
    this.idUserToRemove = id;
    this.removeUser = true;    
  }

  annulla(){
    this.removeUser = false;
  }

  rimuoviUtente(id?: number){ 
    if (id) {
      this.service.deleteUtenteById(id).subscribe({
        next: () => {
          console.log('Utente eliminato con successo.');
          this.removeUser = false;
          this.reloadData(); // Aggiorna la lista degli utenti dopo l'eliminazione
        },
        error: error => console.log(error)
      });
    }
  }

  goBack() {
    window.history.back();
  }

  noUser?: boolean = false;

  ricercaUtentePerCognome(key: string): void {

    //risulta necessario posizionarlo prima perchè qui a differenza del titolo dobbiamo fare delle chiamate asincrone
    if (!key) {
      this.noUser = false;  
      this.utenti = this.utentiBackup;
    }

    //costante di appoggio per creare la lista e travasare il risultato in listaPost

    const results: Utente[] = [];

    for (let i = 0; i < this.utenti!.length; i++) {
      const user = this.utenti![i].cognome;

      if (user!.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(this.utenti![i]);
      }
    }

    this.utenti = results;
    
    if (results.length === 0  && key) {
      this.noUser = true;
    }
  }
}
