import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

export class CountryRow {
  country?: string;
  day?: Date;
  casesNew?: number;
  casesActive?: number;
  casesCritical?: number;
  casesRecovered?: number;
  casesTotal?: number;
  deathsNew?: number;
  deathsTotal?: number;
  testsTotal?: number;

  constructor (data: any){
    this.country = data.country;
    this.day = data.day;
    this.casesNew = data.cases.new;
    this.casesTotal = data.cases.total;
    this.casesActive = data.cases.active;
    this.casesCritical = data.cases.critical;
    this.casesRecovered = data.cases.recovered;
    this.deathsNew = data.deaths.new;
    this.deathsTotal = data.deaths.total;
    this.testsTotal = data.tests.total;
  }
}
