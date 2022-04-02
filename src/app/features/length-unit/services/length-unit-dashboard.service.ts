import { Injectable } from '@angular/core';
import {LengthUnit} from "../../../shared/models/LengthUnit";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LengthUnitDashboardService {

  dataUrl = 'assets/length-unit-data/length-units.json';

  constructor(private readonly http: HttpClient) { }

  getLengthUnits() {
    return this.http.get<LengthUnit[]>(this.dataUrl);
  }
}
