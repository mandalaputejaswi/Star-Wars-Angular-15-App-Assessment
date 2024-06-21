import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private baseUrl: string = "https://swapi.dev/api/";

  constructor(private http: HttpClient) { }

  getPeople(): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/`);
  }

  getPerson(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}/`);
  }

  getFilms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/films/`);
  }

  getPlanet(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/planets/${id}/`);
  }

  getSpecies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/species/`);
  }

  getStarships(): Observable<any> {
    return this.http.get(`${this.baseUrl}/starships/`);
  }

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles/`);
  }

  getUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}
