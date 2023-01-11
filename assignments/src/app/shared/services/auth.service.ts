import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../login/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  loggedIn = false;
  user: User|undefined;
  userIsAdmin = false;

  constructor(private loginService:LoginService, private router: Router){}

  // Dans la vraie vie (dans le projet à faire), on
  // passerait login et password.
  logIn(login:string, password:string) {
    console.log("LogIN function value :", this.loggedIn)
    console.log("LogIN params :", login, password)

    
    this.loginService.getUser(login, password)
    .subscribe((userFetched) => {
      this.user = userFetched

      if(this.user != null) {
        console.log("User fetched", this.user)
        this.loggedInAsUser();

        if(this.user.admin == true){
          console.log("User is admin")
          this.loggedAsAdmin();
        }
        else {
          console.log("User is not admin");
          this.logOut()
        }
        this.router.navigate(['./home']);
      }
      else{
        console.log("User not fetched")
        // TODO : Ajouter snackbar
      }

      console.log("Final values : LogIn ", this.loggedIn, " Admin : ", this.userIsAdmin)
    });
  }

  logOut() {
    this.loggedIn = false;
    this.userIsAdmin = false;
  }

  loggedAsAdmin() {
    this.userIsAdmin = true;
  }

  loggedInAsUser() {
    this.loggedIn = true;
  }

  isLoggedIn(): Promise<boolean> {
    console.log("Logged in value via service: ", this.loggedIn)
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
  }

  isAdmin(): Promise<boolean> {
    console.log("Admin in value via service: ", this.loggedIn)
    return new Promise((resolve, reject) => {
      resolve(this.userIsAdmin);
    });
  }
}
