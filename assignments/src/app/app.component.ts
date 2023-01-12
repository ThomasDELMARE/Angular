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

  constructor(private authService: AuthService,  private router: Router) {
  this.router.url === '' ?
      this.isLogin = false :
      this.isLogin = true;
  }

  logOut() {
    console.log("Déconnexion demandée")
    this.authService.logOut();
    this.router.navigate(['./']);
  }
}
