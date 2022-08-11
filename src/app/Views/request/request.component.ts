import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  errorMessage = 'No se puede completar la operacionporque faltan campos por ingresa. Te invitamos a completar la informacíon para poder continuar';
  viewErrorMesagge: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  validate(){
   this.viewErrorMesagge=  true;

  }
}
