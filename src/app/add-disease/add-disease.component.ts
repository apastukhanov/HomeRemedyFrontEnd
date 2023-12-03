import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {SymptomService} from "../services/symptom.service";
import {DiseaseService} from "../services/disease.service";
import {Symptom} from "../models/symptom";
import { NgSelectModule } from '@ng-select/ng-select';
import {DiseaseSymptomService} from "../services/disease-symptom.service";


@Component({
  selector: 'app-add-disease',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgSelectModule],
  templateUrl: './add-disease.component.html',
  styleUrls: ['./add-disease.component.css']
})
export class AddDiseaseComponent implements OnInit {
  disease: any = {umlsCode: 'UMLSDiseaseD', name: 'Disease Name', symptoms: []};

  symptomSearchTerm: string = '';
  searchResults: Symptom[] = [];

  constructor(
      private router: Router,
      private diseaseService: DiseaseService,
      private symptomService: SymptomService
  ) {}

  ngOnInit() {

  }

  searchSymptoms() {

  }

  addSymptom(symptoms: Symptom[]) {
    this.disease.symptoms = [];
    if (symptoms.length > 0 ) {
      symptoms.forEach(s => {
        if (this.disease.symptoms.indexOf(s) === -1) {
          this.disease.symptoms.push( {symptomId: s["symptomId"], umlsCode: s["umlsCode"],
            description: s["description"]});
        }
      })
    }
  }

  onSubmit() {
    this.diseaseService.save(this.disease).subscribe(data => {
      this.router.navigate(['/disease']);
    }, error => {
      console.error('Error saving disease:', error);
    });
  }

  captureSearchText(searchTerm: { term: string; items: any[] }) {
    this.symptomSearchTerm = searchTerm['term'];
    if (this.symptomSearchTerm && this.symptomSearchTerm.length > 2) { // Optional: check for minimum length
      this.onSearch();
    }
  }

  onSearch() {
    if (this.symptomSearchTerm !== '') {
      this.symptomService.findAllOnPage(0, 10, this.symptomSearchTerm).subscribe(
          (results) => {
            this.searchResults = results["content"];
          },
          (error) => {
            console.error('Error fetching symptoms:', error);
          }
      );
    }
  }

  onItemSelect($event: any) {
    this.addSymptom($event);
  }
}
