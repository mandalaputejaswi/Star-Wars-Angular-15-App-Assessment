import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../service/swapi.service';
import { FilterService } from '../service/filter.service';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  species: string[] = [];
  speciesMap: { [url: string]: string } = {};
  displayedColumns: string[] = ['sno', 'name', 'birthYear'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private swapiService: SwapiService, private filterService: FilterService, private router: Router) { }

  ngOnInit(): void {
    this.swapiService.getPeople().subscribe(data => {
      this.characters = data.results;
      this.fetchAdditionalCharacterData(this.characters);
      this.applyInitialFilters();
    });

    this.filterService.currentCriteria.subscribe(criteria => {
      this.filterCharacters(criteria);
    });
  }

  fetchAdditionalCharacterData(characters: any) {
    console.log("Hi",this.characters)
    const characterObservables = characters.map((character: any) => {

      const speciesObservables = character.species.map((speciesUrl: any) => this.swapiService.getUrl(speciesUrl));
      forkJoin(speciesObservables).subscribe((species: any) => {
        this.species = (species.map((specie: any) => specie.name)).join(",");
      });
    });
  
    forkJoin(characterObservables).subscribe(() => {
      this.dataSource.data = this.characters;
      console.log('All characters with species:', this.characters);
    });
  }

  applyInitialFilters() {
    this.filteredCharacters = [...this.characters];
    this.dataSource.data = this.filteredCharacters;
  }

  filterCharacters(criteria: any) {
    this.filteredCharacters = this.characters.filter(character => {
      const matchesMovies = criteria.movie.length ? character.films.includes(criteria.movie) : true;
      const matchesSpecies = criteria.species.length ? character.species.includes(criteria.species) : true;
      const matchesStarships = criteria.starship.length ? character.starships.includes(criteria.starship) : true;
      const matchesVehicles = criteria.vehicle.length ? character.vehicles.includes(criteria.vehicle) : true;
      const matchesBirthYears = criteria.birthYearRange.length ? character.birth_year.includes(criteria.birthYearRange) : true;

      return matchesMovies && matchesSpecies && matchesStarships && matchesVehicles && matchesBirthYears;
    });

    this.dataSource.data = this.filteredCharacters;
  }

  onRowClick(character: any) {
    const id = character.url.split('/').filter(Boolean).pop(); // Extracting ID from URL
    this.router.navigate(['/characters', id]);
  }

  getSpeciesName(speciesUrl: string) {
    const x = this.swapiService.getUrl(speciesUrl);
    console.log("x", x);
    forkJoin(x).subscribe((species: any) => {
      this.species = species.map((specie: any) => specie.name);
    });
  }
}

