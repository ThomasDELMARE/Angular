import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
    constructor(private authService:AuthService, private router: Router) {}
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.authService.isLoggedIn()
      .then((loggedIn: boolean)  => {
        console.log("Login Guard: " + loggedIn);

        if(loggedIn) {
          // Si on est loggé, on redirige vers la page d'accueil
          this.router.navigate(['./home']);
          return false;
        } else {
          // Sinon on le laisse ici
          return true;
        }
      })
  }
}
