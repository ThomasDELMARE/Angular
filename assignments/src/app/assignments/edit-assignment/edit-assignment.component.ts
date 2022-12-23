import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Exemple de récupération de ce qui suit le ? dans l'URL
    // const nom = this.route.snapshot.queryParams['nom'];
    // fragment (ce qui suit le # dans l'URL)
    // const fragment = this.route.snapshot.fragment;
    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans l'url
    // Le + force la conversion en number
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

    // On modifie l'assignment
    this.assignment.nom = this.nomDevoir;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.prof = this.professeur;
    this.assignment.description = this.description;
    this.assignment.matiere = this.matiere; 
    this.assignment.classe = this.classe; 
    this.assignment.image = this.image;

    // On envoie l'assignment modifié au service
    // qui va faire la requête HTTP
    // On va naviguer vers la page d'accueil
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // et on navigue vers la page d'accueil qui affiche
        // la liste des assignments
        this.router.navigate(['/home']);
      });
  }
}
