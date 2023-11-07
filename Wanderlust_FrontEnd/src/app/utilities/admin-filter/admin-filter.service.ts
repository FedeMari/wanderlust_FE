import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminFilterService {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    //se non ci sta l'oggetto ti ramanda a login
    if (!sessionStorage.getItem('administrator')) {
      this.router.navigate(['homepage']);
    }
    return true;
  }

}
