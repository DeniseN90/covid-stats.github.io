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
import { AppService } from 'src/app/app.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'linechart-component',
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input()
  inputData: any[];
  loaded: boolean;
  @ViewChild(BaseChartDirective, { static: false })
  lineChart: BaseChartDirective;
  lineChartLabels: Label[];
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
            stepsize: 0,
          },
        },
      ],
    },
  };
  lineChartLegend = true;
  lineChartPlugins = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.lineChartData = [];
    this.lineChartColors = [];
    this.lineChartLabels = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.inputData !== undefined) {
      this.lineChartData = [];
      this.lineChartColors = [];
      this.lineChartLabels = [];
      console.log('input data', this.inputData);
      this.createLineChart(this.inputData.reverse());
    }
  }

  private createLineChart(data: any[]) {
    data.forEach((el) => {
      const day = el.day.toString().substring(5);
      if (this.lineChartLabels.indexOf(day) === -1) {
        this.lineChartLabels.push(day);
      }
    });
    // console.log('Xa', this.lineChartLabels.length);
    // total cases
    let totalCasesDataSet: ChartDataSets = {};
    totalCasesDataSet.label = 'Total cases';
    this.lineChartColors.push({
      borderColor: 'rgba(38, 51, 33, 1)',
      backgroundColor: 'rgba(177, 237, 157, .5)',
    });
    this.lineChartData.push(this.getCases(totalCasesDataSet, data, 'total'));
    let limit = 0;
    let step = 0;
    // console.log('LINE CHART DATA', this.lineChartData);
    // get the upper linit for this chart based on total case max value
    this.lineChartData[0].data.forEach((element) => {
      if (element > limit) {
        // console.log(element);
        limit = element;
      }
    });

    // let testsDataSet: ChartDataSets = {};
    // testsDataSet.label = 'Tests';
    // this.lineChartColors.push({
    //   borderColor: 'rgba(64, 69, 32, 1)',
    //   backgroundColor: 'rgba(203, 219, 96, 1)',
    // });
    // this.lineChartData.push(this.getTests(testsDataSet, data));

    // check if max value in tests
    // console.log('TEST ARRAY',this.lineChartData[1].data);
    // this.lineChartData[1].data.forEach((element) => {
    //   if (element > limit) {
    //     // console.log(element);
    //     limit = element;
    //   }
    // });

    // console.log('before rounding', limit);
    let stepLimitArray = Utils.round(limit);
    limit = stepLimitArray[0];
    step = stepLimitArray[1];
    // console.log('STEP', step);
    // console.log('LIMIT', limit);

    this.lineChartOptions.scales.yAxes[0].ticks.max = limit;
    this.lineChartOptions.scales.yAxes[0].ticks.stepsize = step;
    //console.log('OPTIONS TO BE PUSHED', this.lineChartOptions);

    let newCasesDataSet: ChartDataSets = {};
    newCasesDataSet.label = 'New cases';
    this.lineChartColors.push({
      borderColor: 'rgba(110, 110, 79, 1)',
      backgroundColor: 'rgba(227, 227, 163, 1)',
    });
    this.lineChartData.push(this.getCases(newCasesDataSet, data, 'new'));
    let criticalCasesDataSet: ChartDataSets = {};
    criticalCasesDataSet.label = 'Critical cases';
    this.lineChartColors.push({
      borderColor: 'rgba(122, 4, 0, 1)',
      backgroundColor: 'rgba(201, 104, 101, 1)',
    });
    this.lineChartData.push(
      this.getCases(criticalCasesDataSet, data, 'critical')
    );

    let activeCasesDataSet: ChartDataSets = {};
    activeCasesDataSet.label = 'Active cases';
    this.lineChartColors.push({
      borderColor: 'rgba(94, 50, 0, 1)',
      backgroundColor: 'rgba(255, 140, 8, 1)',
    });
    this.lineChartData.push(this.getCases(activeCasesDataSet, data, 'active'));
    let recoveredCasesDataSet: ChartDataSets = {};
    recoveredCasesDataSet.label = 'Recovered cases';
    this.lineChartColors.push({
      borderColor: 'rgba(46, 71, 71, 1)',
      backgroundColor: 'rgba(144, 232, 229, 1)',
    });
    this.lineChartData.push(
      this.getCases(recoveredCasesDataSet, data, 'recovered')
    );

    let newDeathsDataSet: ChartDataSets = {};
    newDeathsDataSet.label = 'New deaths';
    this.lineChartColors.push({
      borderColor: 'rgba(15, 15, 54, 1)',
      backgroundColor: 'rgba(66, 66, 227, 1)',
    });
    this.lineChartData.push(this.getDeaths(newDeathsDataSet, data, 'new'));

    let totalDeathsDataSet: ChartDataSets = {};
    totalDeathsDataSet.label = 'Total deaths';
    this.lineChartColors.push({
      borderColor: 'rgba(33, 30, 30, 1)',
      backgroundColor: 'rgba(112, 101, 101, 1)',
    });
    this.lineChartData.push(this.getDeaths(totalDeathsDataSet, data, 'total'));

    this.loaded = true;
    // detect the baseChart in the DOM after loaded is true
    this.changeDetectorRef.detectChanges();
    // console.log('MAYBE HERE', this.lineChart);
    this.updateConfigAsNewObject(this.lineChartOptions);
    // console.log('AND NOW???', this.lineChart);
  }

  private getCases(outputData: ChartDataSets, inputData: any[], type: string) {
    outputData.data = [];
    let date;
    inputData.forEach((element) => {
      if (date === undefined) {
        date = element.day;
      } else {
        if (date === element.day) {
          return;
        } else {
          date = element.day;
        }
      }
      if (element.cases[type]) {
        if (type === 'new') {
          let value = Number(element.cases[type].substring(1));
          outputData.data.push(value);
        } else {
          outputData.data.push(element.cases[type]);
        }
      } else {
        outputData.data.push(0);
      }
    });
   // console.log('must be equal to Xa', outputData.data.length);
    return outputData;
  }

  private getDeaths(outputData: ChartDataSets, inputData: any[], type: string) {
    outputData.data = [];
    inputData.forEach((element) => {
      if (element.deaths[type]) {
        if (type === 'new') {
          let value = Number(element.deaths[type].substring(1));
          outputData.data.push(value);
        } else {
          outputData.data.push(element.deaths[type]);
        }
      } else {
        outputData.data.push(0);
      }
    });
    return outputData;
  }

  //   private getTests(outputData: ChartDataSets, inputData: any[]) {
  //     outputData.data = [];
  //     inputData.forEach((element) => {
  //       if (element.tests.total) {
  //         outputData.data.push(element.tests.total);
  //       } else {
  //         outputData.data.push(0);
  //       }
  //     });
  //     return outputData;
  //   }

  updateConfigAsNewObject(lineChartOptions) {
    // console.log('IN UPDATE ', this.lineChart);
    //  console.log('BEFORE UPDATE', this.lineChart.options);
    this.lineChart.chart.config.options = lineChartOptions;
    // console.log('AFTER UPDATE', this.lineChart.options);
    // update chart options on DOM
    this.lineChart.ngOnChanges({} as SimpleChanges);
  }
}
