import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
  Input,
  OnChanges,
} from '@angular/core';
import { Label, BaseChartDirective, MultiDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'doughnut-component',
  templateUrl: './doughnut-chart.component.html',
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  @Input()
  inputData: any[];

  doughnutChartLabels: Label[];
  loaded: boolean;
  @ViewChild(BaseChartDirective, { static: false })
  doughnutChart: BaseChartDirective;
  doughnutChartData: MultiDataSet[];
  doughnutChartType = 'doughnut';
  totalActiveCases: number;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.doughnutChartData = [];
    this.doughnutChartLabels = ['Critical cases', 'Other active cases'];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.inputData !== undefined) {
      this.doughnutChartData = [];
      this.createDoughnutChart();
    }
  }

  private createDoughnutChart() {
    let critical = this.inputData[this.inputData.length - 1].cases.critical;
    let criticalCases: MultiDataSet = [];
    criticalCases = critical;
    this.doughnutChartData.push(criticalCases);

    this.totalActiveCases = this.inputData[
      this.inputData.length - 1
    ].cases.active;
    let others: any = this.totalActiveCases - critical;
    let activeCases: MultiDataSet = [];
    activeCases = others;
    this.doughnutChartData.push(activeCases);
    this.loaded = true;
    // this allows the linechart update on the UI
    this.changeDetectorRef.detectChanges();
  }
}
