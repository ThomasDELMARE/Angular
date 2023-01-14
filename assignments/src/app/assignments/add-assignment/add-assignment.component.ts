import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, Validators} from '@angular/forms';

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

  devoirForm = this._formBuilder.group({
    nomDevoir: ['', Validators.required],
    description: ['', Validators.required],
    dateDeRendu: [null, Validators.required]
  });
  professeurForm = this._formBuilder.group({
    professeur: ['', Validators.required],
    image: ['', Validators.required]
  });
  classeForm = this._formBuilder.group({
    classe: ['', Validators.required],
    matiere: ['', Validators.required]
  });
  isLinear = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router:Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  ajouterDevoir() {
    // On ajoute un nouvel assignment
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.devoirForm.value.nomDevoir || "";
    nouvelAssignment.description = this.devoirForm.value.description || "";
    nouvelAssignment.dateDeRendu = this.devoirForm.value.dateDeRendu || new Date();
    nouvelAssignment.prof = this.professeurForm.value.professeur || "";
    nouvelAssignment.image = this.professeurForm.value.image || "";
    nouvelAssignment.classe = this.classeForm.value.classe || "";
    nouvelAssignment.matiere = this.classeForm.value.matiere || "";
    nouvelAssignment.rendu = false;

    this.assignmentsService
      .getHighestId()
      .subscribe((foundId) => {
        nouvelAssignment.id = foundId;

        this.assignmentsService
        .addAssignment(nouvelAssignment)
        .subscribe((reponse) => {
          console.log(reponse.message);
        });
      });
  }
}
