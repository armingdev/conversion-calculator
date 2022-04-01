import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LengthUnitRoutingModule } from './length-unit-routing.module';
import { LengthUnitDashboardComponent } from './components/length-unit-dashboard/length-unit-dashboard.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    LengthUnitDashboardComponent
  ],
  imports: [
    CommonModule,
    LengthUnitRoutingModule,
    SharedModule,
  ]
})
export class LengthUnitModule { }
