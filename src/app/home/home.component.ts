import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  

  totalCases: number;
  totalNewCases: number;
  totalActiveCases: number;
  totalCriticalCases: number;
  totalRecoveredCases: number;
  date: Date;

  error: any;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.totalCases = 0;
    this.totalActiveCases = 0;
    this.totalCriticalCases = 0;
    this.totalRecoveredCases = 0;
    this.totalNewCases = 0;
    this.getWorldStats();
  }

  private getWorldStats() {
    this.appService.getWorldStats().subscribe(
      (data) => {
        this.date = data.response[0].day;
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
        this.totalCases += el.cases.total;
        this.totalActiveCases += el.cases.active;
        this.totalCriticalCases += el.cases.critical;
        this.totalRecoveredCases += el.cases.recovered;
        let s: string = el.cases.new.substring(1);
        this.totalNewCases += Number(s);
      }
    });
  }
}
