import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RequestService } from 'src/app/Services/Request/request.service';
import { AlertsComponent } from 'src/app/Templates/alerts/alerts.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  displayedColumns: string[] = ['identificacion', 'Usuario', 'nacimiento', 'parentesco'];
  dataSource: any;
  errorMessage: string = '';
  datafile: string = "";

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
    });
  }
  createPDF() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title> </title>
          <style>
          .divheader{
            margin-top: 2rem;
            margin-bottom: 100px;
            align-items: center;
            justify-content: center;
            align-content: center;
            aling-text: center;
        }        
        .logotipo{
            width: 7rem; 
        }                  
          
          .container {
            margin-left: 10%;
            position: block;
            margin-right: 10%;
          }
          .center-h {
            justify-content: center;
          }
          .center-v {
            align-items: center;
          }         
          
          mat-card-title,
          mat-card-subtitle {
            margin-left: 10%;
            color: black;
          }          
          mat-card-content {
            justify-content: center;
            margin-right: 5%;
          }          
          mat-card-actions {
            margin-left: 40%;
          }
          .text{
            margin-top: 4%;
            text-align: center;
            justify-content: center;
          }
            
        .mat-table {
          overflow: auto;
          max-height: 400px;
        }
        
        table {
          width: 100%;
          border: 1px solid #000;
        }
        th, td {
          width: 30%;
          text-align: center;
          vertical-align: center;
          border: 1px solid #000;
          border-collapse: collapse;
        }               
          </style>
        </head>
        <header class="header center-h center-v">
              <div>
                 <img class="logotipo"  align="left" src="https://colnodo.apc.org/apc-aa-files/fee0af9cae9f167d8bf4f37fd26a12dc/alcaldia.png">         
                 <div class= "divheader">
                 <h3 align="center" >Acreditacion de domicilio para migrantes venezolanos afiliados al regimen subsidiado en BogotaD.C<br><br>
                      <small>Articulo 2.1.5.4.1 del Decreto 780 del 2016, adicionado por el Decreto 616 de 2022</small>
                  </h3>
                 </div>     
                  
              </div> 
        </header>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();

  }

  atras() {
    window.history.back();
  }

  ifExistReCapcha() {
    if (window.localStorage) {
      if (window.localStorage.getItem('_grecaptcha') !== undefined
        && window.localStorage.getItem('_grecaptcha')
      ) {
        console.log("_grecaptcha si existe en localStorage!!");
      } else {
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

