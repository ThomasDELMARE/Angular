import { Injectable, ɵɵNgOnChangesFeature } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  uri = "http://localhost:8010/api/assignments";
  shortUri = "http://localhost:8010/api";

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    /*const a:Assignment|undefined =
           this.assignments.find(a => a.id === id);

    return of(a);*/
    return this.http.get<Assignment>(`${this.uri}/${id}`)
  }

  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);
    // ex utilisation du service de log
    this.loggingService.log(assignment.nom, "ajouté");

    //return of("Assignment ajouté");
    return this.http.post(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    /*const position = this.assignments.indexOf(assignment);
    this.assignments.splice(position,1);
  */
      // ex utilisation du service de log
      this.loggingService.log(assignment.nom, "supprimé");

    //return of("Assignment supprimé");
    return this.http.delete<string>(`${this.uri}/${assignment._id}`);

  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // Rien à faire pour le moment, plus tard
    // il faudra faire une requête HTTP PUT
    // sur un web service distant etc.

      // ex utilisation du service de log
      this.loggingService.log(assignment.nom, "modifié");

    //return of("Assignment modifié");
    return this.http.put<Assignment>(this.uri, assignment);
  }

  getHighestId():Observable<any> {
    return this.http.get<string>(`${this.shortUri}/highestId`);
  }

  /*

  peuplerBD() {
    dataPourPeuplerBD.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
      .subscribe(msg => {
        console.log(msg);
      })
    })
  }
  */
}