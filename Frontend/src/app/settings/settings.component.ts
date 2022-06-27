import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  mode: DarkMode | any;
  view: string;

  constructor(private darkModeService: DarkModeService) {
    this.view = "preferences";
  }

  ngOnInit(): void {
    this.update();
  }

  toggleLight(): void {
    this.darkModeService.disable();
  }

  toggleDark(): void {
    this.darkModeService.enable();
  }

  changeTab(tab: string): void {
    this.view = tab;
    this.update();
  }

  update(): void {
    this.mode = JSON.parse(localStorage.getItem('dark-mode') || '[]');
    console.log(this.mode.darkMode);
  }

}

export interface DarkMode {
  darkMode: any
} 