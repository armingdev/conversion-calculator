import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LengthUnit} from "../../../../shared/models/LengthUnit";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {LengthUnitDialogComponent} from "../../dialogs/length-unit-dialog/length-unit-dialog.component";

@Component({
  selector: 'app-length-unit-dashboard',
  templateUrl: './length-unit-dashboard.component.html',
  styleUrls: ['./length-unit-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LengthUnitDashboardComponent implements OnInit {

  convertedLengthUnit: number = 0;
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

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
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
      this.convertedLengthUnit = form.amount * fromUnit.sizeInMeter / toUnit.sizeInMeter;
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
      this.lengthUnitForm.patchValue({
        amount: this.convertedLengthUnit.toFixed(2),
        selectedFromLengthUnit: form.selectedToLengthUnit,
        selectedToLengthUnit: form.selectedFromLengthUnit,
      })
      this.convertedLengthUnit = form.amount;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(LengthUnitDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.activeLengthUnits.push(result)
    });
  }
}
