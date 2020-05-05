import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
  Input,
  OnChanges,
} from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { Utils } from 'src/app/shared/utils/utils';
import { ChartUtils } from 'src/app/shared/utils/charts-utils';

@Component({
  selector: 'linechart-component',
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input()
  inputData: any[];
  @Input()
  lineChartLabels: Label[];

  loaded: boolean;

  @ViewChild(BaseChartDirective, { static: false })
  lineChart: BaseChartDirective;

  lineChartData: ChartDataSets[];
  lineChartType = 'line';
  lineChartColors: Color[];
  lineChartOptions = {
    responsive: true,
    responsiveAnimationDuration: 3000,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 0,
            stepSize: 0,
          },
        },
      ],
    },
  };
  
  lineChartLegend = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.loaded = false;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.inputData !== undefined) {
      this.lineChartData = [];
      this.lineChartColors = [];
      this.createLineChart();
    }
  }

  private createLineChart() {
    // total cases
    let totalCasesDataSet: ChartDataSets = {};
    totalCasesDataSet.label = 'Total cases';
    this.lineChartColors.push({
      borderColor: 'rgba(38, 51, 33, 1)',
      backgroundColor: 'rgba(177, 237, 157, .5)',
    });
    totalCasesDataSet.data = ChartUtils.getCases(this.inputData, 'total'); 
    this.lineChartData.push(totalCasesDataSet);

    this.getLimit(totalCasesDataSet.data);

    let newCasesDataSet: ChartDataSets = {};
    newCasesDataSet.label = 'New cases';
    this.lineChartColors.push({
      borderColor: 'rgba(110, 110, 79, 1)',
      backgroundColor: 'rgba(227, 227, 163, 1)',
    });
    newCasesDataSet.data = ChartUtils.getCases(this.inputData, 'new');
    this.lineChartData.push(newCasesDataSet);
    let criticalCasesDataSet: ChartDataSets = {};
    criticalCasesDataSet.label = 'Critical cases';
    this.lineChartColors.push({
      borderColor: 'rgba(122, 4, 0, 1)',
      backgroundColor: 'rgba(201, 104, 101, 1)',
    });
    criticalCasesDataSet.data = ChartUtils.getCases(this.inputData, 'critical');
    this.lineChartData.push(criticalCasesDataSet);

    let activeCasesDataSet: ChartDataSets = {};
    activeCasesDataSet.label = 'Active cases';
    this.lineChartColors.push({
      borderColor: 'rgba(94, 50, 0, 1)',
      backgroundColor: 'rgba(255, 140, 8, 1)',
    });
    activeCasesDataSet.data = ChartUtils.getCases(this.inputData, 'active');
    this.lineChartData.push(activeCasesDataSet);
    let recoveredCasesDataSet: ChartDataSets = {};
    recoveredCasesDataSet.label = 'Recovered cases';
    this.lineChartColors.push({
      borderColor: 'rgba(46, 71, 71, 1)',
      backgroundColor: 'rgba(144, 232, 229, 1)',
    });
    recoveredCasesDataSet.data = ChartUtils.getCases(this.inputData, 'recovered'); 
    this.lineChartData.push(recoveredCasesDataSet);

    let newDeathsDataSet: ChartDataSets = {};
    newDeathsDataSet.label = 'New deaths';
    this.lineChartColors.push({
      borderColor: 'rgba(15, 15, 54, 1)',
      backgroundColor: 'rgba(66, 66, 227, 1)',
    });
    newDeathsDataSet.data = ChartUtils.getDeaths(this.inputData, 'new');
    this.lineChartData.push(newDeathsDataSet);

    let totalDeathsDataSet: ChartDataSets = {};
    totalDeathsDataSet.label = 'Total deaths';
    this.lineChartColors.push({
      borderColor: 'rgba(33, 30, 30, 1)',
      backgroundColor: 'rgba(112, 101, 101, 1)',
    });
    totalDeathsDataSet.data = ChartUtils.getDeaths(this.inputData, 'total');
    this.lineChartData.push(totalDeathsDataSet);
    this.loaded = true;
    // detect the baseChart in the DOM after loaded is true
    this.changeDetectorRef.detectChanges();
    this.updateConfigAsNewObject(this.lineChartOptions);
  }


  private getLimit(dataSet: any[]) {
    let limit = 0;
    let step = 0;
    // get the upper limit for this chart based on total case max value
    dataSet.forEach((element) => {
      if (element > limit) {
        limit = element;
      }
    });
    let stepLimitArray = Utils.round(limit);
    limit = stepLimitArray[0];
    step = stepLimitArray[1];
    this.lineChartOptions.scales.yAxes[0].ticks.max = limit;
    this.lineChartOptions.scales.yAxes[0].ticks.stepSize = step;
  }

  updateConfigAsNewObject(lineChartOptions) {
    this.lineChart.chart.config.options = lineChartOptions;
    // update chart options on DOM
    this.lineChart.ngOnChanges({} as SimpleChanges);
  }
}
