import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { element } from 'protractor';

export class ChartUtils {
  /**
   * The dates associated with the country data are inserted into the label array,
   * a check is made not to insert the same date twice
   * @param data the country data
   * @param labels the empty array of label
   * @param entries the number of entries that will be displayed
   */
  public static getLabelsAndCleanedData(data: any[], labels: Label[], cleanData: any[]) {
    data.forEach((element) => {
      const day = element.day.toString().substring(5);
      if (labels.indexOf(day) === -1) {
        labels.push(day);
        cleanData.push(element);
      }
    });
  }

  /**
   * Takes an array of country data, and parses the cases,
   * according the needed type of cases.
   * Returns the ChartDataSet
   * @param outputData array to be returned
   * @param inputData the country data
   * @param type type of cases
   */
  public static getCases(
    outputData: ChartDataSets,
    inputData: any[],
    type: string
  ) {
    outputData.data = [];
    let date;
    inputData.forEach((element) => {
      // control not to insert more data for the same day
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
    return outputData;
  }

  /**
   * Takes an array of country data, and parses the deaths,
   * according the needed type of deaths.
   * Returns the ChartDataSet
   * @param outputData array to be returned
   * @param inputData the country data
   * @param type of deaths
   */
  public static getDeaths(
    outputData: ChartDataSets,
    inputData: any[],
    type: string
  ) {
    outputData.data = [];
    let date: any;
    inputData.forEach((element) => {
      // control not to insert more data for the same day
      if (date === undefined) {
        date = element.day;
      } else {
        if (date === element.day) {
          return;
        } else {
          date = element.day;
        }
      }
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
}
