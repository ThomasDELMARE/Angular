import { Injectable, ɵɵNgOnChangesFeature } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../login/user.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private loggingService:LoggingService,
              private http:HttpClient,
              private _snackBar: MatSnackBar
    ) { }

  uri = "http://localhost:8010/api/users";
  shortUri = "http://localhost:8010/api";

  // Renvoie tous les utilisateurs
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.uri);
  }

  // Renvoie un utilisateur via login et password
  getUser(login:string, password:string):Observable<User|undefined> {
    const requestParams = new HttpParams({
      fromObject: {
        login: login,
        password: password
      }
    });

    var response = this.http.get<User>(`${this.uri}/fetch`, {params:requestParams});

    if(response == null){
      this._snackBar.open("Utilisateur non trouvé, merci de réessayer", "Fermer", {
        duration: 3000
      });
      
    }

    return response;
  }

  // Ajoute un utilisateur
  addUser(User:User):Observable<any> {
    // ex utilisation du service de log
    this.loggingService.log(User.login, "ajouté");
    return this.http.post(this.uri, User);
  }

  // Met à jour les données d'un utilisateur
  updateUser(User:User):Observable<any> {
    this.loggingService.log(User.login, "modifié");
    return this.http.put<User>(this.uri, User);
  }

  // Renvoie l'id le plus élevé
  getHighestId():Observable<any> {
    return this.http.get<string>(`${this.shortUri}/highestUserId`);
  }
}
