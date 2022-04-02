import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LengthUnitRoutingModule } from './length-unit-routing.module';
import { LengthUnitDashboardComponent } from './components/length-unit-dashboard/length-unit-dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LengthUnitDialogComponent } from './dialogs/length-unit-dialog/length-unit-dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    LengthUnitDashboardComponent,
    LengthUnitDialogComponent,
  ],
  imports: [
    CommonModule,
    LengthUnitRoutingModule,
    MatDialogModule,
    MatAutocompleteModule,
    SharedModule,
  ],
  entryComponents: [LengthUnitDialogComponent]
})
export class LengthUnitModule { }
