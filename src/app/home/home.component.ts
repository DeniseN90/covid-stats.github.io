import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  

  totalCases: number;
  newCases: number;
  activeCases: number;
  criticalCases: number;
  recoveredCases: number;
  newDeaths: number;
  totalDeaths: number
  tests: number;
  date: Date;

  error: any;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.totalCases = 0;
    this.activeCases = 0;
    this.criticalCases = 0;
    this.recoveredCases = 0;
    this.newCases = 0;
    this.newDeaths = 0;
    this.totalDeaths = 0;
    this.tests = 0;
    this.getWorldStats();
  }

  private getWorldStats() {
    this.appService.getWorldStats().subscribe(
      (data) => {
        this.getTotalCases(data.response);
      },
      (data) => {
        this.error = data.errors;
      }
    );
  }

  private getTotalCases(data: any[]) {
    data.forEach((el) => {
      if (el.country === 'All') {
        console.log('ELEMENT',el);
        this.date = el.time;
        this.totalCases += el.cases.total;
        this.activeCases += el.cases.active;
        this.criticalCases += el.cases.critical;
        this.recoveredCases += el.cases.recovered;
        this.newCases = el.cases.new;
        this.totalDeaths = el.deaths.total;
        this.newDeaths = el.deaths.new;
        this.tests = el.tests.total;
      }
    });
  }
}
