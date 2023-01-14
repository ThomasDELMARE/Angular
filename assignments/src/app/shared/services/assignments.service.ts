import { Injectable, ɵɵNgOnChangesFeature } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../../assignments/assignment.model';
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
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(`${this.uri}/${id}`)
  }

  addAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "ajouté");
    return this.http.post(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "supprimé");
    return this.http.delete<string>(`${this.uri}/${assignment._id}`);

  }

  updateAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "modifié");
    return this.http.put<Assignment>(this.uri, assignment);
  }

  getHighestId():Observable<any> {
    return this.http.get<string>(`${this.shortUri}/highestId`);
  }
}
