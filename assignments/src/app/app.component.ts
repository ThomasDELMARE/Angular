import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion des devoirs';
  isLoginPage: boolean;

  @ViewChild('sidenav') sidenav: any;

  constructor(private authService: AuthService, private router: Router) {
    this.router.url === '/' ?
      this.isLoginPage = true :
      this.isLoginPage = false;

    this.router.events.pipe(filter((event => event instanceof NavigationEnd))).subscribe((route) => {
      (route as any).url === '/' ?
        this.isLoginPage = true :
        this.isLoginPage = false;
    });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['./']);
  }
}
