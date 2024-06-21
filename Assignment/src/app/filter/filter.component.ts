import { Component, EventEmitter, Output } from '@angular/core';
import { SwapiService } from '../service/swapi.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../service/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  movies: any[] = [];
  species: any[] = [];
  starships: any[] = [];
  vehicles: any[] = [];
  birthYears: any[] = [];

  selectedMovie: string = '';
  selectedSpecies: string = '';
  selectedStarship: string = '';
  selectedVehicle: string = '';
  birthYearRange: string = '';
  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private swapiService: SwapiService, 
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.swapiService.getFilms().subscribe(data => {
      this.movies = data.results;
    });

    this.swapiService.getSpecies().subscribe(data => {
      this.species = data.results;
    });

    this.swapiService.getStarships().subscribe(data => {
      this.starships = data.results;
    });

    this.swapiService.getVehicles().subscribe(data => {
      this.vehicles = data.results;
    });

    this.swapiService.getPeople().subscribe(data => {
      this.birthYears = data.results;
    });

    // this.birthYears = ['before 0 BBY', '0-10 BBY', '10-20 BBY', '20-30 BBY', 'after 30 BBY'];
  }
  
  applyFilter() {
    const criteria = {
      movie: this.selectedMovie,
      species: this.selectedSpecies,
      starship: this.selectedStarship,
      vehicle: this.selectedVehicle,
      birthYearRange: this.birthYearRange
    };
    this.filterService.updateCriteria(criteria);
  }

}
