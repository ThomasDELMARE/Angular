import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit, AfterViewInit {
  titre="Liste des devoirs";
  assignmentSelectionne!:Assignment;
  searchText:string = "";
  displayedColumns: string[] = ['nom', 'rendu', 'note', 'matiere', 'details'];
  assignments:Assignment[] = [];
  dataSource = new MatTableDataSource<Assignment>(this.assignments);

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private assignmentsService:AssignmentsService) { }
   ngOnInit(): void {
    console.log("appelé à l'initialisation du composant");
    this.assignmentsService.getAssignments()
    .subscribe(assignments => this.assignments = assignments);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log("Pagin 1", this.paginator);
  }

  assignmentClique(assignment:Assignment){
    console.log("assignmentClique : " + assignment.nom);
    this.assignmentSelectionne = assignment;
  }
}

export interface AssignmentList {
  nom: string;
  rendu: boolean;
  note: number;
  matiere: string;
  details: string;
}