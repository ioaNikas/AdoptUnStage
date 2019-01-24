import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { Entreprise } from 'src/app/modeles/entreprise';

@Component({
  selector: 'app-description-entreprise',
  templateUrl: './description-entreprise.component.html',
  styleUrls: ['./description-entreprise.component.css']
})
export class DescriptionEntrepriseComponent implements OnInit {

  @Input() offre: Offre;
  @Input() entreprise: Entreprise;

  constructor() { }

  ngOnInit() {
  }

}
