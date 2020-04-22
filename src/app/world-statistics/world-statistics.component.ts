import { Component, OnInit } from '@angular/core';
import { WorldStatisticsService } from './world-statistics.service';


@Component({
  selector: 'app-world-statistics',
  templateUrl: './world-statistics.component.html',
  styleUrls: ['./world-statistics.component.css']
})
export class WorldStatisticsComponent implements OnInit {
  error: string;
  dataSource: any;
 

  constructor(private worldStatsService: WorldStatisticsService) {
    this.worldStatsService.getWorldStats().subscribe(
      (data) => {
        console.log(data);
        this.dataSource = data.response;



      },
      (data) => { 
        this.error = data.errors;

      }
    )
   }

  ngOnInit(): void {
  }

}
