import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Medicine} from "../models/medicine";

@Injectable({
  providedIn: 'root'
})
export class MedicineUseService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/medicineuses';
  }

  public findAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  public findByMedicine(medicine: Medicine): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/medicine`, medicine);
  }
}
