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

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.inputData);
    if (this.inputData !== undefined) {
      this.createDoughnutChart(this.inputData);
    }
  }

  private createDoughnutChart(data: any[]) {

    this.doughnutChartLabels = [];
    this.doughnutChartData = [];
    this.doughnutChartLabels.push('Active cases');
    let activeCases: ChartDataSets = {};
    activeCases = data[data.length - 1].cases.active;
    this.doughnutChartData.push(activeCases);
    this.doughnutChartLabels.push('Critical cases');
    let criticalCases: ChartDataSets = {};
    criticalCases = data[data.length - 1].cases.critical;
    this.doughnutChartData.push(criticalCases);
  //  console.log('>>>>>>>>>>>>>>>>>>>>< DOUgh DATA', this.doughnutChartData);
  //  console.log('>>>>>>>>>>>>>>>>>>', this.doughnutChart);
    this.loaded = true;
    this.changeDetectorRef.detectChanges();
   // console.log('>>>>>>>>>>>>>>>>>>', this.doughnutChart);

  }
}
