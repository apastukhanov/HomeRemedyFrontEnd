import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Symptom} from "../models/symptom";
import {Router, RouterLink} from "@angular/router";
import {DiseaseService} from "../services/disease.service";
import {SymptomService} from "../services/symptom.service";
import {MedicineService} from "../services/medicine.service";
import {Disease} from "../models/disease";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";

@Component({
  selector: 'app-add-medicine',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, RouterLink],
  templateUrl: './add-medicine.component.html',
  styleUrl: './add-medicine.component.css'
})
export class AddMedicineComponent implements OnInit {
  medicine: any = {name: 'Medicine type 1', expirationDate: '2024-12-01',
                    useDescription: 'Take 500 mg a day', diseases: []};

  diseaseSearchTerm: string = '';
  searchResults: Symptom[] = [];


  constructor(
      private router: Router,
      private medicineService: MedicineService,
      private diseaseService: DiseaseService
  ) {
  }

  ngOnInit() {

  }

  addDisease(diseases: Disease[]) {
    this.medicine.diseases = [];
    if (diseases.length > 0 ) {
      diseases.forEach(s => {
        if (this.medicine.diseases.indexOf(s) === -1) {
          this.medicine.diseases.push( {diseaseId: s["diseaseId"],
                                          umlsCode: s["umlsCode"],
                                          name: s["name"]});
            }
          })
      }
  }

  onSubmit() {
    console.log(this.medicine);
    this.medicineService.save(this.medicine).subscribe(data => {
      this.router.navigate(['/medicine']);
    }, error => {
      console.error('Error saving disease:', error);
    });
  }

  captureSearchText(searchTerm: { term: string; items: any[] }) {
    this.diseaseSearchTerm = searchTerm['term'];
    if (this.diseaseSearchTerm && this.diseaseSearchTerm.length > 2) { // Optional: check for minimum length
      this.onSearch();
    }
  }

  onSearch() {
    if (this.diseaseSearchTerm !== '') {
      this.diseaseService.findAllOnPage(0, 10, this.diseaseSearchTerm).subscribe(
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
    this.addDisease($event);
  }

}
