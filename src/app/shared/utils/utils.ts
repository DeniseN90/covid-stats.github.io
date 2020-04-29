import { MatTableDataSource } from '@angular/material/table';

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
    } else if (limit <= 2000) {
      return [2_000, 500];
    } else if (limit <= 3000) {
      return [3_000, 500];
    } else if (limit <= 4000) {
      return [4_000, 500];
    } else if (limit <= 5_000) {
      return [5_000, 500];
    } else if (limit <= 6_000) {
      return [6_000, 500];
    } else if (limit <= 7_000) {
      return [7_000, 500];
    } else if (limit <= 8_000) {
      return [8_000, 500];
    } else if (limit <= 9_000) {
      return [9_000, 500];
    } else if (limit <= 10_000) {
      return [10_000, 1_000];
    } else if (limit <= 20_000) {
      return [20_000, 1_000];
    } else if (limit <= 30_000) {
      return [30_000, 1_000];
    } else if (limit <= 40_000) {
      return [40_000, 1_000];
    } else if (limit <= 50_000) {
      return [50_000, 10_000];
    } else if (limit <= 60_000) {
      return [60_000, 10_000];
    } else if (limit <= 70_000) {
      return [70_000, 10_000];
    } else if (limit <= 80_000) {
      return [80_000, 10_000];
    } else if (limit <= 90_000) {
      return [90_000, 10_000];
    } else if (limit <= 100_000) {
      return [100_000, 10_000];
    } else if (limit <= 110_000) {
      return [110_000, 10_000];
    } else if (limit <= 120_000) {
      return [120_000, 10_000];
    } else if (limit <= 130_000) {
      return [130_000, 10_000];
    } else if (limit <= 140_000) {
      return [140_000, 10_000];
    } else if (limit <= 150_000) {
      return [150_000, 10_000];
    } else if (limit <= 160_000) {
      return [160_000, 10_000];
    } else if (limit <= 170_000) {
      return [170_000, 10_000];
    } else if (limit <= 180_000) {
      return [180_000, 10_000];
    } else if (limit <= 190_000) {
      return [190_000, 10_000];
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
    } else if (limit <= 2_000_000) {
      return [2_000_000, 100_000];
    } else if (limit <= 3_000_000) {
      return [3_000_000, 100_000];
    } else if (limit <= 4_000_000) {
      return [4_000_000, 100_000];
    } else if (limit <= 5_000_000) {
      return [5_000_000, 100_000];
    } else if (limit <= 6_000_000) {
      return [6_000_000, 100_000];
    } else if (limit <= 7_000_000) {
      return [7_000_000, 100_000];
    } else if (limit <= 8_000_000) {
      return [8_000_000, 100_000];
    } else if (limit <= 9_000_000) {
      return [9_000_000, 100_000];
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
