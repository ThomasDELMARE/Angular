import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/services/assignments.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Assignment } from './assignment.model';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements AfterViewInit, OnInit {
  titre="Liste des devoirs";
  assignmentSelectionne!:Assignment;
  searchText:string = "";
  displayedColumns: string[] = ['nom', 'classe', 'matiere', 'note', 'rendu', 'dateDeRendu', 'prof', 'image'];
  assignments:Assignment[] = [];
  dataSource = new MatTableDataSource<Assignment>(this.assignments);
  totalAssignments: number = this.assignments.length;
  filterValues: any = {};
  rendu: boolean;
  nonRendu: boolean;
  filterBoolean: boolean;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  constructor(private assignmentsService:AssignmentsService, private _liveAnnouncer: LiveAnnouncer, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.dataSource.sortData = this.sortData();
  }

  ngAfterViewInit() {
    this.assignmentsService.getAssignments()
    .subscribe((assignments: Assignment[]) => {
      this.assignments = assignments
      this.dataSource = new MatTableDataSource<Assignment>(assignments);

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'nom': return item.nom;
          case 'classe': return item.classe;
          case 'matiere': return item.matiere;
          case 'note': return item.note;
          case 'rendu': return item.rendu;
          case 'dateDeRendu': return new Date(item.dateDeRendu);
          case 'prof': return item.prof;
          case 'image': return item.image;
          default: return (item as any)[property];
        }
      }

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

  sortData() {
    let sortFunction = 
    (items: Assignment[], sort: MatSort): Assignment[] =>  {
      if (!sort.active || sort.direction === '') {
        return items;
      }
     return items.sort((a: Assignment, b: Assignment) => {
       let comparatorResult = 0;
       switch (sort.active) {
         case 'note': {
          if (!a.rendu && !b.rendu) {
            comparatorResult = 0;
          } else if (!a.rendu && b.rendu) {
            comparatorResult = -1;
          } else if (a.rendu && !b.rendu) {
            comparatorResult = 1;
          } else {
            comparatorResult = a.note - b.note;
          }
          break;
         }
         case 'nom': comparatorResult = a.nom.localeCompare(b.nom); break;
         case 'classe': comparatorResult = a.classe && b.classe ? a.classe.localeCompare(b.classe) : 0; break;
         case 'matiere': comparatorResult = a.matiere && b.matiere ? a.matiere.localeCompare(b.matiere) : 0; break;
         case 'prof': comparatorResult = a.prof && b.prof ? a.prof.localeCompare(b.prof) : 0; break;
         case 'rendu':
          comparatorResult = (a.rendu === b.rendu) ? 0 : a.rendu ? -1 : 1;
          break;
         case 'dateDeRendu':
          var firstDate = new Date(a.dateDeRendu);
          var secondDate = new Date(b.dateDeRendu);
          comparatorResult = firstDate.getTime() - secondDate.getTime();
          break;
         default:
          comparatorResult = a.nom.localeCompare(b.nom);
          break;
       }
       return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
      });
    };
    return sortFunction;
   }

  announceSortChange(sortState: Sort) {
    // TODO : On en fait quoi ?
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

    this.dataSource.sortData = this.sortData();
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