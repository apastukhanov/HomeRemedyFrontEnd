import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Disease} from "../models/disease";
import {ActivatedRoute, Router} from "@angular/router";
import {MedicineService} from "../services/medicine.service";
import {DiseaseService} from "../services/disease.service";
import {MedicineUseService} from "../services/medicine-use.service";
import {DiseaseMedicineService} from "../services/disease-medicine.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-show-medicine',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './show-medicine.component.html',
  styleUrl: './show-medicine.component.css'
})
export class ShowMedicineComponent implements OnInit {
  medicine: any = {name: 'Medicine type 1', expirationDate: '2024-12-01',
    useDescription: 'Take 500 mg a day', diseases: []};

  diseaseSearchTerm: string = '';
  selectedDiseases: Disease[] = [];
  searchResults: Disease[] = [];


  constructor(
    private router: Router,
    private medicineService: MedicineService,
    private diseaseService: DiseaseService,
    private medicineUseService: MedicineUseService,
    private activatedRoute: ActivatedRoute,
    private diseaseMedicineService: DiseaseMedicineService
  ) {
  }

  ngOnInit() {
    console.log("init");
    this.loadMedicine();
    console.log(this.searchResults);
  }

  loadMedicine() {
    const medicineId = this.activatedRoute.snapshot.params['id'];
    if (medicineId) {
      this.medicineService.findById(medicineId).subscribe(
        (data) => {
          this.medicine = {
            medicineId: data['medicineId'],
            name: data['name'],
            expirationDate: data['expirationDate']
          };

          this.diseaseMedicineService.findByMedicine(this.medicine).subscribe(
            (diseases) => {
              this.selectedDiseases = diseases;
              this.medicine.diseases = diseases;
            },
            (error) => {
              console.error('Error fetching diseases for the medicine:', error);
            });

          this.medicineUseService.findByMedicine(this.medicine).subscribe(
            (mu) => {
              this.medicine.useDescription = mu["useDescription"];
            },
            (error) => {
              console.error('Error fetching diseases for the medicine:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching disease:', error);
        }
      );
    }
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
