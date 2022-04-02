import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {CurrencyDashboardService} from "../../services/currency-dashboard.service";
import {Currency} from "../../../../shared/models/Currency";
import {XeConvertedCurrency} from "../../../../shared/models/XeConvertedCurrency";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-currency-dashboard',
  templateUrl: './currency-dashboard.component.html',
  styleUrls: ['./currency-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyDashboardComponent implements OnInit {

  convertedCurrency?: XeConvertedCurrency;
  convertedCurrencyHistory: XeConvertedCurrency[] = [];
  currencies: Currency[] = [
    {
      name: 'EUR',
    },
    {
      name: 'USD'
    },
    {
      name: 'CHF'
    },
    {
      name: 'AED'
    },
  ];

  currencyForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    selectedFromCurrency: new FormControl('', Validators.required),
    selectedToCurrency: new FormControl('', Validators.required),
  });

  private subscriptions = new Subscription();

  constructor(
    private readonly currencyDashboardService: CurrencyDashboardService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  convertCurrency(): void {
    const form = this.currencyForm.value;
    this.subscriptions.add(
    this.currencyDashboardService.getCurrencyValue(form.selectedFromCurrency, form.selectedToCurrency, form.amount).subscribe(data => {
      this.ngZone.run(() => {
        this.convertedCurrency = data;
        this.convertHistory(data);
        this.cdr.markForCheck();
      });
    }));
  }

  convertBackCurrency(): void {
    const form = this.currencyForm.value;
    this.subscriptions.add(
    this.currencyDashboardService.getRevertedCurrencyValue(form.selectedFromCurrency, form.selectedToCurrency, this.convertedCurrency?.from[0].mid).subscribe(data => {
      this.ngZone.run(() => {
        this.convertedCurrency = data;
        this.convertHistory(data);
        this.cdr.markForCheck();
      });
    }));
    this.currencyForm.patchValue({
      amount: this.convertedCurrency?.from[0].mid,
      selectedFromCurrency: form.selectedToCurrency,
      selectedToCurrency: form.selectedFromCurrency,
    })
  }

  convertHistory(currencyData: XeConvertedCurrency): void {
    this.convertedCurrencyHistory.push(currencyData);
  }

}
