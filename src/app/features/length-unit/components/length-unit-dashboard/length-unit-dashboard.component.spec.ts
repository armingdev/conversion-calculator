import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LengthUnitDashboardComponent } from './length-unit-dashboard.component';

describe('LengthUnitDashboardComponent', () => {
  let component: LengthUnitDashboardComponent;
  let fixture: ComponentFixture<LengthUnitDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LengthUnitDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LengthUnitDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
