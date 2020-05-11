import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { WorldStatisticsComponent } from './world-statistics/world-statistics.component';
import { CountriesStatisticsComponent } from './countries-statistics/countries-statistics.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from './footer/footer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RenderLongNumbersPipe } from './shared/utils/render-long-numbers.pipe';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './countries-statistics/charts/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './countries-statistics/charts/line-chart/line-chart.component';
import { RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BarChartMobileComponent } from './countries-statistics/charts/mobile-charts/bar-chart-mobile.component';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { RateChartComponent } from './countries-statistics/charts/rate-chart/ratechart.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    WorldStatisticsComponent,
    CountriesStatisticsComponent,
    FooterComponent,
    RenderLongNumbersPipe,
    DoughnutChartComponent,
    LineChartComponent,
    BarChartMobileComponent,
    RateChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ChartsModule,
    RouterModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    NgxGoogleAnalyticsModule.forRoot('UA-90688399-7'),
    NgxGoogleAnalyticsRouterModule,
    AppRoutingModule,
  ],
  exports: [RouterModule],
  providers: [RenderLongNumbersPipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
