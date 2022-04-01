import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LengthUnitDashboardComponent} from "./components/length-unit-dashboard/length-unit-dashboard.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LengthUnitDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LengthUnitRoutingModule { }
