import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
  Input,
  OnChanges,
} from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, BaseChartDirective, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'doughnut-component',
  templateUrl: './doughnut-chart.component.html',
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  @Input()
  inputData: any[];
  loaded: boolean;
  @ViewChild(BaseChartDirective, { static: false })
  doughnutChart: BaseChartDirective;
  doughnutChartLabels: Label[];
  doughnutChartData: ChartDataSets[];
  doughnutChartType = 'doughnut';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.inputData !== undefined) {
      this.createDoughnutChart(this.inputData);
    }
  }

  private createDoughnutChart(data: any[]) {
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];

    let critical = data[data.length - 1].cases.critical;
    console.log('CRITICAL', critical);
    this.doughnutChartLabels.push('Critical cases');
    let criticalCases: ChartDataSets = {};
    criticalCases = critical;
    this.doughnutChartData.push(criticalCases);

    // console.log('CRITICAL DATA SET',criticalCases);
    // console.log('WHOLE DATA SET',this.doughnutChartData);

    let others: any = data[data.length - 1].cases.active - critical;
    // console.log('ACTIVE', data[data.length - 1].cases.active);
    // console.log('active less critical', others);

    this.doughnutChartLabels.push('Other active cases');
    let activeCases: ChartDataSets = {};
    activeCases = others;
    this.doughnutChartData.push(activeCases);

    console.log('WHOLE DATA SET', this.doughnutChartData);
    this.loaded = true;
    this.changeDetectorRef.detectChanges();
    // console.log('>>>>>>>>>>>>>>>>>>', this.doughnutChart);
  }
}
