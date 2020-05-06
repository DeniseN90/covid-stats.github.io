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
  selector: 'bar-chart-mobile-component',
  templateUrl: './bar-chart-mobile.component.html',
})
export class BarChartMobileComponent implements OnInit, OnChanges {
  @Input()
  inputData: any[];
  @Input()
  barChartLabels: Label[];

  loaded: boolean;
  @ViewChild(BaseChartDirective, { static: false })
  barChart: BaseChartDirective;

  barChartData: ChartDataSets[];

  barChartType = 'bar';
  barChartColors: Color[];

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 3000,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 0,
            stepsize: 0,
          },
        },
      ],
    },
  };
  barChartLegend = true;
  barChartPlugins = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.barChartData = [];
    this.barChartColors = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.inputData !== undefined) {
      this.createBarChartMobile();
    }
  }

  private createBarChartMobile() {
    this.barChartData = [];
    let totalCasesDataSet: ChartDataSets = {};
    totalCasesDataSet.label = 'Total cases';
    this.barChartColors.push({
      borderColor: 'rgba(38, 51, 33, 1)',
      backgroundColor: 'rgba(177, 237, 157, .5)',
    });
    this.inputData = this.inputData.slice(
      this.inputData.length - 6,
      this.inputData.length
    );
    this.barChartLabels = this.barChartLabels.slice(
      this.barChartLabels.length - 6,
      this.barChartLabels.length
    );
    totalCasesDataSet.data = ChartUtils.getCases(this.inputData, 'total');
    this.barChartData.push(totalCasesDataSet);
    let limit = 0;
    let step = 0;
    // get the upper linit for this chart based on total case max value
    this.barChartData[0].data.forEach((element) => {
      if (element > limit) {
        limit = element;
      }
    });

    let stepLimitArray = Utils.round(limit);
    limit = stepLimitArray[0];
    step = stepLimitArray[1];
    this.barChartOptions.scales.yAxes[0].ticks.max = limit;
    this.barChartOptions.scales.yAxes[0].ticks.stepsize = step;

    let newCasesDataSet: ChartDataSets = {};
    newCasesDataSet.label = 'New cases';
    this.barChartColors.push({
      borderColor: 'rgba(110, 110, 79, 1)',
      backgroundColor: 'rgba(227, 227, 163, 1)',
    });
    newCasesDataSet.data = ChartUtils.getCases(this.inputData, 'new');
    this.barChartData.push(newCasesDataSet);
    let criticalCasesDataSet: ChartDataSets = {};
    criticalCasesDataSet.label = 'Critical cases';
    this.barChartColors.push({
      borderColor: 'rgba(122, 4, 0, 1)',
      backgroundColor: 'rgba(201, 104, 101, 1)',
    });
    criticalCasesDataSet.data = ChartUtils.getCases(this.inputData, 'critical');
    this.barChartData.push(criticalCasesDataSet);

    let activeCasesDataSet: ChartDataSets = {};
    activeCasesDataSet.label = 'Active cases';
    this.barChartColors.push({
      borderColor: 'rgba(94, 50, 0, 1)',
      backgroundColor: 'rgba(255, 140, 8, 1)',
    });
    activeCasesDataSet.data = ChartUtils.getCases(this.inputData, 'active');
    this.barChartData.push(activeCasesDataSet);

    let recoveredCasesDataSet: ChartDataSets = {};
    recoveredCasesDataSet.label = 'Recovered cases';
    this.barChartColors.push({
      borderColor: 'rgba(46, 71, 71, 1)',
      backgroundColor: 'rgba(144, 232, 229, 1)',
    });
    recoveredCasesDataSet.data = ChartUtils.getCases(this.inputData, 'recovered'); 
    this.barChartData.push(recoveredCasesDataSet);

    let newDeathsDataSet: ChartDataSets = {};
    newDeathsDataSet.label = 'New deaths';
    this.barChartColors.push({
      borderColor: 'rgba(15, 15, 54, 1)',
      backgroundColor: 'rgba(66, 66, 227, 1)',
    });
    newDeathsDataSet.data = ChartUtils.getDeaths(this.inputData, 'new'); 
    this.barChartData.push(newDeathsDataSet);

    let totalDeathsDataSet: ChartDataSets = {};
    totalDeathsDataSet.label = 'Total deaths';
    this.barChartColors.push({
      borderColor: 'rgba(33, 30, 30, 1)',
      backgroundColor: 'rgba(112, 101, 101, 1)',
    });
    totalDeathsDataSet.data =  ChartUtils.getDeaths(this.inputData, 'total');
    this.barChartData.push(totalDeathsDataSet);

    this.loaded = true;
    // detect the baseChart in the DOM after loaded is true
    this.changeDetectorRef.detectChanges();
    this.updateConfigAsNewObject(this.barChartOptions);
  }

  updateConfigAsNewObject(lineChartOptions) {
    this.barChart.chart.config.options = lineChartOptions;
    // update chart options on DOM
    this.barChart.ngOnChanges({} as SimpleChanges);
  }
}
