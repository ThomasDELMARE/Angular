import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  // Pour le formulaire
  nomDevoir = '';
  professeur = '';
  description = '';
  matiere = '';
  classe = '';
  image = '';
  dateDeRendu!: Date;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Fermer", {
      duration: 3000
    });
  }

  getAssignment() {
    const id: number = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;

      this.assignment = assignment;
      this.nomDevoir = assignment.nom;
      this.professeur = assignment.prof;
      this.description = assignment.description;
      this.matiere = assignment.matiere;
      this.classe = assignment.classe;
      this.image = assignment.image;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }
  onSaveAssignment() {
    if (!this.nomDevoir || !this.professeur|| !this.description|| !this.matiere|| !this.classe|| !this.image|| !this.dateDeRendu) return;
    if (!this.assignment) return;

    this.assignment.nom = this.nomDevoir;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.prof = this.professeur;
    this.assignment.description = this.description;
    this.assignment.matiere = this.matiere; 
    this.assignment.classe = this.classe; 
    this.assignment.image = this.image;

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        this.openSnackBar('Modification du devoir enregistré en base de données');
      });
  }
}
