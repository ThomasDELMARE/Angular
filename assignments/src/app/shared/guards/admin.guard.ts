import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService:AuthService, private _snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.isAdmin()
      .then((isAdmin: any)  => {
        if(isAdmin) {
          return true;
        } else {
          this._snackBar.open("Navigation refusée, connectez-vous avec un compte administrateur", "Fermer", {
            duration: 2000
          });
          return false;
        }
      })
  }
}
