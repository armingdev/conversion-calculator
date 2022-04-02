import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LengthUnitDashboardComponent} from './length-unit-dashboard.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LengthUnitDashboardService} from "../../services/length-unit-dashboard.service";
import {MatDialogModule} from "@angular/material/dialog";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('LengthUnitConvert', () => {
  let component: LengthUnitDashboardComponent;
  let fixture: ComponentFixture<LengthUnitDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LengthUnitDashboardComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        {provide: LengthUnitDashboardService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LengthUnitDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create LengthUnitDashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('Convert button should be disabled on empty amount', () => {
    const submitButton = fixture.debugElement.query(By.css('button[name="submit-button"]'));
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('#convertLengthUnit should convert #amount', () => {
    expect(component.lengthUnitForm.value.amount)
      .withContext('amount is empty')
      .toBe('');
    component.lengthUnitForm.value.amount = 100;
    component.lengthUnitForm.value.selectedFromLengthUnit = 'Meter'
    component.lengthUnitForm.value.selectedToLengthUnit = 'Yard'
    component.convertLengthUnit();
    expect(component.lengthUnitForm.value.amount)
      .withContext('After submit clicked')
      .toBeGreaterThan(0)
  });
});
