import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { validationRequestI } from 'src/app/Models/Request.interface';
import { RequestService } from 'src/app/Services/Request/request.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponent } from 'src/app/Templates/alerts/alerts.component';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { RecaptchaService } from 'src/app/Services/recaptcha/recaptcha.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  public robot: boolean;
  errorMessage = '';
  viewErrorMesagge: boolean = false;
  cardResponse: boolean = true;
  lat: number = 0;
  lng: number = 0;
  dataaa: any
  inBogota = false;
  isRequiredInput: boolean = true;
  reCAPTCHAToken: string = "";
  tokenVisible: boolean = false;
  public addRequestForm = {} as validationRequestI;
  public MigrantsStatementsFile: string = "";
  requestForm = new FormGroup({
    DocNum: new FormControl(),
    Surname: new FormControl(),
    BirthDate: new FormControl()
  });

  constructor(
    public datepipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    private requestComments: RequestService,
    private router: Router,
    private snackBar: MatSnackBar,
    private recaptchaV3Service: ReCaptchaV3Service,
    public captchaSerice: RecaptchaService
  ) {
    this.dateAdapter.setLocale('es-CO'); //dd/MM/yyyy

  }

  ngOnInit(): void {
    this.removeRecaptcha();
    this.getUserLocation();

  }


  validate() {
    this.getUserLocation();
    this.cardResponse = true;
    if (localStorage.getItem('ubicacionNcliened') != null && localStorage.getItem('ubicacionNcliened') == undefined) {
      this.errorMessage = 'Para validar el registro, debes activar la ubicacion del navegador';
      this.openSnackBar(this.errorMessage);
      this.router.navigate(['/Request']);
    } else {
      if (this.inBogota) {
        if (this.requestForm.value.DocNum === null || this.requestForm.value.DocNum === '') {
          this.cleanMessage();
          // console.log("Documento vacio");
          this.errorMessage = 'No se puede completar la operación porque faltan campos por ingresar, el número ingresado no es correcto. Para PPT 6 y 8 dígitos y PEP 15 dígitos. Te invitamos a completar la información para poder continuar';
          this.openSnackBar(this.errorMessage);
          this.isRequiredInput = false;
        } else {
          if (this.requestForm.value.Surname === null || this.requestForm.value.Surname === '') {
            this.cleanMessage();
            //console.log("Apellido vacio");
            this.errorMessage = 'No se puede completar la operación porque faltan campos por ingresar, no ingreso primer apellido. Te invitamos a completar la información para poder continuar';
            this.openSnackBar(this.errorMessage);
            this.isRequiredInput = false;
          } else {
            if (this.requestForm.value.BirthDate === null || this.requestForm.value.BirthDate === '') {
              this.cleanMessage();
              //console.log("Fecha de nacimiento vacia");
              this.errorMessage = 'No se puede completar la operación porque faltan datos en el campo por ingresar, la fecha de nacimiento no es correcta DD/MM/AAAA. Te invitamos a completar la información para poder continuar';
              this.openSnackBar(this.errorMessage);
              this.isRequiredInput = false;
            } else {
              this.cleanMessage();
              this.addRequestForm.docNum = this.requestForm.value.DocNum.toString();
              this.addRequestForm.surname = this.requestForm.value.Surname;
              // this.addRequestForm.birthDate = this.requestForm.value.BirthDate.getFullYear() + "-" + this.requestForm.value.BirthDate.getMonth()  + "-" + this.requestForm.value.BirthDate.getDate();
              this.dataaa = this.datepipe.transform(this.requestForm.value.BirthDate, 'yyyy-MM-dd');
              this.addRequestForm.birthDate = this.dataaa;
              //console.log(this.addRequestForm);
              this.requestComments.requestPost(this.addRequestForm).subscribe(
                (data) => {
                  if (data.isRegistered == true) {
                    if (data.migrantsStatementsFile == "") {
                      this.cleanMessage();
                      // console.log("no esta afiliado al sisben", data);
                      this.errorMessage = 'No se encontraron resultados. No se encuentra encuestado al SISBÉN en Bogotá';
                      this.openSnackBar(this.errorMessage);
                      this.cardResponse = false;
                      this.removeRecaptcha();
                    } else {
                      this.activeRecaptcha()
                      .then((esRobot)=>{
                        if (esRobot == true) {
                          this.errorMessage = 'ERROR ERES UN ROBOT: recarga la pagina nuevamente';
                          this.openSnackBar(this.errorMessage);
                        } else {
                          this.getUserLocation();
                          this.cleanMessage();
                          //console.log("asd", data);
                          this.MigrantsStatementsFile = data.migrantsStatementsFile;
                          // this.router.navigate(['/Registro'], {queryParams:{data:this.MigrantsStatementsFile}});
                          this.router.navigate(['/Registro', this.MigrantsStatementsFile]);
                        }
                      }).catch(e=>console.log(e));

                    }
                  } else {
                    this.cleanMessage();
                    //console.log("no esta afliado ", data);
                    this.errorMessage = 'No se encontraron registros. No se encuentra afiliado al régimen subsidiado en Bogotá';
                    this.openSnackBar(this.errorMessage);
                    this.removeRecaptcha();
                  }
                }
              );
            }
          }
        }
      } else {
        this.errorMessage = 'Para validar el registro, debes estar en Bogotá';
        this.openSnackBar(this.errorMessage);
      }
    }
  }

  /*activeRecaptcha() {
    this.robot = true;
    this.recaptchaV3Service.execute('')
      .subscribe((token: string) => {
        console.log('token', token);

        const auxiliar = this.captchaSerice.getToken(token)
        console.log('tokennnnn', auxiliar);
        if (auxiliar.includes('true')) {
          this.robot = false;
        }
      });
  }*/

  activeRecaptcha = ()=>{
    return new Promise((resolve, reject)=>{

      try{
        this.recaptchaV3Service.execute('')
        .subscribe((token: string) => {
          const auxiliar = this.captchaSerice.getToken(token)
          if (auxiliar.includes('true')) {
            resolve(false);
          }else{
            resolve(true);
          }
        });
      }catch(err) {
        reject('no puede acceder al captcha');
      }     
    });
  }


  cleanMessage() {
    this.errorMessage = '';
    this.viewErrorMesagge = false;
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(AlertsComponent, {
      data: message,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        //console.log(position.coords.latitude, position.coords.longitude);
        //console.log(this.lat, this.lng);
        if (this.lat >= 4.492916 && this.lat <= 4.8398911) {
          if (this.lng <= -73.99 && this.lng >= -74.24) {
            localStorage.removeItem('ubicacionNcliened');
            this.inBogota = true;
          }
        }
        else {
          this.errorMessage = 'Para continuar con el registro, debes estar en Bogotá';
          this.openSnackBar(this.errorMessage);
          this.inBogota = false;
        }
      }, error => {
        if (error.code == error.PERMISSION_DENIED)
          this.errorMessage = 'Por favor, habilita la ubicación para poder continuar';
        this.openSnackBar(this.errorMessage);
        localStorage.setItem('ubicacionNcliened', JSON.stringify({ name: 'ubicacionNcliened' }));
      }
      );
    } else {
      // console.log("User not allow")
      this.getUserLocation();

    }
  }

  removeRecaptcha() {
    window.localStorage.removeItem('reCAPTCHAToken');
  }

  verifedUbication() {
    if (localStorage.getItem('ubicacionNcliened') == null) {
      this.errorMessage = 'Para validar el registro, debes estar en Bogotá';
      this.openSnackBar(this.errorMessage);
      this.router.navigate(['/Request']);
    }
  }

}
