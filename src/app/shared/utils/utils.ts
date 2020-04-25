export class Utils {
  public static round(limit: number) {
    if (limit < 10) {
      return [10, 1];
    } else if (limit <= 50) {
      return [50, 10];
    } else if (limit <= 100) {
      return [100, 10];
    } else if (limit <= 500) {
      return [500, 50];
    } else if (limit <= 1000) {
      return [1_000, 100];
    } else if (limit <= 5_000) {
      return [5_000, 100];
    } else if (limit <= 10_000) {
      return [10_000, 1_000];
    } else if (limit <= 50_000) {
      return [50_000, 10_000];
    } else if (limit <= 100_000) {
      return [100_000, 10_000];
    } else if (limit <= 200_000) {
      return [200_000, 10_000];
    } else if (limit <= 300_000) {
      return [300_000, 10_000];
    } else if (limit <= 400_000) {
      return [400_000, 10_000];
    } else if (limit <= 500_000) {
      return [500_000, 100_000];
    } else if (limit <= 600_000) {
      return [600_000, 100_000];
    } else if (limit <= 700_000) {
      return [700_000, 100_000];
    } else if (limit <= 800_000) {
      return [800_000, 100_000];
    } else if (limit <= 900_000) {
      return [900_000, 100_000];
    } else if (limit <= 1_000_000) {
      return [1_000_000, 100_000];
    } else if (limit <= 10_000_000) {
      return [10_000_000, 1_000_000];
    } else {
      return [100_000_000, 1_000_000];
    }
  }

  // static replaceAt(string, index, replace) {
  //   return string.substring(0, index) + replace + string.substring(index + 1);
  // }
}
