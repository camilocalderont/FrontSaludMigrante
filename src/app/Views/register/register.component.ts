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
  title:string;
  fecha:string;
  formUdateData = {} as formUpdateI;
  formUpdate = new FormGroup({
    direction: new FormControl(''),
    mobile: new FormControl(''),
    locationId: new FormControl(0),
  });

  constructor(
    private requestComments: RequestService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
    this.fecha = this.route.snapshot.data['fecha'];
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
    this.formUdateData.mobile = form.mobile.toString();
    this.formUdateData.locationId = form.locationId;
    this.requestComments.updateMigrationStatement(this.formUdateData).subscribe(data => {
      //console.log(data);
      this.ngOnInit();
    })
    this.router.navigate(['/Confirmacion', this.datafile]);
  }



  openSnackBar(message: string) {
    this.snackBar.openFromComponent(AlertsComponent, {
      data: message,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }
}
