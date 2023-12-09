import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http'; // Corrected

import { AppComponent } from './app.component';
import {ActivatedRoute, RouterModule} from '@angular/router'; // Corrected
import { routes } from "./app.routes";
import {FormsModule} from "@angular/forms";
import {EditSymptomComponent} from "./edit-symptom/edit-symptom.component";
import {SymptomListComponent} from "./symptom-list/symptom-list.component";
import {DiseaseListComponent} from "./disease-list/disease-list.component";
import {MedicineListComponent} from "./medicine-list/medicine-list.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),

    ],
    // providers: [
    //   provideHttpClient(withFetch()),
    // ],
    // bootstrap: [AppComponent]
})
export class AppModule { }
