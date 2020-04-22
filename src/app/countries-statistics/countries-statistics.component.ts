import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-countries-statistics',
  templateUrl: './countries-statistics.component.html',
  styleUrls: ['./countries-statistics.component.css'],
})
export class CountriesStatisticsComponent implements OnInit {
  error: string;

  countries: string[];

  constructor(private appService: AppService) {
    this.appService.getAllCountries().subscribe(
      (data) => {
       // console.log(data);
        this.countries = data.response;
      },
      (data) => {this.error = data.errors;}
    );
  }

  ngOnInit(): void {}

 private getCountryHistory(country: string) {
    this.appService.getHistory(country).subscribe(
      (data) => {
        console.log(data);
      },
      (data) => {
        this.error = data.errors;
      }
    );
  }

  selectCountry(event){
    // console.log(event.value);
    this.getCountryHistory(event.value);

  }
}
