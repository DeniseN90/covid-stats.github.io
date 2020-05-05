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
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { Utils } from 'src/app/shared/utils/utils';
import { ChartUtils } from 'src/app/shared/utils/charts-utils';

@Component({
  selector: 'ratechart-component',
  templateUrl: './ratechart.component.html',
})
export class RateChartComponent implements OnInit, OnChanges {
  @Input() inputData: any[];
  @Input() rateChartLabels: Label[];

  loaded: boolean;

  availableData: any[];
  selectedData: any;

  rateChartData: ChartDataSets[];
  rateChartType = 'line';
  rateChartOptions: ChartOptions = {
    responsive: true,
    responsiveAnimationDuration: 3000,
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 0,
            stepSize: 0,
          },
        },
      ],
    },
  };

  rateChartColors: Color[];

  @ViewChild(BaseChartDirective, { static: false })
  rateChart: BaseChartDirective;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.loaded = false;
  }

  ngOnInit() {
    this.availableData = [
      { key: 0, value: 'Total cases' },
      { key: 1, value: 'New cases' },
      { key: 2, value: 'Total deaths' },
      { key: 3, value: 'New deaths' },
    ];
    this.selectedData = this.availableData[0];
    this.rateChartData = [];
    this.rateChartColors = [
      {
        backgroundColor: 'rgba(250, 250, 250, 0.3)',
        borderColor: 'rgba(163, 163, 72, 0.8)',
        pointBackgroundColor: 'rgba(163, 163, 72,1)',
        pointBorderColor: 'rgba(350, 450, 100, 0.7)',
        pointHoverBackgroundColor: '#000',
        pointHoverBorderColor: 'rgba(350, 450, 100, 0.8)',
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.inputData !== undefined) {
      this.rateChartData = [];
      this.inputData = this.inputData.slice(0).slice(-10);
      this.rateChartLabels = this.rateChartLabels.slice(1).slice(-9);
      this.rateChartData = [];
      this.createRateChart(this.inputData, 0);
    }
  }

  private createRateChart(data: any[], metric: number) {
    if (metric === 0) {
      this.totalCasesRateChart(data);
    } else if (metric === 1) {
      this.newCasesRateChart(data);
    } else if (metric === 2) {
      this.totalDeathsRateChart(data);
    } else if (metric === 3) {
      this.newDeathsRateChart(data);
    }
  }

  private getLimit(dataSet: any[]) {
    let limit = Math.max(...dataSet);
    let step = 0;
    let downLimit = Math.min(...dataSet);
    if (downLimit < 0) {
      downLimit = Utils.roundGrowthRate(downLimit * -1) ;
      this.rateChartOptions.scales.yAxes[0].ticks.min = downLimit * -1;
    } else {
      this.rateChartOptions.scales.yAxes[0].ticks.min = 0;
    }
    limit = Utils.roundGrowthRate(limit);
    step = limit / 10;
    this.rateChartOptions.scales.yAxes[0].ticks.max = limit;
    this.rateChartOptions.scales.yAxes[0].ticks.stepSize = step;
  }

  updateConfigAsNewObject(rateChartOptions) {
    this.rateChart.chart.config.options = rateChartOptions;
    // update chart options on DOM
    this.rateChart.ngOnChanges({} as SimpleChanges);
  }

  selectData(event) {
    this.rateChartData = [];
    if (this.selectedData !== undefined) {
      this.createRateChart(this.inputData, Number(this.selectedData.key));
    }
  }

  private totalCasesRateChart(data: any[]) {
    let totalCasesDataSet: ChartDataSets = {};
    totalCasesDataSet.label = 'Total cases growth rate';
    totalCasesDataSet.data = ChartUtils.getCases(this.inputData, 'total');
    totalCasesDataSet.data = ChartUtils.getGrowthRate(totalCasesDataSet);
    this.rateChartData.push(totalCasesDataSet);
    this.getLimit(totalCasesDataSet.data);
    // detect the baseChart in the DOM after loaded is true
    this.loaded = true;
    this.changeDetectorRef.detectChanges();
    this.updateConfigAsNewObject(this.rateChartOptions);
  }

  private newCasesRateChart(data: any[]) {
    let newCasesDataSet: ChartDataSets = {};
    newCasesDataSet.label = 'New cases growth rate';
    newCasesDataSet.data = ChartUtils.getCases(this.inputData, 'new');
    newCasesDataSet.data = ChartUtils.getGrowthRate(newCasesDataSet);
    this.rateChartData.push(newCasesDataSet);
    this.getLimit(newCasesDataSet.data);
    // detect the baseChart in the DOM after loaded is true
    this.loaded = true;
    this.changeDetectorRef.detectChanges();
    this.updateConfigAsNewObject(this.rateChartOptions);
  }

  private totalDeathsRateChart(data: any[]) {
    let totalDeathsDataSet: ChartDataSets = {};
    totalDeathsDataSet.label = 'Total deaths growth rate';
    totalDeathsDataSet.data = ChartUtils.getDeaths(this.inputData, 'total');
    totalDeathsDataSet.data = ChartUtils.getGrowthRate(totalDeathsDataSet);
    this.rateChartData.push(totalDeathsDataSet);
    this.getLimit(totalDeathsDataSet.data);
    // detect the baseChart in the DOM after loaded is true
    this.loaded = true;
    this.changeDetectorRef.detectChanges();
    this.updateConfigAsNewObject(this.rateChartOptions);
  }

  private newDeathsRateChart(data: any[]) {
    let newDeathsDataSet: ChartDataSets = {};
    newDeathsDataSet.label = 'New deaths growth rate';
    newDeathsDataSet.data = ChartUtils.getDeaths(this.inputData, 'new');
    newDeathsDataSet.data = ChartUtils.getGrowthRate(newDeathsDataSet);
    this.rateChartData.push(newDeathsDataSet);
    this.getLimit(newDeathsDataSet.data);
    // detect the baseChart in the DOM after loaded is true
    this.loaded = true;
    this.changeDetectorRef.detectChanges();
    this.updateConfigAsNewObject(this.rateChartOptions);
  }
}
