import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isLoggedIn()
      .then((isLogged: boolean)  => {
        console.log("isLogged guard : " + isLogged);

        if(isLogged) {
          return true;
        } else {
          this._snackBar.open("Navigation refusée, connectez-vous avec un compte administrateur", "Fermer", {
            duration: 3000
          });
          return false;
        }
      })
  }
}
