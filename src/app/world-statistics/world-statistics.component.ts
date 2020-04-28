import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';
import { CountryRow } from '../shared/model/model';

@Component({
  selector: 'app-world-statistics',
  templateUrl: './world-statistics.component.html',
  styleUrls: ['./world-statistics.component.css'],
})
export class WorldStatisticsComponent implements OnInit {
  error: string;
  dataSource: any;
  sortedData: any;
  numberOfTabs: number;
  totalCountries: number;

  // AGGIUNGI COLONNE PER RAPPORTI TODO
  displayedColumns: string[] = [
    'country',
    'casesTotal',
    'casesNew',
    'casesActive',
    'casesCritical',
    'casesRecovered',
    'deathsNew',
    'deathsTotal',
    'testsTotal',
  ];

  date: any;
  
  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  mobile: boolean;

  worldStats: CountryRow[];
  sortedWorldStats: CountryRow[];
  loaded: boolean;

  constructor(private appService: AppService) {
    this.dataSource = [];
    this.sortedData = [];
    this.worldStats = [];
    this.getWorldStats();
  }

  private getWorldStats() {
    this.appService.getWorldStats().subscribe(
      (data) => {
        // console.log(data);
        this.totalCountries = data.response.length;
        this.numberOfTabs = this.getTabs(this.totalCountries);
        this.date = data.response[0].time;
        for (let i = 0; i < data.response.length; i++) {
          this.worldStats.push(new CountryRow(data.response[i]));
        }
        this.sortedWorldStats = this.worldStats;
        for (
          let i = 0, start = 0, limit = 49;
          i < this.numberOfTabs;
          i++, start += 50, limit += 50
        ) {
          this.dataSource[i] = new MatTableDataSource(
            this.worldStats.slice(start, limit)
          );
          this.dataSource[i].sort = this.sort;
          this.sortedData[i] = new MatTableDataSource(
            this.worldStats.slice(start, limit)
          );
          this.sortedData[i].sort = this.sort;
          this.loaded = true;
        }
      },
      (data) => {
        this.error = data.errors;
      }
    );
  }

  ngOnInit(): void {
    this.mobile = window.screen.width < 560;
    //  console.log(window.screen.width);
    //  console.log(this.mobile);
  }

  private getTabs(x: number) {
    let numberOfTabs = Math.floor(x / 50);
    if (x % 50 !== 0) {
      numberOfTabs++;
    }
    return numberOfTabs;
  }

  counter(n: number) {
    return new Array(n);
  }

  getLabels(i: number) {
    switch (i) {
      case 0:
        return '1 - 50';
      case 1:
        return '51 - 100';
      case 2:
        return '101 - 150';
      case 3:
        return '151 - 200';
      case 4:
        return '201 - ' + this.totalCountries;
    }
  }

  sortData(sort: Sort, i: number) {
    const data = this.dataSource[i];
    if (!sort.active || sort.direction === '') {
      this.sortedData[i] = data;
      return;
    }
    this.sortedData[i] = new MatTableDataSource(
      data.sortData(data.filteredData, sort)
    );
  }

  applyFilter(event) {
    if (event.target.value == '') {
      this.worldStats = this.sortedWorldStats;
      return this.worldStats;
    }
    const filterValue = event.target.value;
    this.worldStats = this.sortedWorldStats.filter((element) => {
      return (
        element.country
          .toLocaleLowerCase()
          .indexOf(filterValue.trim().toLowerCase()) != -1
      );
    });
  }
}
