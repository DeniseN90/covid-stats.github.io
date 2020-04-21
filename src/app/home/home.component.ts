import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  countries: string[];

  error: any;

  constructor(private homeService: HomeService) {
    this.homeService.getAllCountries().subscribe(
      (data) => {
        console.log(data);
        this.countries = data.response;
        console.log(this.countries);
      },
      (data) => {
        this.error = data.errors;
      }
    );
  }
}