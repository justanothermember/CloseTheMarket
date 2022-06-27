import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { Search } from '../models/Search.model';
import { Stock } from '../models/Stock.model';
import { AccountService } from '../services/account.service';
import { AssetsService } from '../services/assets.service';

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
  searchedStocks: Search[] = [];
  filteredStocks: Search[] = [];
  searchText = '';

  constructor(private darkModeService: DarkModeService, private assets:AssetsService, public service:AccountService) {
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
    this.assets.getQuotes().subscribe((res) =>  {
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

  searchSymbol(): void {
    this.searchedStocks.splice(0);
    this.filteredStocks.splice(0);
    this.assets.getSearchResults(this.searchText).subscribe((res) =>  {
      this.searchedStocks = Object.values(res);
      for (let i = 0; i < this.searchedStocks.length; i++) {
        var matches = this.searchedStocks[i].symbol.match(/\d+/g);
        if (matches == null) {
          this.filteredStocks.push(this.searchedStocks[i]);
        }
      }
    },
    (err) => console.log(err));
  }

}