import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Medicine} from "../models/medicine";
import {MedicineService} from "../services/medicine.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-medicine-list',
  imports: [CommonModule, RouterLink, FormsModule],
  standalone: true,
  templateUrl: './medicine-list.component.html',
  styleUrl: './medicine-list.component.css'
})
export class MedicineListComponent implements OnInit {

  medicines: Medicine[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize = 10;
  totalItems = 10; // Total number of medicine

  constructor(private medicineService: MedicineService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadMedicines();
  }

  private loadMedicines() {
    this.medicineService.findAllOnPage(this.currentPage, this.pageSize, this.searchTerm).subscribe(data => {
      this.medicines = data["content"];
      this.totalItems = data["totalElements"];
    }, error => console.log(error));


  }

  editSelectedMedicine() {
    console.log(this.medicines.find(disease => disease.selected));
    const selectedDiseases = this.medicines.find(medicine => medicine.selected);
    if (selectedDiseases) {
      this.router.navigate(['/medicine/edit', selectedDiseases.medicineId]);
    }
  }

  canEditMedicine() {
    const selectedCount = this.medicines.filter(
                          medicine => medicine.selected).length;
    return selectedCount === 1;
  }

  deleteSelectedMedicine() {
    const selectedMedicine = this.medicines.filter(medicine => medicine.selected);

    selectedMedicine.forEach(medicine => {
      if (medicine.medicineId !== null) {
        this.medicineService.deleteById(medicine.medicineId).subscribe(() => {
          this.medicines = this.medicines.filter(
            s => s.medicineId !== medicine.medicineId);
          console.log(`${medicine.medicineId} - deleted successful`);
        }, error => console.log(error));
      }
    });
    this.loadMedicines();

  }

  searchMedicine() {
    this.currentPage = 0;
    this.loadMedicines();
  }

  // pagination
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMedicines();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMedicines();
    }
  }

  lastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages - 1;
      this.loadMedicines();
    }
  }

  firstPage() {
    if (this.currentPage > 0) {
      this.currentPage=0;
      this.loadMedicines();
    }
  }


  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }


  selectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.medicines.forEach(medicine => medicine.selected = checkbox.checked);
  }

  toggleDiseaseSelection(medicine: Medicine, event: Event) {
    medicine.selected = !medicine.selected;
    event.stopPropagation();
  }
}
