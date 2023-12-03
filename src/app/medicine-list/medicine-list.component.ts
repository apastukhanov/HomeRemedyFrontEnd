import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Medicine} from "../models/medicine";
import {MedicineService} from "../services/medicine.service";

@Component({
  selector: 'app-medicine-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './medicine-list.component.html',
  styleUrl: './medicine-list.component.css'
})
export class MedicineListComponent implements OnInit {

  medicines: Medicine[] = [];

  constructor(private medicineService: MedicineService) {
  }

  ngOnInit() {
    this.medicineService.findAll().subscribe(data => {
      this.medicines = data["content"];
    }, error => console.log(error));
  }

}
