import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'covid-api';

  constructor(protected $gaService: GoogleAnalyticsService) {
  }

  ngOnInit() {
    this.$gaService.pageView('/', 'covid-stats');
  }
}
