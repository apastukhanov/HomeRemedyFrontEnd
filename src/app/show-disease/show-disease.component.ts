import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Symptom} from "../models/symptom";
import {DiseaseService} from "../services/disease.service";
import {DiseaseSymptomService} from "../services/disease-symptom.service";
import {SymptomService} from "../services/symptom.service";

@Component({
  selector: 'app-show-disease',
  standalone: true,
    imports: [CommonModule, FormsModule, NgSelectModule, ReactiveFormsModule, RouterLink],
  templateUrl: './show-disease.component.html',
  styleUrl: './show-disease.component.css'
})
export class ShowDiseaseComponent implements OnInit {
  disease: any = {umlsCode: 'UMLSDiseaseD', name: 'Disease Name', symptoms: []}
  symptomSearchTerm: string = '';
  selectedSymptoms: Symptom[] = [];
  searchResults: Symptom[] = [];

  constructor(
    private router: Router,
    private diseaseService: DiseaseService,
    private diseaseSymptomService: DiseaseSymptomService,
    private symptomService: SymptomService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("init");
    this.loadDisease();
    console.log(this.searchResults);
  }

  loadDisease() {
    const diseaseId = this.activatedRoute.snapshot.params['id'];
    if (diseaseId) {
      this.diseaseService.findById(diseaseId).subscribe(
        (data) => {
          this.disease = {
            diseaseId: data['diseaseId'],
            umlsCode: data['umlsCode'],
            name: data['name']
          };

          // Fetch symptoms associated with the disease
          this.diseaseSymptomService.findByDisease(this.disease).subscribe(
            (symptoms) => {
              this.selectedSymptoms = symptoms;
            },
            (error) => {
              console.error('Error fetching symptoms for the disease:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching disease:', error);
        }
      );
    }
  }

  // Rest of the methods (searchSymptoms, addSymptom, captureSearchText, onSearch, onItemSelect) remain similar
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


  captureSearchText(searchTerm: { term: string; items: any[] }) {
    this.symptomSearchTerm = searchTerm['term'];
    if (this.symptomSearchTerm && this.symptomSearchTerm.length > 2) {
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

  onSubmit() {
    this.diseaseService.save(this.disease).subscribe(data => {
      this.router.navigate(['/disease']);
    }, error => {
      console.error('Error updating disease:', error);
    });
  }
}
