import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from '../assignment.model';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})

export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis!: Assignment | undefined;
  isAdmin: boolean;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  // Appelé AVANT l'affichage du composant, fait partie du
  // cycle de vie du composant
  ngOnInit(): void {
    this.authService.isAdmin()
      .then((isAdmin: any) => {
        this.isAdmin = isAdmin;
      });

    this.getAssignment();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Fermer", {
      duration: 3000
    });
  }

  getAssignment() {
    // on récupère l'id dans l'url
    // Le + force la conversion en number
    const id: number = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;
    this.assignmentTransmis.rendu = true;
    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

  modifierAssignment(devoir: Assignment) {
    this.router.navigate(['/assignment/' + devoir.id + '/edit']);
  }

  onDeleteAssignment() {
    var result = confirm('Etes-vous sûr de vouloir supprimer ce devoir ?');

    if (result == true) {
      if (!this.assignmentTransmis) return;

      this.assignmentsService
        .deleteAssignment(this.assignmentTransmis)
        .subscribe((reponse) => {
          console.log(reponse.message);
          this.openSnackBar('Suppression effectuée');
          this.assignmentTransmis = undefined;
          // et on navigue vers la page d'accueil qui affiche
          // la liste des assignments
          this.router.navigate(['/home']);
        });
    } else {
      this.openSnackBar('Suppression annulée');
      return;
    }
  }
}