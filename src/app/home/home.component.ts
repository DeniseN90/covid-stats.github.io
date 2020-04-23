import { Component, OnInit, SimpleChanges } from '@angular/core';
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

  constructor(private appService: AppService) {}

  ngOnInit() {
    // this.totalCases = 0;
    // this.activeCases = 0;
    // this.criticalCases = 0;
    // this.recoveredCases = 0;
    // this.newCases = 0;
    // this.newDeaths = 0;
    // this.totalDeaths = 0;
    // this.tests = 0;
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
        // console.log('ELEMENT',el);
        this.date = el.time;
        this.totalCases = this.renderLongNumbers(el.cases.total);
        this.activeCases = this.renderLongNumbers(el.cases.active);
        this.criticalCases = this.renderLongNumbers(el.cases.critical);
        this.recoveredCases = this.renderLongNumbers(el.cases.recovered);
        this.newCases = this.renderLongNumbers(el.cases.new.substring(1));
        this.totalDeaths = this.renderLongNumbers(el.deaths.total);
        this.newDeaths = this.renderLongNumbers(el.deaths.new.substring(1));
        // this.tests = this.renderLongNumbers(el.tests.total); comes as undefined
      }
    });
  }

  private renderLongNumbers(n: number) {
    let str = n.toString(10);
    let newStr = '';
    let remainder = str.length % 3;
    let i = remainder;
    if (remainder !== 0) {
      newStr = newStr + str.substring(0, remainder) + "'";
    }
    for (i; i < str.length; i += 3) {
      newStr += str.substring(i, i + 3);
      if ((str.length - i) <= 3 ) {
        continue;
      }
      newStr += "'";
    }
    return newStr;
  }
}
