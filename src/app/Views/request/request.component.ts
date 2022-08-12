import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { validationRequestI } from 'src/app/Models/Request.interface';
import { migrantsAcreditadomI } from "src/app/Models/migrantsAcreditadom.interface";
import { RequestService } from 'src/app/Services/Request/request.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  errorMessage = '';
  viewErrorMesagge: boolean = false;
  cardResponse: boolean = false;

  public addRequestForm = {} as validationRequestI;
  public MigrantsStatementsFile: string = "";
  requestForm = new FormGroup({
    DocNum: new FormControl(),
    Surname: new FormControl(),
    BirthDate: new FormControl()
  });

  constructor(
    private requestComments: RequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validate() {
    this.addRequestForm.docNum = this.requestForm.value.DocNum.toString();
    this.addRequestForm.surname = this.requestForm.value.Surname;
    this.addRequestForm.birthDate = this.requestForm.get('BirthDate')?.value.format('YYYY-MM-DD');
    console.log(this.addRequestForm);
    this.requestComments.requestPost(this.addRequestForm).subscribe(
      (data) => {
        if (data.isRegistered == true) {
          if (data.migrantsStatementsFile == "") {
            console.log("No hay archivo1", data);
            this.errorMessage = 'No se encontraron resultados. No se encuentra encuestado al SISBEN en Bogotá';
            this.viewErrorMesagge = true;
            this.cardResponse = true;
          } else {
            console.log("Si hay archivo", data);
            this.MigrantsStatementsFile = data.migrantsStatementsFile;
            this.viewErrorMesagge = false;
            // this.router.navigate(['/Registro'], {queryParams:{data:this.MigrantsStatementsFile}});
            this.router.navigate(['/Registro', this.MigrantsStatementsFile]);
          }
        } else {
          console.log("No hay archivo2", data);
          this.errorMessage = 'No se encontraron registros. No se encuentra registrado al regimen subsidiado en Bogotá';
          this.viewErrorMesagge = true;
        }

      });
    this.viewErrorMesagge = true;
  }
}
