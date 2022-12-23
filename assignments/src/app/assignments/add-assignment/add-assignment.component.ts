import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  titre="Formulaire d'ajout de devoirs";
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
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(
      "Ajout de l'assignment en cours"
    );

    // On ajoute un nouvel assignment
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.prof = this.professeur;
    nouvelAssignment.description = this.description;
    nouvelAssignment.matiere = this.matiere;
    nouvelAssignment.classe = this.classe;
    nouvelAssignment.image = this.image;

    this.assignmentsService
      .getHighestId()
      .subscribe((foundId) => {
        console.log("ici", foundId)
        nouvelAssignment.id = foundId;

        console.log("ID ", nouvelAssignment.id)

        // TODO : Vraiment pas fan de ça, faire des calls dans des calls ça pueee
        // Faudrait le bouger dans une autre fonction et voir l'impact
        this.assignmentsService
        .addAssignment(nouvelAssignment)
        .subscribe((reponse) => {
          console.log(reponse.message);
          this.router.navigate(['/home']);
        });
      });
  }
}
