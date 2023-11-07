import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from 'src/app/model/utente/utente';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  utente?: Utente;

  constructor(private route: ActivatedRoute, private service: UtenteService,private router: Router){};

  
  ngOnInit(): void {    
    if(sessionStorage.getItem('utenteloggato')){
      this.utente = JSON.parse(sessionStorage.getItem('utenteloggato')!)
    }
  }

  entraUtenti(){
    this.router.navigate(['/listautenti']).then
    (() => window.location.reload());

  }

  entraPost(){
    this.router.navigate(['/gestionepost']).then
    (() => window.location.reload());
    
  }

}
