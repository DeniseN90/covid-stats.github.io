import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ChartUtils } from '../shared/utils/charts-utils';

@Component({
  selector: 'app-countries-statistics',
  templateUrl: './countries-statistics.component.html',
  styleUrls: ['./countries-statistics.component.css'],
})
export class CountriesStatisticsComponent implements OnInit, AfterViewInit {
  error: string;

  countries: string[];

  selectedCountry: string;
  inputData: any[];
  dataLabels: any[];
  loaded: boolean;
  mobile: boolean;

  searchFilter = new FormControl('');

  protected _onDestroy = new Subject<void>();

  filteredCountries: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  @ViewChild('select', { static: true }) select: MatSelect;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.mobile = window.screen.width < 560;
    this.dataLabels = [];
    this.searchFilter.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filteredCountries
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.select.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  private getAllCountries() {
    this.appService.getAllCountries().subscribe(
      (data) => {
        this.countries = data.response;
        this.filteredCountries.next(this.countries.slice());
        this.loaded = true;
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
        let reversed = data.response.reverse();
        this.inputData = ChartUtils.getCleanedData(reversed);
        this.dataLabels = ChartUtils.getChartLabels(reversed);
        this.loaded = true;
      },
      (data) => {
        this.error = data.errors;
      }
    );
  }

  protected filterCountries() {
    if (!this.countries) {
      return;
    }
    let search = this.searchFilter.value;
    if (!search) {
      this.filteredCountries.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCountries.next(
      this.countries.filter(
        (country) => country.toLowerCase().indexOf(search) > -1
      )
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
