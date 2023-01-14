import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  login: string;
  password: string;
  loginResult : boolean;

  title = 'Gestion des assignments';

  constructor(private authService:AuthService) {}

  // Méthode permettant d'envoyer la requête d'authentification de l'utilisateur
  loginUser() {
    this.authService.logIn(this.login, this.password) 
  }
}
