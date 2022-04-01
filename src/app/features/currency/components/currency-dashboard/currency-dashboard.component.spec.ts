import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDashboardComponent } from './currency-dashboard.component';
import {CurrencyDashboardService} from "../../services/currency-dashboard.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CurrencyConvert', () => {
  let component: CurrencyDashboardComponent;
  let fixture: ComponentFixture<CurrencyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDashboardComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CurrencyDashboardService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#convertCurrency should convert #amount', () => {
    expect(component.amount)
      .withContext('amount is empty')
      .toBe(0);
    component.amount = 100;
    component.selectedFromCurrency = 'EUR'
    component.selectedToCurrency = 'USD'
    component.convertCurrency();
    expect(component.amount)
      .withContext('off after second click')
      .toBeGreaterThan(0)
  });
});
