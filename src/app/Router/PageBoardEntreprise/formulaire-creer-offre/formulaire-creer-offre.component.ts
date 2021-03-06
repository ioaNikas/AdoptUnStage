import { Component, OnInit, Input } from '@angular/core';

import { Offre } from 'src/app/modeles/offre';
import { OffreService } from 'src/app/services/offre.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/services/custom-validators';

import { FormControl } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-creer-offre',
  templateUrl: './formulaire-creer-offre.component.html',
  styleUrls: ['./formulaire-creer-offre.component.css']
})
export class FormulaireCreerOffreComponent implements OnInit {

  // @Input() formData: any = [];
  username: string;
  public formOffre: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private offreService: OffreService,
    private token: TokenStorageService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router) { }

    get f() { return this.formOffre.controls; }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const offre: Offre = this.formOffre.value;

    if (this.formOffre.invalid) {
      return;
    }
    this.router.navigate(['../boardentreprise/gestionoffres']);
    this.offreService.createOffre(this.username, offre)
      .subscribe(data => {
        this.alertService.success('Votre offre à bien été créée. Vous pouvez la modifier si nécessaire.', true);
      }, error => console.log(error));
    Object.keys(this.formOffre.controls).forEach(key => {
      this.formOffre.controls[key].setErrors(null)
    });
  }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.formOffre = this.fb.group({
      titre: [
        '',
        Validators.required
      ],
      description: [
        '',
        Validators.required
      ],
      dateDebut: [
        '',
        Validators.required
      ],
      dateFin: [
        '',
        Validators.required
      ],
      rue: [
        '',
        Validators.required
      ],
      ville: [
        '',
        Validators.required
      ],
      codePostal: [
        '',
        Validators.required
      ]
    })

  }

}
