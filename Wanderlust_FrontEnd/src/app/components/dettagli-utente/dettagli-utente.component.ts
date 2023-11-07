import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from 'src/app/model/utente/utente';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';

@Component({
  selector: 'app-dettagli-utente',
  templateUrl: './dettagli-utente.component.html',
  styleUrls: ['./dettagli-utente.component.css']
})
export class DettagliUtenteComponent implements OnInit{
  utente?: Utente = new Utente();
  private id = 0;

  constructor(private route: ActivatedRoute, private service: UtenteService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.service
      .getUtenteById(this.id)
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

  goBack() {
    window.history.back();
  }

}
