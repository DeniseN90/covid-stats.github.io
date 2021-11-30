import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {
    this.getAllCountries();
    this.isMobile = window.screen.width < 560;
   }
  error: string;

  countries: string[];
  worldStats: any;
  countryStat: any;
  isMobile: boolean;

  headers =  {
    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    'x-rapidapi-key': '41644c2f8cmsh4fcb03bb7b5648ap193587jsn102b4f01579c'
}

  getWorldStats(){
    const requestOptions = { headers: this.headers };
      return this.http.get<any>('https://covid-193.p.rapidapi.com/statistics',  requestOptions );
  }

  getAllCountries(){
    const requestOptions = { headers: this.headers };
    return this.http.get<any>('https://covid-193.p.rapidapi.com/countries',  requestOptions);
  }

  getHistory(country: string){
    const httpOptions = {
      headers : this.headers,
      params: {'country': country }
    };
    return this.http.get<any>('https://covid-193.p.rapidapi.com/history', httpOptions);
  }
}