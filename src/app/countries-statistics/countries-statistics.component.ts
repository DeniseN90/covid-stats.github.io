import { Component, OnInit } from '@angular/core';
import { CountriesStatisticsService } from './countries-statistics.service';

@Component({
  selector: 'app-countries-statistics',
  templateUrl: './countries-statistics.component.html',
  styleUrls: ['./countries-statistics.component.css']
})
export class CountriesStatisticsComponent implements OnInit {
  error: string;

  constructor( private countriesStatsSerice: CountriesStatisticsService) {
    this.countriesStatsSerice.getCountriesStats().subscribe(
      (data) => {
        console.log(data);
      },
      (data) => {
        this.error = data.errors;

      }
    )
   }

  ngOnInit(): void {
  }

}
