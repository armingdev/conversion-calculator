import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LengthUnit} from "../../../../shared/models/LengthUnit";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-length-unit-dashboard',
  templateUrl: './length-unit-dashboard.component.html',
  styleUrls: ['./length-unit-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LengthUnitDashboardComponent implements OnInit {

  convertedLengthUnit: number = 0;
  convertedLengthUnitHistory: number[] = [];
  activeLengthUnits: LengthUnit[] = [
    {
      name: 'Meter',
      shortName: 'm',
      sizeInMeter: 1,
    },
    {
      name: 'Yard',
      shortName: 'yd',
      sizeInMeter: 0.9144,
    },
    {
      name: 'Inch',
      shortName: 'in',
      sizeInMeter: 0.0254,
    },
  ];



  lengthUnitForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    selectedFromLengthUnit: new FormControl('', Validators.required),
    selectedToLengthUnit: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  convertLengthUnit() {
  const form = this.lengthUnitForm.value;
  //TODO calculation
    // form.amount * form.selectedFromLengthUnit.sizeInMeter / form.selectedToLengthUnit.sizeInMeter
  }

  convertBackLengthUnit() {

  }

}
