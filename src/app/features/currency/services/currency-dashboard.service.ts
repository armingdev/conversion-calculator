import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {XeConvertedCurrency} from "../../../shared/models/XeConvertedCurrency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyDashboardService {

  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${environment.xeApiUsername}:${environment.xeApiToken}`)
    })
  };

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getCurrencyValue(from: string, to: string, amount: number): Observable<XeConvertedCurrency> {
    return this.http.get<XeConvertedCurrency>(`${this.baseUrl}/convert_to.json/?to=${from}&from=${to}&amount=${amount}&decimal_places=2`, this.httpOptions);
  }

  getRevertedCurrencyValue(from: string, to: string, amount: number | undefined): Observable<XeConvertedCurrency> {
    return this.http.get<XeConvertedCurrency>(`${this.baseUrl}/convert_to.json/?to=${to}&from=${from}&amount=${amount}&decimal_places=2`, this.httpOptions);
  }
}
