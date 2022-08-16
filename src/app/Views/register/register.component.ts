import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { formUpdateI } from 'src/app/Models/migrantsStatements.interface';
import { RequestService } from 'src/app/Services/Request/request.service';
import { AlertsComponent } from 'src/app/Templates/alerts/alerts.component';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  displayedColumns: string[] = ['identificacion', 'Usuario', 'nacimiento', 'parentesco'];
  errorMessage = '';
  dataSource: any;
  datafile: string = "";
  Location: any;
  formUdateData = {} as formUpdateI;
  formUpdate = new FormGroup({
    direction: new FormControl(''),
    mobile: new FormControl(0),
    locationId: new FormControl(0),
  });

  constructor(
    private requestComments: RequestService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
   this.ifExistReCapcha();
    this.datafile = this.activeRoute.snapshot.paramMap.get('data') || '';
    this.requestComments.getNucleoBySisben(this.datafile).subscribe(data => {
      this.dataSource = data;
      // console.log(this.dataSource);
      this.requestComments.getMigrationStatement(this.datafile).subscribe(dataUp => {
        // console.log("asd", dataUp);
        this.formUpdate.setValue({
          direction: dataUp.migrantsStatements.direction,
          mobile: dataUp.migrantsStatements.mobile,
          locationId: dataUp.migrantsStatements.locationId
        });
      })
      this.requestComments.getlocation().subscribe(data => {
        this.Location = data;
        // console.log("asd", this.Location);
      })

      //console.log(data);
    });
  }
  GetformUpdate(form: any) {
    this.formUdateData.dataSISBEN = this.datafile;
    this.formUdateData.direction = form.direction;
    this.formUdateData.mobile = form.mobile;
    this.formUdateData.locationId = form.locationId;
    this.requestComments.updateMigrationStatement(this.formUdateData).subscribe(data => {
      //console.log(data);
      this.ngOnInit();
    })
    this.router.navigate(['/Confirmacion', this.datafile]);
  }


ifExistReCapcha() {
  if (window.localStorage) {
    if (window.localStorage.getItem('_grecaptcha') !== undefined
      && window.localStorage.getItem('_grecaptcha')
    ) {
      console.log("_grecaptcha si existe en localStorage!!");      
    }else{
      this.errorMessage = 'Para validar el registro, debes aceptar el captcha';
      this.openSnackBar(this.errorMessage);
      this.router.navigate(['/Request']);
    }
  }

}
  openSnackBar(message: string) {
    this.snackBar.openFromComponent(AlertsComponent, {
      data: message,
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
}
