import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../service/swapi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent {

  characterId!: any;
  character: any;
  films: string[] = [];
  species: string[] = [];
  vehicles: string[] = [];
  starships: string[] = [];
  planets: string[] = [];
  constructor(private route: ActivatedRoute, private swapiService: SwapiService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.characterId = params.get('id');
      this.fetchCharacterDetails();
    });
  }

  fetchCharacterDetails() {
    this.swapiService.getPerson(this.characterId).subscribe(
      (data: any) => {
        this.character = data;
        console.log('char', this.character);
        const filmRequests = this.character.films.map((url: string) => this.swapiService.getUrl(url));
        const speciesRequests = this.character.species.map((url: string) => this.swapiService.getUrl(url));
        const vehicleRequests = this.character.vehicles.map((url: string) => this.swapiService.getUrl(url));
        const starshipRequests = this.character.starships.map((url: string) => this.swapiService.getUrl(url));
        const planetRequest =  this.swapiService.getPlanet(this.characterId);
        console.log(planetRequest)
        forkJoin(filmRequests).subscribe((films: any) => {
          this.films = films.map((film: any) => film.title);
        });
  
        forkJoin(speciesRequests).subscribe((species: any) => {
          this.species = species.map((specie: any) => specie.name);
        });
  
        forkJoin(vehicleRequests).subscribe((vehicles: any) => {
          this.vehicles = vehicles.map((vehicle: any) => vehicle.name);
        });
  
        forkJoin(starshipRequests).subscribe((starships: any) => {
          this.starships = starships.map((starship: any) => starship.name);
        });
      });
  }


}
