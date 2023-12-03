import {Component, OnInit} from '@angular/core';
import {Disease} from "../models/disease";
import {DiseaseService} from "../services/disease.service";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-disease-list',
  imports: [CommonModule, RouterLink, FormsModule],
  standalone: true,
  templateUrl: './disease-list.component.html',
  styleUrl: './disease-list.component.css'
})
export class DiseaseListComponent implements OnInit {

  diseases: Disease[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize = 10;
  totalItems = 10; // Total number of diseases

  constructor(private diseaseService: DiseaseService, private router: Router) {
  }

  ngOnInit() {
    this.loadDiseases();
  }

  editSelectedDisease() {
    console.log(this.diseases.find(disease => disease.selected));
    const selectedDiseases = this.diseases.find(disease => disease.selected);
    if (selectedDiseases) {
      this.router.navigate(['/disease/edit', selectedDiseases.diseaseId]);
    }
  }

  canEditDisease() {
    const selectedCount = this.diseases.filter(disease => disease.selected).length;
    return selectedCount === 1;
  }

  deleteSelectedDisease() {
    const selectedSymptoms = this.diseases.filter(disease => disease.selected);

    selectedSymptoms.forEach(disease => {
      if (disease.diseaseId !== null) {
        this.diseaseService.deleteById(disease.diseaseId).subscribe(() => {
          this.diseases = this.diseases.filter(s => s.diseaseId !== disease.diseaseId);
          console.log(`${disease.diseaseId} - deleted successful`);
        }, error => console.log(error));
      }
    });
    this.loadDiseases();
  }

  searchDisease() {
    this.currentPage = 0;
    this.loadDiseases();
  }

  selectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.diseases.forEach(disease => disease.selected = checkbox.checked);
  }

  toggleDiseaseSelection(disease: Disease, event: Event) {
    disease.selected = !disease.selected;
    event.stopPropagation();
  }

  loadDiseases() {
    this.diseaseService.findAllOnPage(this.currentPage, this.pageSize, this.searchTerm).subscribe(data => {
      this.diseases = data["content"];
      this.totalItems = data["totalElements"];
    }, error => console.log(error));
  }

  // pagination
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadDiseases();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadDiseases();
    }
  }

  lastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages - 1;
      this.loadDiseases();
    }
  }

  firstPage() {
    if (this.currentPage > 0) {
      this.currentPage=0;
      this.loadDiseases();
    }
  }

  searchSymptoms() {
    this.currentPage = 0;
    this.loadDiseases();
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
