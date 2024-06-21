import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private criteriaSource = new BehaviorSubject<any>({
    movies: [],
    species: [],
    starships: [],
    vehicles: [],
    birthYears: []
  });

  currentCriteria = this.criteriaSource.asObservable();

  constructor() { }

  updateCriteria(criteria: any) {
    this.criteriaSource.next(criteria);
  }
}
