import { Routes } from '@angular/router';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import {DiseaseListComponent} from "./disease-list/disease-list.component";
import {SymptomListComponent} from "./symptom-list/symptom-list.component";
import {EditSymptomComponent} from "./edit-symptom/edit-symptom.component";
import {AddSymptomComponent} from "./add-symptom/add-symptom.component";
import {AddDiseaseComponent} from "./add-disease/add-disease.component";
import {EditDiseaseComponent} from "./edit-disease/edit-disease.component";
import {AddMedicineComponent} from "./add-medicine/add-medicine.component";
import {EditMedicineComponent} from "./edit-medicine/edit-medicine.component";
import {SeachDiseaseMedicineComponent} from "./seach-disease-medicine/seach-disease-medicine.component";
import {ShowDiseaseComponent} from "./show-disease/show-disease.component";
import {ShowMedicineComponent} from "./show-medicine/show-medicine.component";

export const routes: Routes = [
    {
      path: 'medicine',
      component: MedicineListComponent,
      title: 'Medicine'
    },
    {
      path: 'disease',
      component: DiseaseListComponent,
      title: 'Disease'
    },
    {
      path: 'symptom',
      component: SymptomListComponent,
      title: 'Symptom'
    },
    {
      path: 'symptoms/edit/:id',
      component: EditSymptomComponent,
      title: 'Edit Symptom'
    },
    {
      path: 'symptoms/add',
      component: AddSymptomComponent,
      title: 'Add Symptom'
    },
    {
        path: 'disease/add',
        component: AddDiseaseComponent,
        title: 'Add Disease'
    },
    {
        path: 'disease/edit/:id',
        component: EditDiseaseComponent,
        title: 'Edit Disease'
    },
    {
      path: 'medicine/add',
      component: AddMedicineComponent,
      title: 'Add Medicine'
    },
    {
      path: 'medicine/edit/:id',
      component: EditMedicineComponent,
      title: 'Edit Medicine'
    },
    {
      path: 'search',
      component: SeachDiseaseMedicineComponent,
      title: 'Edit Medicine'
    },
    {
      path: 'show/disease/:id',
      component: ShowDiseaseComponent,
      title: 'Disease'
    },
    {
      path: 'show/medicine/:id',
      component: ShowMedicineComponent,
      title: 'Disease'
    }
];
