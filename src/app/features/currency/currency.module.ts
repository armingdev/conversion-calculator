import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyDashboardComponent } from './components/currency-dashboard/currency-dashboard.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CurrencyDashboardComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    SharedModule,
  ],

})
export class CurrencyModule { }
