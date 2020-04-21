import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  color: ThemePalette = 'accent';

  worldStatsLabel: string;
  statsByCountryLabel: string;

 


  currentMode: string;

  constructor() { 
    this.currentMode = Modes.LightMode;
    this.worldStatsLabel = 'World statistics';
    this.statsByCountryLabel = "Stats by country";
  }

  ngOnInit(): void {
  }

  changeMode(){
    if (this.currentMode === Modes.LightMode){
      this.currentMode = Modes.DarkMode;
    } else {
      this.currentMode = Modes.LightMode;
    }

  }

 

}
enum Modes {
  LightMode = 'Light Mode',
  DarkMode = "Dark Mode"
}