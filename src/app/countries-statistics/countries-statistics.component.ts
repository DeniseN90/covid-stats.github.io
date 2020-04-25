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
  selectedCountry: string;
  inputData: any[];
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getAllCountries();
  }

  private getAllCountries() {
    this.appService.getAllCountries().subscribe(
      (data) => {
        this.countries = data.response;
      },
      (data) => {
        this.error = data.errors;
      }
    );
  }

  private getCountryHistory(country: string) {
    this.appService.getHistory(country).subscribe(
      (data) => {
        console.log(data);
        this.inputData = data.response;
      },
      (data) => {
        this.error = data.errors;
      }
    );
  }

  selectCountry(event) {
    this.selectedCountry = event.value;
    this.getCountryHistory(event.value);
  }
}
