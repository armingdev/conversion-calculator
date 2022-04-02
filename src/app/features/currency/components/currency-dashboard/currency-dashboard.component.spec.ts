import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CurrencyDashboardComponent} from './currency-dashboard.component';
import {CurrencyDashboardService} from "../../services/currency-dashboard.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";
import * as Rx from 'rxjs';
import {delay} from "rxjs/operators";
import {XeConvertedCurrency} from "../../../../shared/models/XeConvertedCurrency";

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [CurrencyDashboardComponent],
    imports: [HttpClientTestingModule],
    providers: [
      {provide: CurrencyDashboardService}
    ],
  })
    .compileComponents();
});

describe('CurrencyConvert', () => {
  let component: CurrencyDashboardComponent;
  let fixture: ComponentFixture<CurrencyDashboardComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create CurrencyDashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('Convert button should be disabled on empty amount', () => {
    const submitButton = fixture.debugElement.query(By.css('button[name="submit-button"]'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('#convertCurrency should convert #amount', fakeAsync(() => {
    expect(component.currencyForm.value.amount)
      .withContext('amount is empty')
      .toBe('');

    component.currencyForm.value.amount = 100;
    component.currencyForm.value.selectedFromCurrency = 'EUR'
    component.currencyForm.value.selectedToCurrency = 'USD'

    let currencyService = fixture.debugElement.injector.get(CurrencyDashboardService);
    let fakeCurrencyResponse: XeConvertedCurrency = {
      terms: "http://www.xe.com/legal/dfs.php",
      privacy: "http://www.xe.com/privacy.php",
      to: "EUR",
      amount: 100.0,
      timestamp: "2022-04-01T00:00:00Z",
      from: [
        {
          quotecurrency: "USD",
          mid: 110.73
        }
      ]
    };
    let spy_getCurrency = spyOn(currencyService, 'getCurrencyValue').and.callFake((): Rx.Observable<XeConvertedCurrency> => {
      return Rx.of(fakeCurrencyResponse
      ).pipe(delay(2000));
    });

    component.convertCurrency();
    tick(3000);
    expect(component.convertedCurrency).toEqual(fakeCurrencyResponse);
  }));
});
