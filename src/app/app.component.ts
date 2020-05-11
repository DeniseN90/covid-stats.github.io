import { Component, OnInit, SimpleChanges } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'covid-api';
  otherTheme: boolean;

  constructor(protected $gaService: GoogleAnalyticsService, protected router: Router, protected appService: AppService) {
    this.otherTheme = false;
  }

  ngOnInit() {
    this.$gaService.pageView('/', 'covid-stats');
  }

  changeTheme(){
    this.otherTheme = !this.otherTheme;
  }

  getEvent(event){
    this.changeTheme();
  }
}
