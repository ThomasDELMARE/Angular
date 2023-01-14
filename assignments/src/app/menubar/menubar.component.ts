import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {

  @Output() openSidenav: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logOut();
  }

}
