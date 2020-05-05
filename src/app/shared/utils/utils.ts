export class Utils {
  

  /**
   * Takes the number, which is a decimal,
   * and gives back the upper (and lower) 
   * limit for the chart and the step size
   * @param n number to round to limit
   */
  public static roundGrowthRate(n: number) {
    let temp = Math.floor(n);
    let limitValue = '1';
    for (let i = 0; i < temp.toString(10).length; i++) {
      limitValue += '0';
    }
    let limit = Number(limitValue);
    if (limit > n * 2) {
      limit /= 2;
    }
    return limit;
  }

  /**
   * Takes the number and gives back 
   * the upper (and lower) limit for the chart
   * and the step size
   * @param n number to round to limit
   */
  public static round(n: number) {
    let limitValue = '1';
    for (let i = 0; i < n.toString(10).length; i++) {
      limitValue += '0';
    }
    let limit = Number(limitValue);
    if (limit > n * 4) {
      limit /= 4;
    }
    if (limit > n * 2) {
      limit /= 2;
    }
    return limit;
  }
}
