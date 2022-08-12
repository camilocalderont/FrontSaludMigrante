import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  formUpdate = new FormGroup({
    direction: new FormControl(),
    locationName: new FormControl(),
  });

  constructor(
    private requestComments: RequestService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.datafile = this.activeRoute.snapshot.paramMap.get('data') || '';
    this.requestComments.getNucleoBySisben(this.datafile).subscribe(data => {
      this.dataSource = data;
      this.formUpdate.setValue({
        direction: this.dataSource[0].direction,
        locationName: this.dataSource[0].locationName
      });
      console.log(data);
    });
  }
  GetformUpdate(){

  }
}
