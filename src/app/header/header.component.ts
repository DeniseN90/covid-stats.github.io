import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  color: ThemePalette = 'accent';

 


  currentMode: string;

  constructor() { 
    this.currentMode = Modes.LightMode;
  }

  ngOnInit(): void {
  }

  changeMode(){
    if (this.currentMode == Modes.LightMode){
      this.currentMode = Modes.DarkMode;
    } else {
      this.currentMode == Modes.LightMode;
    }

  }

 

}
enum Modes {
  LightMode = 'Light Mode',
  DarkMode = "Dark Mode"
}