import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Symptom} from "../models/symptom";
import {SymptomService} from "../services/symptom.service";


@Component({
  selector: 'app-add-symptom',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-symptom.component.html',
  styleUrl: './add-symptom.component.css'
})
export class AddSymptomComponent implements OnInit {
  symptom: any = {umlsCode: 'UMLS12345', description: 'Example Description'};
  constructor(
    private router: Router,
    private symptomService: SymptomService
  ) {}

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.symptom);
    this.symptomService.save(this.symptom).subscribe(() => {
      (<any>this.router).navigate(['/symptom']);
    });
  }


}
