import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http:HttpClient) { }

  getQuote(symbol : string): Observable<any>
  {
    return this.http.get<any>(`https://api.tdameritrade.com/v1/marketdata/${symbol}/quotes?apikey=FI1DGLKK127OKDAUB8VHWZEOIFM8VE5M`);
  }

  getQuotes(): Observable<any>
  {
    return this.http.get<any>(`https://api.tdameritrade.com/v1/marketdata/quotes?apikey=FI1DGLKK127OKDAUB8VHWZEOIFM8VE5M&symbol=DIA%2CSPY%2CQQQ`);
  }
}
