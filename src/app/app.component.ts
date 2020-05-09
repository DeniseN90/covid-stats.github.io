import { Component, OnInit, NgZone } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'covid-api';

  constructor(protected $gaService: GoogleAnalyticsService, protected router: Router, protected ngZone: NgZone) {
  }

  ngOnInit() {

    this.router.routeReuseStrategy.shouldReuseRoute = function(){ return false; };
    this.$gaService.pageView('/', 'covid-stats');
    this.router.events.subscribe((events)=> {
      if(event === undefined){
      this.router.navigated = false;
      }
    });

    console.log(this.router);
  }
}
