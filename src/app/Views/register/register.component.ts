import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formUpdateI } from 'src/app/Models/migrantsStatements.interface';
import { RequestService } from 'src/app/Services/Request/request.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  displayedColumns: string[] = ['identificacion', 'Usuario', 'nacimiento', 'parentesco'];
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.datafile = this.activeRoute.snapshot.paramMap.get('data') || '';
    this.requestComments.getNucleoBySisben(this.datafile).subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource);
      this.requestComments.getMigrationStatement(this.datafile).subscribe(dataUp => {
        console.log("asd", dataUp);
        this.formUpdate.setValue({
          direction: dataUp.migrantsStatements.direction,
          mobile: dataUp.migrantsStatements.mobile,
          locationId: dataUp.migrantsStatements.locationId
        });
      })
      this.requestComments.getlocation().subscribe(data => {
        this.Location = data;
        console.log("asd", this.Location);
      })

      console.log(data);
    });
  }
  GetformUpdate(form: any) {
    this.formUdateData.dataSISBEN = this.datafile;
    this.formUdateData.direction = form.direction;
    this.formUdateData.mobile = form.mobile;
    this.formUdateData.locationId = form.locationId;
    this.requestComments.updateMigrationStatement(this.formUdateData).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    })
  this.router.navigate(['/Confirmacion', this.datafile]);
  }
}
