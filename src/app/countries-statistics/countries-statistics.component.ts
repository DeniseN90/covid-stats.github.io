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
  selectedTimeRange: number;
  inputData: any[];
  dataLabels: any[];
  loaded: boolean;
  isMobile: boolean;
  timeRanges: any[]

  searchFilter = new FormControl('');

  protected _onDestroy = new Subject<void>();

  filteredCountries: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  @ViewChild('select', { static: true }) select: MatSelect;

  constructor(private appService: AppService) {
    this.isMobile = appService.isMobile;
    this.timeRanges = [ 
      {
        value: 10,
        label: 'Last 10 days'
      }, 
      {
        value: 20,
        label: 'Last 20 days'
      }, 
      {
        value: 30,
        label: 'Last 30 days'
      }, 
      {
        value: 40,
        label: 'Last 40 days'
      }
    ];
  }

  ngOnInit(): void {
    this.getAllCountries();
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

  selectTimeRange(event) {
    this.selectedTimeRange = event.value;
    this.setTimeRange(event.value);
  }

  private setTimeRange(timeRange: number) {
    this.inputData = this.appService.countryStat.slice(- timeRange);
    this.dataLabels = ChartUtils.getChartLabels(this.inputData);
  }

  private getCountryHistory(country: string) {
    this.loaded = false;
    this.appService.getHistory(country).subscribe(
      (data) => {
        let cleanedData = ChartUtils.getCleanedData(data.response);
        // initializa time range to 40
        this.selectedTimeRange = 40;
        this.inputData = cleanedData.slice(0, this.selectedTimeRange).reverse();
        this.appService.countryStat = this.inputData;
        this.dataLabels = ChartUtils.getChartLabels(this.inputData);
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
