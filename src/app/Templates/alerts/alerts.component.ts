import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
  private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  public dismissSnackbar(): void {
    this.snackBar.dismiss();
 }
}
