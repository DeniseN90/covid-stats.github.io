import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ChartsModule
  ],
  exports: [HomeComponent, DoughnutChartComponent, LineChartComponent],
  providers: [ RenderLongNumbersPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
