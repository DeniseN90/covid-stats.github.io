import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

export interface CountryRow {
  cases: Cases;
  country: string;
  day: Date;
  deaths: Deaths;
  test: Tests;
  time: Date;
}

export interface Cases {
  new: string;
  active: number;
  critical: number;
  recovered: number;
  total: number;
}

export interface Deaths {
  new: number;
  total: number;
}

export interface Tests {
  total: number;
}

export class CountryDataSet {
  lineCharData: ChartDataSets[];
  lineChartLabels: Label[];
}
