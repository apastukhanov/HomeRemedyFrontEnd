import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ActivatedRoute, Router} from "@angular/router";
import {MedicineService} from "../services/medicine.service";
import {DiseaseService} from "../services/disease.service";
import {MedicineUseService} from "../services/medicine-use.service";
import {DiseaseMedicineService} from "../services/disease-medicine.service";
import {Symptom} from "../models/symptom";
import {SymptomService} from "../services/symptom.service";
import {DiseaseSymptomService} from "../services/disease-symptom.service";
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-seach-disease-medicine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule],
  templateUrl: './seach-disease-medicine.component.html',
  styleUrl: './seach-disease-medicine.component.css'
})
export class SeachDiseaseMedicineComponent implements OnInit {
  items: any = []
  searchTerm: string = '';
  searchTermItem: string = '';
  currentPage: number = 0;
  pageSize = 10;
  totalItems = 10; // Total number of items
  private nameColors: { [key: string]: string } = {};

  // pagination
  searchResults: any = [];
  selectedItems: any = [];
  selectedDropdown: any = "diseases";

  searchInputControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);

  constructor(
    private diseaseService: DiseaseService,
    private symptomService: SymptomService,
    private diseaseMedicineService: DiseaseMedicineService,
    private diseaseSymptomService: DiseaseSymptomService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.loadItems();
  }


  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadItems();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadItems();
    }
  }

  lastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages - 1;
      this.loadItems();
    }
  }

  firstPage() {
    if (this.currentPage > 0) {
      this.currentPage=0;
      this.loadItems();
    }
  }


  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }


  private loadItems() {
    if (this.selectedDropdown === 'symptoms') {
        this.diseaseSymptomService.findBySymptoms(this.selectedItems).subscribe(
          (results) => {
            this.items = [];
            let data: [] = results;
            data.forEach( el => {
              this.items.push(
                {disease: el[0],
                  url:`disease/show/${el[0]["diseaseId"]}`,
                name: el[0]['name'], countItems: el[1],
                itemNames: el[2]})
            })
            this.items.sort((a: any, b: any) => b.countItems - a.countItems);
          },
          (error) => {
            console.error('Error fetching symptoms:', error);
          }
        );
    }
    else if (this.selectedDropdown === 'diseases') {
      this.diseaseMedicineService.findByDiseases(this.selectedItems).subscribe(
        (results) => {
          this.items = [];
          let data: [] = results;
          data.forEach( el => {
            this.items.push(
              {medicine: el[0],
                url:`medicine/show/${el[0]["medicineId"]}`,
                name: el[0]['name'], countItems: el[1],
                itemNames: el[2]})
          })
          this.items.sort((a: any, b: any) => b.countItems - a.countItems);
        },
        (error) => {
          console.error('Error fetching symptoms:', error);
        }
      );
    }
    else {
      return
    }

  }

  toggleItemSelection(medicine: any, $event: MouseEvent) {

  }

  searchItem() {
    this.currentPage = 0;
    this.loadItems();

  }

  captureSearchText(searchTerm: { term: string; items: any[] }) {
    this.searchTermItem = searchTerm['term'];
    if (this.searchTermItem && this.searchTermItem.length > 2) {
      this.onSearch();
    }
  }

  onItemSelect($event: any) {

  }

  updateItems() {
    this.searchResults = [];
    this.selectedItems = [];

  }

  private onSearch() {
    if (this.selectedDropdown === 'symptoms') {
      this.symptomService.findAllOnPage(0, 10, this.searchTermItem).subscribe(
        (results) => {
          this.searchResults = [];
          let data: [] = results["content"];
          data.forEach(s => {
            s["itemSearchField"] = s["description"];
            this.searchResults.push(s);
          });
        },
        (error) => {
          console.error('Error fetching symptoms:', error);
        }
      );
    } else if (this.selectedDropdown === 'diseases') {
      this.diseaseService.findAllOnPage(0, 10, this.searchTermItem).subscribe(
        (results) => {
          this.searchResults = [];
          let data: [] = results["content"];
          data.forEach(s => {
            s["itemSearchField"] = s["name"];
            this.searchResults.push(s);
          });
        },
        (error) => {
          console.error('Error fetching symptoms:', error);
        }
      );
    } else {
      return
    }
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  processItemNames(itemNames: string) {
    return itemNames.split(',').map(name => {
      const trimmedName = name.trim();

      if (!this.nameColors[trimmedName]) {
        this.nameColors[trimmedName] = this.generateLightColor();
      }

      return {
        name: trimmedName,
        color: this.nameColors[trimmedName]
      };
    });
  }

  private generateLightColor(): string {
    const lightColor = Math.floor(Math.random() * 0x666666 + 0x999999);
    return '#' + lightColor.toString(16);
  }
}
