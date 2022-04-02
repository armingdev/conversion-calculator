import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'currency',
    pathMatch: 'full'
  },
  {
    component: ContentLayoutComponent,
    path: 'currency',
    loadChildren: () => import('./features/currency/currency.module').then(m => m.CurrencyModule),
  },
  {
    component: ContentLayoutComponent,
    path: 'length-unit',
    loadChildren: () => import('./features/length-unit/length-unit.module').then(m => m.LengthUnitModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
