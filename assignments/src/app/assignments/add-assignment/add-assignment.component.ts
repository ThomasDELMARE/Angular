import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selectMatiere = '';

  devoirForm = this._formBuilder.group({
    nomDevoir: ['', Validators.required],
    description: ['', Validators.required],
    dateDeRendu: [null, Validators.required]
  });
  professeurForm = this._formBuilder.group({
    professeur: ['', Validators.required],
    image: ['', Validators.required],
    matiere: ['', Validators.required]
  });
  classeForm = this._formBuilder.group({
    classe: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openSnackBar(message: string) {
    this._snackBar.open(message, "Fermer", {
      duration: 3000
    });
  }

  onChangeMatiere(fetchedData: string): void {
    switch(fetchedData) { 
      case fetchedData = "aucun": {
        this.professeurForm.controls['professeur'].setValue("");
        this.professeurForm.controls['image'].setValue("");
        this.professeurForm.controls['matiere'].setValue("");
        break; 
      } 
      case fetchedData = "francais": { 
        this.professeurForm.controls['professeur'].setValue("Monsieur Robert");
        this.professeurForm.controls['image'].setValue("http://dummyimage.com/127x104.png/dddddd/000000");
        this.professeurForm.controls['matiere'].setValue("Français");
        break; 
      }
      case fetchedData = "math": {
        this.professeurForm.controls['professeur'].setValue("Madame Boukobza");
        this.professeurForm.controls['image'].setValue("http://dummyimage.com/241x194.png/ff4444/ffffff");
        this.professeurForm.controls['matiere'].setValue("Mathématiques");
        break; 
      }
      case fetchedData = "svt": { 
        this.professeurForm.controls['professeur'].setValue("Madame Fernandi");
        this.professeurForm.controls['image'].setValue("http://dummyimage.com/189x137.png/dddddd/000000");
        this.professeurForm.controls['matiere'].setValue("Sciences de la vie et de la terre");
        break; 
      }
      case fetchedData = "angular": { 
        this.professeurForm.controls['professeur'].setValue("Monsieur Buffa");
        this.professeurForm.controls['image'].setValue("http://dummyimage.com/214x117.png/cc0000/ffffff");
        this.professeurForm.controls['matiere'].setValue("Angular");
        break; 
      }
      case fetchedData = "anglais": { 
        this.professeurForm.controls['professeur'].setValue("Madame Sisi");
        this.professeurForm.controls['image'].setValue("http://dummyimage.com/100x189.png/5fa2dd/ffffff");
        this.professeurForm.controls['matiere'].setValue("Anglais");
        break; 
      }
      default: { 
        this.professeurForm.controls['professeur'].setValue("");
        this.professeurForm.controls['image'].setValue("");
        this.professeurForm.controls['matiere'].setValue(""); 
        break; 
      }
    }
  }

  ajouterDevoir() {
    // On ajoute un nouvel assignment
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.devoirForm.value.nomDevoir || "";
    nouvelAssignment.description = this.devoirForm.value.description || "";
    nouvelAssignment.dateDeRendu = this.devoirForm.value.dateDeRendu || new Date();
    nouvelAssignment.prof = this.professeurForm.value.professeur || "";
    nouvelAssignment.image = this.professeurForm.value.image || "";
    nouvelAssignment.matiere = this.professeurForm.value.matiere || "";
    nouvelAssignment.classe = this.classeForm.value.classe || "";
    nouvelAssignment.rendu = false;

    this.assignmentsService
      .getHighestId()
      .subscribe((foundId) => {
        nouvelAssignment.id = foundId;

        this.assignmentsService
        .addAssignment(nouvelAssignment)
        .subscribe((reponse) => {
          console.log(reponse.message);
          this.openSnackBar('Ajout dans la base de données réussi');
        });
      });
  }
}
