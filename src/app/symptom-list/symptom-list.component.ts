import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Symptom} from "../models/symptom";
import {SymptomService} from "../services/symptom.service";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-symptom-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './symptom-list.component.html',
  styleUrl: './symptom-list.component.css'
})
export class SymptomListComponent {
  symptoms: Symptom[] = [];
  currentPage = 0;
  pageSize = 10; // Set the number of items per page
  totalItems = 10; // Total number of symptoms
  searchTerm: string = '';

  constructor(private symptomService: SymptomService,  private router: Router) {

  }

  ngOnInit() {
    this.loadSymptoms();
  }

  loadSymptoms() {
    this.symptomService.findAllOnPage(this.currentPage, this.pageSize, this.searchTerm).subscribe(data => {
      this.symptoms = data["content"];
      this.totalItems = data["totalElements"];
    }, error => console.log(error));
  }

  deleteSymptom(id: number | null) {
    if (id !== null) {
      this.symptomService.deleteById(id).subscribe(() => {
        this.loadSymptoms();
        console.log(`${id} - deleted successful`)});
    }
  }


  deleteSelectedSymptoms() {
    const selectedSymptoms = this.symptoms.filter(symptom => symptom.selected);

    selectedSymptoms.forEach(symptom => {
      if (symptom.symptomId !== null) {
        this.symptomService.deleteById(symptom.symptomId).subscribe(() => {
          this.symptoms = this.symptoms.filter(s => s.symptomId !== symptom.symptomId);
          console.log(`${symptom.symptomId} - deleted successful`);
        }, error => console.log(error));
      }
    });

    this.loadSymptoms();
  }


  selectSymptom(symptom: Symptom) {

  }

  canEditSymptom(): boolean {
    const selectedCount = this.symptoms.filter(symptom => symptom.selected).length;
    return selectedCount === 1;
  }

  editSelectedSymptom() {
    console.log(this.symptoms.find(symptom => symptom.selected));
    const selectedSymptom = this.symptoms.find(symptom => symptom.selected);
    if (selectedSymptom) {
      this.router.navigate(['/symptoms/edit', selectedSymptom.symptomId]);
    }
  }

  toggleSymptomSelection(symptom: Symptom, event: Event) {
    symptom.selected = !symptom.selected;
    event.stopPropagation();
  }


  selectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.symptoms.forEach(symptom => symptom.selected = checkbox.checked);
  }


  // pagination
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadSymptoms();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadSymptoms();
    }
  }

  lastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages - 1;
      this.loadSymptoms();
    }
  }

  firstPage() {
    if (this.currentPage > 0) {
      this.currentPage=0;
      this.loadSymptoms();
    }
  }

  searchSymptoms() {
    this.currentPage = 0;
    this.loadSymptoms();
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

}
