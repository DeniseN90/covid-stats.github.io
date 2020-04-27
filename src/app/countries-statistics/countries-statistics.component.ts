import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';

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
  filter: any = '';

  @ViewChild('countriesSelect') singleSelect: MatSelect; 
  private _onDestroy = new Subject<void>();
  public filteredCountries: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  constructor(private appService: AppService) {
    this.loaded = true;
  }

  ngOnInit(): void {
    this.filter = '';
    this.getAllCountries();
   // console.log(window.screen.width < 560);
    this.mobile = (window.screen.width < 560);
  //  console.log('mobile', this.mobile);
  // this.filter.valueChanges
  //     .pipe(takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.filterCountries();
  //     });
  }

  private getAllCountries() {
    this.appService.getAllCountries().subscribe(
      (data) => {
        this.countries = data.response;
        this.filteredCountries.next(this.countries.slice());
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

  getFilter(event){
    console.log(event);
  }

  private filterCountries() {
    if (!this.countries) {
      return;
    }
    // get the search keyword
    let search = this.filter;
    if (!search) {
      this.filteredCountries.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCountries.next(
      this.countries.filter(country => country.toLowerCase().indexOf(search) > -1)
    );
  }

  
}
