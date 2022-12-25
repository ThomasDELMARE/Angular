import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  loginUser() {
    this.authService.logIn(this.login, this.password) 
  }
}
