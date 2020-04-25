import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalCases: string;
  newCases: string;
  activeCases: string;
  criticalCases: string;
  recoveredCases: string;
  newDeaths: string;
  totalDeaths: string;
  tests: string;
  date: Date;

  error: any;

  mobile: boolean;
  tablet: boolean;
  loaded: boolean;

  constructor(private appService: AppService) {
    this.loaded = false;
  }

  ngOnInit() {
    this.mobile = ( window.screen.width < 360);
    this.tablet = ( window.screen.width < 790 && window.screen.width >= 360);
    // console.log(window.screen.width < 790);
    // console.log(window.screen.width > 360);
    // console.log(window.screen.width);
    // console.log(this.mobile);
    // console.log(this.tablet);
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
        this.date = el.time;
        this.totalCases = el.cases.total;
        this.activeCases = el.cases.active;
        this.criticalCases = el.cases.critical;
        this.recoveredCases = el.cases.recovered;
        this.newCases = el.cases.new.substring(1);
        this.totalDeaths = el.deaths.total;
        this.newDeaths = el.deaths.new.substring(1);
        // this.tests = this.renderLongNumbers(el.tests.total); comes as undefined at the moment
        this.loaded = true;
      }
    });
  }

  
}
