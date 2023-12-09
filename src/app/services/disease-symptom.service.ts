import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Disease} from "../models/disease";
import {Symptom} from "../models/symptom";

@Injectable({
  providedIn: 'root'
})
export class DiseaseSymptomService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/disease-symptoms';
  }

  public findAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  public findAllOnPage(page: number, size: number, name: string | null): Observable<any> {
    let queryParams = `?page=${page}&size=${size}`;
    if (name !== null && name !== undefined && name !== '') {
      queryParams += `&name=${encodeURIComponent(name)}`;
      return this.http.get<any>(`${this.baseUrl}/search${queryParams}`);
    }
    return this.http.get<any>(`${this.baseUrl}${queryParams}`);
  }
  public findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  public findByDisease(disease: Disease): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/disease`, disease);
  }

  public findBySymptoms(symptoms: Symptom[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/symptoms`, symptoms);
  }

  public deleteById(id: number): Observable<any> {
    console.log(`in service deleting ${id}`);
    const url = `${this.baseUrl}/${id}`;
    console.log(url);
    return this.http.delete<any>(url).pipe(
        catchError((error) => {
          console.error('Error deleting:', error);
          return throwError(error); // Rethrow the error to propagate it to the caller
        })
    );
  }

  public save(disease: Disease) {
    return this.http.post<Disease>(`${this.baseUrl}/extended`, disease);
  }
}
