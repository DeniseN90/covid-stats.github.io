import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
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
  numberOfTabs: number;
  totalCountries: number;
  displayedColumns: string[] = [
    'country',
    'total-cases',
    'new-cases',
    'active-cases',
    'critical-cases',
    'recovered',
    'new-deaths',
    'total-deaths',
    'total-tests',
  ];

  date: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  mobile: boolean;

  worldStats: CountryRow[];
  loaded: boolean;

  constructor(private appService: AppService) {
    this.dataSource = [];
    this.getWorldStats();
    this.loaded = false;
  }

  private getWorldStats() {
    this.appService.getWorldStats().subscribe(
      (data) => {
        console.log(data);
        this.totalCountries = data.response.length;
        this.numberOfTabs = this.getTabs(this.totalCountries);
        this.date = data.response[0].time;
        this.worldStats = data.response;
        for (
          let i = 0, start = 0, limit = 49;
          i < this.numberOfTabs;
          i++, start += 50, limit += 50
        ) {
          this.dataSource[i] = new MatTableDataSource(
            data.response.slice(start, limit)
          );
          this.loaded = true;
          //console.log('>>>>>>>>>>>>>>>>>>>>>>>>', this.dataSource[i]);
        }
      },
      (data) => {
        this.error = data.errors;
      }
    );
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.mobile = window.screen.width < 560;
    console.log(window.screen.width);
    console.log(this.mobile);
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
}
