import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LengthUnit} from "../../../../shared/models/LengthUnit";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LengthUnitDashboardService} from "../../services/length-unit-dashboard.service";

@Component({
  selector: 'app-length-unit-dashboard',
  templateUrl: './length-unit-dashboard.component.html',
  styleUrls: ['./length-unit-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LengthUnitDashboardComponent implements OnInit {

  convertedLengthUnit: number = 0;
  convertedLengthUnitHistory: number[] = [];
  lengthUnits: LengthUnit[] = [];
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

  constructor(private readonly lengthUnitDashboardService: LengthUnitDashboardService) {
  }

  ngOnInit(): void {
    this.loadLengthUnits();
  }

  loadLengthUnits() {
    return this.lengthUnitDashboardService.getLengthUnits().subscribe(data => {
      this.lengthUnits = data
    })
  }

  convertLengthUnit() {
    const form = this.lengthUnitForm.value;

    const fromUnit = this.activeLengthUnits.find((unit) =>
      unit.name === form.selectedFromLengthUnit
    );
    const toUnit = this.activeLengthUnits.find((unit) =>
      unit.name === form.selectedToLengthUnit
    );
    if (fromUnit && toUnit) {
      this.convertedLengthUnit = form.amount * fromUnit.sizeInMeter / toUnit.sizeInMeter
    }
  }

  convertBackLengthUnit() {
    const form = this.lengthUnitForm.value;

    const fromUnit = this.activeLengthUnits.find((unit) =>
      unit.name === form.selectedFromLengthUnit
    );
    const toUnit = this.activeLengthUnits.find((unit) =>
      unit.name === form.selectedToLengthUnit
    );
    if (fromUnit && toUnit) {
      this.convertedLengthUnit = form.amount * fromUnit.sizeInMeter / toUnit.sizeInMeter
    }
  }

}
