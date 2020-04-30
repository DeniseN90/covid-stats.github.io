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
  selector: 'rate-chartcomponent',
  templateUrl: './rate-chart.component.html',
})
export class RateChartComponent implements OnInit, OnChanges {
  @Input()
  inputData: any[];

  loaded: boolean;
  @ViewChild(BaseChartDirective, { static: false })
  barChart: BaseChartDirective;

  barChartLabels: Label[];
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
    this.barChartLabels = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.inputData !== undefined) {
      this.barChartData = [];
      this.barChartColors = [];
      this.barChartLabels = [];
      this.createLineChart(this.inputData.reverse());
    }
  }

  private createLineChart(data: any[]) {
    let cleanData = [];
    ChartUtils.getLabelsAndCleanedData(data, this.barChartLabels, cleanData);
    // console.log('BEFORE SLICE', cleanData, this.barChartLabels);

    let totalCasesDataSet: ChartDataSets = {};
    totalCasesDataSet.label = 'Total cases';
    this.barChartColors.push({
      borderColor: 'rgba(38, 51, 33, 1)',
      backgroundColor: 'rgba(177, 237, 157, .5)',
    });
    cleanData = cleanData.slice(cleanData.length - 6, cleanData.length);
    this.barChartLabels = this.barChartLabels.slice(
      this.barChartLabels.length - 6,
      this.barChartLabels.length
    );
    // console.log('AND NOW??', cleanData, this.barChartLabels);
    this.barChartData.push(
      ChartUtils.getCases(totalCasesDataSet, cleanData, 'total')
    );
    let limit = 0;
    let step = 0;
    // console.log('LINE CHART DATA', this.lineChartData);
    // get the upper linit for this chart based on total case max value
    this.barChartData[0].data.forEach((element) => {
      if (element > limit) {
        // console.log(element);
        limit = element;
      }
    });

    // console.log('before rounding', limit);
    let stepLimitArray = Utils.round(limit);
    limit = stepLimitArray[0];
    step = stepLimitArray[1];
    // console.log('STEP', step);
    // console.log('LIMIT', limit);
    this.barChartOptions.scales.yAxes[0].ticks.max = limit;
    this.barChartOptions.scales.yAxes[0].ticks.stepsize = step;
    //console.log('OPTIONS TO BE PUSHED', this.lineChartOptions);

    let newCasesDataSet: ChartDataSets = {};
    newCasesDataSet.label = 'New cases';
    this.barChartColors.push({
      borderColor: 'rgba(110, 110, 79, 1)',
      backgroundColor: 'rgba(227, 227, 163, 1)',
    });
    this.barChartData.push(
      ChartUtils.getCases(newCasesDataSet, cleanData, 'new')
    );

    let criticalCasesDataSet: ChartDataSets = {};
    criticalCasesDataSet.label = 'Critical cases';
    this.barChartColors.push({
      borderColor: 'rgba(122, 4, 0, 1)',
      backgroundColor: 'rgba(201, 104, 101, 1)',
    });
    this.barChartData.push(
      ChartUtils.getCases(criticalCasesDataSet, cleanData, 'critical')
    );

    let activeCasesDataSet: ChartDataSets = {};
    activeCasesDataSet.label = 'Active cases';
    this.barChartColors.push({
      borderColor: 'rgba(94, 50, 0, 1)',
      backgroundColor: 'rgba(255, 140, 8, 1)',
    });
    this.barChartData.push(
      ChartUtils.getCases(activeCasesDataSet, cleanData, 'active')
    );

    let recoveredCasesDataSet: ChartDataSets = {};
    recoveredCasesDataSet.label = 'Recovered cases';
    this.barChartColors.push({
      borderColor: 'rgba(46, 71, 71, 1)',
      backgroundColor: 'rgba(144, 232, 229, 1)',
    });
    this.barChartData.push(
      ChartUtils.getCases(recoveredCasesDataSet, cleanData, 'recovered')
    );

    let newDeathsDataSet: ChartDataSets = {};
    newDeathsDataSet.label = 'New deaths';
    this.barChartColors.push({
      borderColor: 'rgba(15, 15, 54, 1)',
      backgroundColor: 'rgba(66, 66, 227, 1)',
    });
    this.barChartData.push(
      ChartUtils.getDeaths(newDeathsDataSet, cleanData, 'new')
    );

    let totalDeathsDataSet: ChartDataSets = {};
    totalDeathsDataSet.label = 'Total deaths';
    this.barChartColors.push({
      borderColor: 'rgba(33, 30, 30, 1)',
      backgroundColor: 'rgba(112, 101, 101, 1)',
    });
    this.barChartData.push(
      ChartUtils.getDeaths(totalDeathsDataSet, cleanData, 'total')
    );

    this.loaded = true;
    // detect the baseChart in the DOM after loaded is true
    this.changeDetectorRef.detectChanges();
    // console.log('MAYBE HERE', this.lineChart);
    this.updateConfigAsNewObject(this.barChartOptions);
    // console.log('AND NOW???', this.lineChart);
  }

  updateConfigAsNewObject(lineChartOptions) {
    // console.log('IN UPDATE ', this.lineChart);
    //  console.log('BEFORE UPDATE', this.lineChart.options);
    this.barChart.chart.config.options = lineChartOptions;
    // console.log('AFTER UPDATE', this.lineChart.options);
    // update chart options on DOM
    this.barChart.ngOnChanges({} as SimpleChanges);
  }
}
