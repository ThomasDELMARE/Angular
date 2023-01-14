import { Injectable, ɵɵNgOnChangesFeature } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../login/user.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  uri = "http://localhost:8010/api/users";
  shortUri = "http://localhost:8010/api";

  getUsers():Observable<User[]> {
    //return of(this.Users);
    return this.http.get<User[]>(this.uri);
  }

  getUser(login:string, password:string):Observable<User|undefined> {
    const requestParams = new HttpParams({
      fromObject: {
        login: login,
        password: password
      }
    });
    return this.http.get<User>(`${this.uri}/fetch`, {params:requestParams});
  }

  addUser(User:User):Observable<any> {
    //this.Users.push(User);
    // ex utilisation du service de log
    this.loggingService.log(User.login, "ajouté");

    //return of("User ajouté");
    return this.http.post(this.uri, User);
  }

  updateUser(User:User):Observable<any> {
    // Rien à faire pour le moment, plus tard
    // il faudra faire une requête HTTP PUT
    // sur un web service distant etc.

      // ex utilisation du service de log
      this.loggingService.log(User.login, "modifié");

    //return of("User modifié");
    return this.http.put<User>(this.uri, User);
  }

  getHighestId():Observable<any> {
    return this.http.get<string>(`${this.shortUri}/highestUserId`);
  }
}
