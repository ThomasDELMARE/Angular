import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion des assignments';
  isLogin: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.router.url === '' ?
      this.isLogin = false :
      this.isLogin = true;
  }

  login() {
    if(!this.authService.loggedIn) {
      this.authService.logIn("test", "test");
    } else {
      this.authService.logOut();
    }
  }
}
