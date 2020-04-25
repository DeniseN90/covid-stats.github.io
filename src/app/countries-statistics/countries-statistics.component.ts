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
  loaded: boolean;
  mobile: boolean;

  constructor(private appService: AppService) {
    this.loaded = true;
  }

  ngOnInit(): void {
    this.getAllCountries();
    console.log(window.screen.width < 560);
    this.mobile = (window.screen.width < 560);
    console.log('mobile', this.mobile);
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

  selectCountry(event) {
    this.selectedCountry = event.value;
    this.getCountryHistory(event.value);
  }

  private getCountryHistory(country: string) {
    this.loaded = false;
    this.appService.getHistory(country).subscribe(
      (data) => {
      //  console.log(data);
        this.inputData = data.response;
        this.loaded = true;
        
      },
      (data) => {
        this.error = data.errors;
      }
    );
  }

  
}
