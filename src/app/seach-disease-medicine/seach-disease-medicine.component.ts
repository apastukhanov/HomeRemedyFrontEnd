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

  // pagination
  searchResults: any = [];
  selectedItems: any = [];
  selectedDropdown: any = "diseases";

  constructor(
    private diseaseService: DiseaseService,
    private symptomService: SymptomService,
    private diseaseMedicineService: DiseaseMedicineService,
    private diseaseSymptomService: DiseaseSymptomService
  ) {
  }

  ngOnInit() {
    this.loadItems();
    console.log(this.searchResults);
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
                  url:`show/disease/${el[0]["diseaseId"]}`,
                name: el[0]['name'], countItems: el[1],
                itemNames: el[2]})
            })
            this.items.sort((a: any, b: any) => b.countItems - a.countItems);
            console.log(this.items);
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
                url:`show/medicine/${el[0]["medicineId"]}`,
                name: el[0]['name'], countItems: el[1],
                itemNames: el[2]})
          })
          this.items.sort((a: any, b: any) => b.countItems - a.countItems);
          console.log(this.items);
        },
        (error) => {
          console.error('Error fetching symptoms:', error);
        }
      );;
    }
    else {
      return
    }

  }

  toggleItemSelection(medicine: any, $event: MouseEvent) {

  }

  searchItem() {
    console.log("toggle search btn");
    this.currentPage = 0;
    this.loadItems();

  }

  captureSearchText(searchTerm: { term: string; items: any[] }) {
    this.searchTermItem = searchTerm['term'];
    if (this.searchTermItem && this.searchTermItem.length > 2) {
      console.log(this.searchTermItem);
      console.log(this.selectedDropdown);
      this.onSearch();
    }
  }

  onItemSelect($event: any) {

  }

  updateItems() {
    this.searchResults = [];
    this.selectedItems = [];
    console.log(this.selectedDropdown);

  }

  private onSearch() {
    if (this.selectedDropdown === 'symptoms') {
      console.log('search symptoms');
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
          console.log(data);
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
}
