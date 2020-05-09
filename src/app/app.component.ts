import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'covid-api';

  constructor(protected $gaService: GoogleAnalyticsService, protected router: Router) {
  }

  ngOnInit() {
    this.$gaService.pageView('/', 'covid-stats');
  }
}
