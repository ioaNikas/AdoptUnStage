import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { CustomValidators } from '../../../services/custom-validators';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { AlertService } from '../../../services/alert.service';
import { CollegeService } from '../../../services/college.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-infos-stagiaire',
  templateUrl: './infos-stagiaire.component.html',
  styleUrls: ['./infos-stagiaire.component.css']
})
export class InfosStagiaireComponent implements OnInit {

  public formUpdate: FormGroup;
  public formUpdatePassword: FormGroup;
  private username;
  private stagiaire: any;
  private submitForm: boolean = false;
  private submitFormPassword: boolean = false;
  colleges: Observable<any>;

  constructor(private token: TokenStorageService,
              private stagiaireService: StagiaireService,
              private alertService: AlertService,
              private collegeService: CollegeService,
              private fb: FormBuilder) {
    this.formUpdate = this.updateSignupForm();
    this.formUpdatePassword = this.updateSignupFormPassword();
  }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.stagiaireService
      .getStagiaire(this.username)
      .subscribe(data => {
        this.stagiaire = data;
        this.formUpdate.setValue({
          prenom: this.stagiaire.prenom,
          name: this.stagiaire.name,
          etablissement: this.stagiaire.etablissement,
          ville: this.stagiaire.ville,
          codePostal: this.stagiaire.codePostal,
          email: this.stagiaire.email,
          confirmMail: this.stagiaire.email
        });
    this.collegeService.getCollegesList()
    .subscribe(
      data => {
      this.colleges = data;
      console.log (this.colleges);
    });
      },
        error => console.log("Une erreur est survenue."));
  }

  updateSignupForm(): FormGroup {
    return this.fb.group(
      {
        prenom: [
          null,
          Validators.compose([Validators.required])
        ],
        name: [
          null,
          Validators.compose([Validators.required])
        ],
        etablissement: [
          null,
          Validators.compose([Validators.required])
        ],
        ville: [
          null,
          Validators.compose([Validators.required])
        ],
        codePostal: [
          null,
          Validators.compose([Validators.required])
        ],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        confirmMail: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ]
      },
      {
        validator: [CustomValidators.mailMatchValidator]
      }
    );
  }

  updateSignupFormPassword(): FormGroup {
    return this.fb.group(
      {
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            /* 
             * CustomValidators.patternValidator(
             *  /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
             *  {
             *    hasSpecialCharacters: true
             *  }
             *  ), 
            */
            Validators.minLength(6)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        validator: [CustomValidators.passwordMatchValidator]
      }
    );
  }

  onSubmit() {
    this.submitFormPassword = false;
    this.submitForm = true;
    if (this.formUpdate.value.email == null) { this.formUpdate.value.email = this.stagiaire.email };
    this.formUpdate.value.username = this.formUpdate.value.email;
    console.log(this.formUpdate.value)
    this.stagiaireService.updateStagiaire(this.stagiaire.id, this.formUpdate.value)
      .subscribe(
        data => {
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
        },
        error => {
          this.alertService.error('Une erreur est servenue. L\'email renseigné est peut-être déjà utilisé.', true);
        });
  }

  onSubmitPassword() {
    this.submitForm = false;
    this.submitFormPassword = true;
    this.stagiaireService.updateStagiairePassword(this.stagiaire.id, this.formUpdatePassword.value)
      .subscribe(
        data => {
          this.alertService.success('Votre mot de passe a bien été modifié !', true);
        },
        error => {
          this.alertService.error('Une erreur est servenue.', true);
        });
    this.formUpdatePassword.reset();
  }
}
