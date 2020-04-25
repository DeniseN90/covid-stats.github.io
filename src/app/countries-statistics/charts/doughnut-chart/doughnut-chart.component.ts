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
import { AppService } from 'src/app/app.service';

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
  doughnutChartColors: Color[];

  constructor(
    private appService: AppService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.doughnutChartData = [];
    this.doughnutChartColors = [];
    this.doughnutChartLabels = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.inputData);
    if (this.inputData !== undefined) {
      this.createDoughnutChart(this.inputData);
    }
  }

  private createDoughnutChart(data: any[]) {
    this.doughnutChartColors = [];
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];
    this.doughnutChartLabels.push('Active cases');
    let activeCases: ChartDataSets = data[data.length - 1].cases.active;
    this.doughnutChartData.push(activeCases);
    this.doughnutChartColors.push({
      borderColor: 'rgba(8, 4, 10, 1)',
      backgroundColor: 'rgba(145, 83, 189, 1)',
    });
    this.doughnutChartLabels.push('Critical cases');
    let criticalCases: ChartDataSets = data[data.length - 1].cases.critical;
    this.doughnutChartData.push(criticalCases);
    this.doughnutChartColors.push({
      borderColor: 'rgba(89, 15, 13, 1)',
      backgroundColor: 'rgba(240, 42, 38, 1)',
    });
    console.log('>>>>>>>>>>>>>>>>>>>>< DOUgh DATA', this.doughnutChartData);
    console.log(this.doughnutChartColors);
    console.log('>>>>>>>>>>>>>>>>>>', this.doughnutChart);
    this.loaded = true;
    this.changeDetectorRef.detectChanges()
  }
}
