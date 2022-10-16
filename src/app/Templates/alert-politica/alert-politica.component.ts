import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild,} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { RequestComponent } from 'src/app/Views/request/request.component';

@Component({
  selector: 'app-alert-politica',
  templateUrl: './alert-politica.component.html',
  styleUrls: ['./alert-politica.component.scss']
})
export class AlertPoliticaComponent implements OnInit {

  subject = new BehaviorSubject(false);
  emmitsubject = this.subject.asObservable();


  acceptPolicy: boolean;
  @Output() messageEvent = new EventEmitter<boolean>();


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,private snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }


  public AutorizaPolitica(): void {
  this.subject.next(true);
  this.snackBar.dismiss();
  }


  public NoAutorizaPolitica(): void {
  this.subject.next(false);
  this.snackBar.dismiss();
}


}
