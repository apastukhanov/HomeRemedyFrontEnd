import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Router} from "@angular/router";
import {SymptomService} from "../services/symptom.service";

import {FormsModule} from "@angular/forms";
import {Symptom} from "../models/symptom";

@Component({
  selector: 'app-edit-symptom',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-symptom.component.html',
  styleUrl: './edit-symptom.component.css'
})
export class EditSymptomComponent implements OnInit {
  symptom: Symptom = new Symptom(1, '12345', 'Example Description'); // Initialize with default values

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private symptomService: SymptomService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(<string>params.get('id'), 0);
      if (id !== null) {
        this.symptomService.findById(id).subscribe(data => {
          this.symptom = data;
        });
      }
    });
  }

  onSubmit() {
    this.symptomService.save(this.symptom).subscribe(() => {
      (<any>this.router).navigate(['/symptom']);
    });
  }

  onCancel() {
    // (<any>this.router).navigate(['/symptom']); // Navigate to the symptom list component
  }
}
