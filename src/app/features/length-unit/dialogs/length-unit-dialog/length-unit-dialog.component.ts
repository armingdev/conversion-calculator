import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LengthUnitDashboardService} from "../../services/length-unit-dashboard.service";
import {LengthUnit} from "../../../../shared/models/LengthUnit";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-length-unit-dialog',
  templateUrl: './length-unit-dialog.component.html',
  styleUrls: ['./length-unit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LengthUnitDialogComponent implements OnInit {

  lengthUnits: LengthUnit[] = [];
  unitControl = new FormControl();
  filteredLengthUnits$?: Observable<LengthUnit[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: LengthUnit,
              private readonly lengthUnitDashboardService: LengthUnitDashboardService,) { }

  ngOnInit(): void {
    this.loadLengthUnits();
    this.filteredLengthUnits$ = this.unitControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.lengthUnits.slice())),
    );
  }

  displayFn(lengthUnit: LengthUnit): string {
    return lengthUnit && lengthUnit.name ? lengthUnit.name : '';
  }

  loadLengthUnits() {
    return this.lengthUnitDashboardService.getLengthUnits().subscribe(data => {
      this.lengthUnits = data;
    });
  }

  private _filter(name: string): LengthUnit[] {
    const filterValue = name.toLowerCase();
    return this.lengthUnits.filter(lengthUnit => lengthUnit.name.toLowerCase().includes(filterValue));
  }
}
