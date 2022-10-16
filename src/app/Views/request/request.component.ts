import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { validationRequestI } from 'src/app/Models/Request.interface';
import { RequestService } from 'src/app/Services/Request/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponent } from 'src/app/Templates/alerts/alerts.component';
import { DateAdapter, ThemePalette } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { RecaptchaService } from 'src/app/Services/recaptcha/recaptcha.service';
import { ProtectRequestDate } from 'src/app/Models/ProtectDate';
import { ProteccionDatosService } from 'src/app/Services/Proteccion-Datos/proteccion-datos.service';
import { AlertPoliticaComponent } from 'src/app/Templates/alert-politica/alert-politica.component';
import { migrantsAcreditadomI } from 'src/app/Models/migrantsAcreditadom.interface';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})

export class RequestComponent implements OnInit
{
  parentMessage = "message from parent"
  public robot: boolean;
  errorMessage = '';
  viewErrorMesagge: boolean = false;
  cardResponse: boolean = true;
  lat: number = 0;
  lng: number = 0;
  dataaa: any
  data:any;
  inBogota = false;
  isRequiredInput: boolean = true;
  checked: boolean = false;
  color: ThemePalette;
  reCAPTCHAToken: string = "";
  tokenVisible: boolean = false;
  title:string;
  fecha:string;
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  //                Modelo Datos                          //
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  public addRequestForm = {} as validationRequestI ;
  public addProtectData = {} as ProtectRequestDate;
  public addAcreditadomI= {} as migrantsAcreditadomI;
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  public MigrantsStatementsFile: string = "";

    requestForm = new FormGroup({
    DocNum: new FormControl(),
    Surname: new FormControl(),
    BirthDate: new FormControl(),
    acceptPolicy: new FormControl(),
  });

    constructor(
    public datepipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++//
    //            Servicios Request Proteccion-Datos
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++//
    private requestComments:        RequestService,
    private serviceProtectData:     ProteccionDatosService,
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++//
    private router: Router,
    private snackBar: MatSnackBar,
    private recaptchaV3Service: ReCaptchaV3Service,
    public  captchaSerice: RecaptchaService,
    private route: ActivatedRoute,
    ) {this.dateAdapter.setLocale('es-CO'); //dd/MM/yyyy
    }
    dateDay: Date = new Date();

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
    this.fecha = this.route.snapshot.data['fecha'];
    this.removeRecaptcha();
    this.getUserLocation();

  }


  validate()
  {

    this.getUserLocation();
    this.cardResponse = true;
    if (localStorage.getItem('ubicacionNcliened') != null && localStorage.getItem('ubicacionNcliened') == undefined)
    {
      this.errorMessage = 'Para validar el registro, debes activar la ubicacion del navegador';
      this.openSnackBar(this.errorMessage);
      this.router.navigate(['/Request']);
    }
    else
    {
      if (this.inBogota)
      {
        if (this.requestForm.value.DocNum === null || this.requestForm.value.DocNum === '')
        {
          this.cleanMessage();
          // console.log("Documento vacio");
          this.errorMessage = 'No se puede completar la operación porque faltan campos por ingresar, el número ingresado no es correcto. Para PPT 6 y 8 dígitos y PEP 15 dígitos. Te invitamos a completar la información para poder continuar';
          this.openSnackBar(this.errorMessage);
          this.isRequiredInput = false;

        }
        else
        {
          if (this.requestForm.value.Surname === null || this.requestForm.value.Surname === '')
          {
            this.cleanMessage();
            //console.log("Apellido vacio");
            this.errorMessage = 'No se puede completar la operación porque faltan campos por ingresar, no ingreso primer apellido. Te invitamos a completar la información para poder continuar';
            this.openSnackBar(this.errorMessage);
            this.isRequiredInput = false;
          }
          else
          {
            if(this.requestForm.value.acceptPolicy === false)
            {
              this.cleanMessage();
              //this.errorMessage ="Debe aceptar las politicas de tratamiento territorial ";
              this.openSnackBar(this.errorMessage);
            }

             else
             {

              if (this.requestForm.value.BirthDate === null || this.requestForm.value.BirthDate === '')
              {
                this.cleanMessage();
                this.errorMessage = 'No se puede completar la operación porque faltan datos en el campo por ingresar, la fecha de nacimiento no es correcta DD/MM/AAAA. Te invitamos a completar la información para poder continuar';
                this.openSnackBar(this.errorMessage);
                this.isRequiredInput = false;
              }

              else
              {
                this.cleanMessage();

                this.data= this.datepipe.transform(this.requestForm.value.BirthDate, 'yyyy-MM-dd ')
                this.addRequestForm.docNum = this.requestForm.value.DocNum.toString();
                this.addRequestForm.surname = this.requestForm.value.Surname;
                this.dataaa = this.datepipe.transform(this.requestForm.value.BirthDate, 'yyyy-MM-dd');
                this.addRequestForm.birthDate = this.dataaa;
                this.addRequestForm.acceptPolicy = this.requestForm.value.acceptPolicy;


                this.requestComments.requestPost(this.addRequestForm).subscribe((data) =>
                      {
                          if (data.isRegistered == true )
                          {

                            if (data.migrantsStatementsFile == "")
                            {
                              this.cleanMessage();
                              // console.log("no esta afiliado al sisben", data);
                              this.errorMessage = 'No se encontraron resultados. No se encuentra encuestado al SISBÉN en Bogotá';
                              this.openSnackBar(this.errorMessage);
                              this.cardResponse = false;
                              this.removeRecaptcha();
                            }
                            else
                            {
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
                                  //this.openSeguridad(this.errorMessage);


                                  //1. Armar el GUID con una funcion
                                  //1. obtengo el tamaño del documento
                                  this.docToGuid(this.requestForm.value.DocNum)
                                  .then((guidDOC:string)=>{
                                    this.addProtectData.id_usuario   = guidDOC;
                                    this.addProtectData.nombre       = data.firstName;
                                    this.addProtectData.apellido     = data.surname;
                                    this.addProtectData.fecha        = this.dateDay;

                                    //2. Consultar el servicio GETPolítica con el GUID
                                    this.serviceProtectData.GetSeguridad(guidDOC).subscribe((data)=>
                                    {
                                        if (data.data !== null){
                                            this.router.navigate(['/Registro'], {queryParams:{data:this.MigrantsStatementsFile}});
                                            //2.1 Si responde que ya existe, entonces salta al router.navigate /Registro
                                        }else{
                                          this.openSeguridad(this.errorMessage);
                                          //2.2 Si responde que NO existe, entonces muestra el modal, dialog y poner el texto el botón autorizo y no autorizo
                                        }

                                          //2.2.1 Si autoriza entonces toma el nombre, apellido, la fecha y el guid y ejecutan el servicio POST, Cierra el modal
                                          //addAcreditadomI
                                    });
                                  });
                                  //this.router.navigate(['/Registro', this.MigrantsStatementsFile]);
                                }
                              }).catch(e=>console.log(e));
                            }
                          }

                          else
                          {
                            this.cleanMessage();
                            //console.log("no esta afliado ", data);
                            this.errorMessage = 'No se encontraron registros. No se encuentra afiliado al régimen subsidiado en Bogotá';
                            this.openSnackBar(this.errorMessage);
                            this.removeRecaptcha();
                          }
                });

              }

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


  // openSeguridad(message: string) {
  //   this.snackBar.openFromComponent(AlertPoliticaComponent, {
  //     data: message,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'top',
  //     panelClass: ['mat-toolbar', 'mat-accent']
  //   }).afterDismissed().subscribe(x=>{

  //     console.log(x);

  //   });
  // }

  openSeguridad(message: string) {
    let eventSeguridad =
    this.snackBar.openFromComponent(AlertPoliticaComponent, {
      data: message,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent']
    });
    eventSeguridad.afterDismissed().subscribe(() =>{
      eventSeguridad.instance.emmitsubject.subscribe(validarIngreso =>{
        if(validarIngreso){

          this.serviceProtectData.PostSeguridad(this.addProtectData).subscribe((data)=>
          {
              console.log(this.addProtectData.fecha);
              //1. Armar el GUID con una funcion

          });
          this.router.navigate(['/Registro', this.MigrantsStatementsFile]);
        }else{
          this.router.navigate(['/Request']);
        }
      });
    });
  }

  docToGuid(doc:string){
    return new Promise((resolve, reject) => {
      try {
        let guidDoc = '';
        let docSize = doc.length;
        if(docSize <= 12){
          guidDoc = `00000000-0000-0000-0000-${doc.toString().padStart(12,'0')}`;
        }
        else if(docSize <= 16){
          let lastGuid = doc.substring(3);
          let penGuid = doc.substring(0,3);
          guidDoc = `00000000-0000-0000-${penGuid.toString().padStart(4,'0')}-${lastGuid}`;
        }
        else if(docSize <= 20){
          let lastGuid = `${doc.substring(0,4)}-${doc.substring(4,8)}-${doc.substring(8)}`;
          guidDoc = `00000000-0000-${lastGuid}`;
        }
        resolve(guidDoc);
      } catch (error) {
        reject(doc);
      }
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
