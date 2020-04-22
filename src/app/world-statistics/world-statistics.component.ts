import { Component, OnInit, ViewChild } from '@angular/core';
import { WorldStatisticsService } from './world-statistics.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';

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
  displayedColumns: string[] = ['country', 'new-cases', 'active-cases', 
  'critical-cases', 'recovered', 'total-cases', 'new-deaths', 'total-deaths', 
  'total-tests'
] ;

  date: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private worldStatsService: WorldStatisticsService, private appService: AppService) {
    this.dataSource = [];
    this.getWorldStats();
    
  }

 private getWorldStats(){
    this.appService.getWorldStats().subscribe(
      (data) => {
        //console.log(data);
        this.totalCountries = data.response.length;
        this.numberOfTabs = this.getTabs(this.totalCountries);
        this.date = data.response[0].day;
        for (let i = 0, start = 0, limit = 49; i < this.numberOfTabs; i++, start += 50, limit += 50 ) {          
          this.dataSource[i] = new MatTableDataSource(data.response.slice(start, limit));
         // console.log('>>>>>>>>>>>>>>>>>>>>>>>>', this.dataSource[i]);
        }
      },
      (data) => {
        this.error = data.errors;
      }
    );

  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
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



