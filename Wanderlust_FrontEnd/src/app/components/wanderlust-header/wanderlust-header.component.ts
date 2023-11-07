import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from 'src/app/model/utente/utente';
import { UtenteService } from 'src/app/services/utente-Service/utente.service';

@Component({
  selector: 'wanderlust-header',
  templateUrl: './wanderlust-header.component.html',
  styleUrls: ['./wanderlust-header.component.css']
})
export class WanderlustHeaderComponent implements OnInit{
  utente?: Utente;

  constructor(private route: ActivatedRoute, private service: UtenteService,private router: Router){};

  
  ngOnInit(): void {    
    if(sessionStorage.getItem('utenteloggato')){
      this.utente = JSON.parse(sessionStorage.getItem('utenteloggato')!)
    }
  }

  logout(): void {
    sessionStorage.removeItem('utenteloggato');
    if(sessionStorage.getItem('administrator')){
      sessionStorage.removeItem('administrator');
    }
    this.router.navigate(['/homepage']).then
    (() => window.location.reload());
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']).then
    (() => window.location.reload());
  }

  vistaUtente(id?: number){
    this.router.navigate(['/mioaccount', id]);
  }

  isAmministratore(){
    const amministratore = sessionStorage.getItem('administrator');
    return amministratore !== null && amministratore !== undefined;
  }

}
