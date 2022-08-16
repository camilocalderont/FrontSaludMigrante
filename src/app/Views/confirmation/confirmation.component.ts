import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RequestService } from 'src/app/Services/Request/request.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  displayedColumns: string[] = ['identificacion', 'Usuario', 'nacimiento', 'parentesco'];
  dataSource: any;
  datafile: string = "";

  constructor(    
    private requestComments: RequestService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.datafile = this.activeRoute.snapshot.paramMap.get('data') || '';
    this.requestComments.getNucleoBySisben(this.datafile).subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }
  createPDF() {
    // const pdfDefinition: any = {
    //   content: [
    //     {
    //       text: 'Reporte de migrantes',
    //       table: {
    //         widths: [ '*', 200, 'auto', 'auto' ],
    //         body: [
    //           [
    //             'Identificacion',
    //             'Usuario',
    //             'Nacimiento',
    //             'Parentesco'
    //           ],
    //           [
    //             '123456789',
    //             'Juan',
    //             '12/12/12',
    //             'Padre'
    //           ],
    //           [
    //             '123456789',
    //             'Juan',
    //             '12/12/12',
    //             'Padre'
    //           ],
    //         ]
    //       }
    //     }
    //   ]
    // };
    // const pdf = pdfMake.createPdf(pdfDefinition);
    // pdf.open();
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
              

  }
  

}
