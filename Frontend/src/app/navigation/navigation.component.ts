import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { Stock } from '../models/Stock.model';
import { QuotesService } from '../services/quotes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  dia: Stock;
  spy: Stock;
  qqq: Stock;
  etfs: Array<Stock> = [];
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService, private quotes:QuotesService) {
    this.dia = {
      symbol: '',
      lastPrice: 0,
      netChange: 0,
      netPercentChangeInDouble: 0
    }
    this.spy = {
      symbol: '',
      lastPrice: 0,
      netChange: 0,
      netPercentChangeInDouble: 0
    }
    this.qqq = {
      symbol: '',
      lastPrice: 0,
      netChange: 0,
      netPercentChangeInDouble: 0
    }
  }

  ngOnInit(): void {
    this.quotes.getQuotes().subscribe((res) =>  {
      this.dia = res.DIA;
      this.spy = res.SPY;
      this.qqq = res.QQQ;
      this.update();
    },
    (err) => console.log(err));

  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

  update(): void {
    this.etfs = [this.dia, this.spy, this.qqq];
  }

}
