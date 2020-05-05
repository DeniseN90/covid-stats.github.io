import { Label } from 'ng2-charts';

export class ChartUtils {
  /**
   * The country data are copied in another array,
   * check for same days data
   * @param data the country data
   */
  public static getCleanedData(data: any[]) {
    let cleanData = [];
    let labels = [];
    data.forEach((element) => {
      const day = element.day.toString().substring(5);
      if (labels.indexOf(day) === -1) {
        labels.push(day);
        cleanData.push(element);
      }
    });
    return cleanData;
  }

  /**
   * Returns an array of labels for
   * the chart
   * @param data
   */
  public static getChartLabels(data: any[]) {
    let labels: Label[] = [];
    data.forEach((element) => {
      const day = element.day.toString().substring(5);
      if (labels.indexOf(day) === -1) {
        labels.push(day);
      }
    });
    return labels;
  }

  /**
   * Takes an array of country data, and parses the cases,
   * according the needed type of cases.
   * Returns the ChartDataSet
   * @param inputData the country data
   * @param type type of cases
   */
  public static getCases(inputData: any[], type: string) {
    let outputData = [];
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
          outputData.push(value);
        } else {
          outputData.push(element.cases[type]);
        }
      } else {
        outputData.push(0);
      }
    });
    return outputData;
  }

  /**
   * Takes an array of country data, and parses the deaths,
   * according the needed type of deaths.
   * Returns the ChartDataSet
   * @param inputData the country data
   * @param type of deaths
   */
  public static getDeaths(inputData: any[], type: string) {
    let outputData = [];
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
      if (element.deaths[type]) {
        if (type === 'new') {
          let value = Number(element.deaths[type].substring(1));
          outputData.push(value);
        } else {
          outputData.push(element.deaths[type]);
        }
      } else {
        outputData.push(0);
      }
    });
    return outputData;
  }

  /**
   * Takes a chartdataset and returns the
   * growth rate for that sequence
   * @param set a chartdataset
   */
  public static getGrowthRate(set: any) {
    const data: number[] = set.data as number[];
    let rateData = [];
    for (let i = 0; i < data.length - 1; i++) {
      let yesterday = Number(data[i]);
      let today = Number(data[i + 1]);
      let r =
        ((today ? today : 1) - (yesterday ? yesterday : today)) /
        (yesterday ? yesterday : 1);
      r *= 100;
      r = Number(r.toFixed(2));
      rateData[i] = r;
    }
    return rateData;
  }
}
