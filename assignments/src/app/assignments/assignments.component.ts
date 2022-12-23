import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Assignment } from './assignment.model';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {Router} from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements AfterViewInit {
  titre="Liste des devoirs";
  assignmentSelectionne!:Assignment;
  searchText:string = "";
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'prof', 'classe', 'image', 'rendu', 'note', 'matiere'];
  assignments:Assignment[] = [];
  dataSource = new MatTableDataSource<Assignment>(this.assignments);
  totalAssignments: number = this.assignments.length;
  filterValues: any = {};
  rendu: boolean;
  nonRendu: boolean;
  filterBoolean: boolean;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  constructor(private assignmentsService:AssignmentsService, private _liveAnnouncer: LiveAnnouncer, private router: Router) { }

  ngAfterViewInit() {
    this.assignmentsService.getAssignments()
    .subscribe((assignments: Assignment[]) => {
      this.assignments = assignments
      this.dataSource = new MatTableDataSource<Assignment>(assignments);

      this.dataSource.filterPredicate = ((data: Assignment, filter: string): boolean => {
        
        if(filter == "true") this.filterBoolean = true;
        if(filter == "false") this.filterBoolean = false;

        
        return data.rendu == this.filterBoolean;
      })

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.filterValues = assignments;
      console.log(this.filterValues)
    });
  }

  announceSortChange(sortState: Sort) {
    // TODO : On en fait quoi ?
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  rechercher = (value: any) => {
    this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
  }

  assignmentClique(assignment:Assignment){
    this.router.navigate(['.//assignment/'+ assignment.id]);
  }

  ajouterDevoir(){
    this.router.navigate(['.//add/']);
  }

  applyFilter(isChecked: boolean, filterValue: string) {
    if(!isChecked) {
      this.dataSource.filter = "";
    }
    else {
      this.dataSource.filter = filterValue; 
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}