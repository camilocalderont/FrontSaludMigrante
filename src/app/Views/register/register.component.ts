import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  identificacion: string;
  Usuario: string;
  nacimiento: string;
  declaracion: string;
  Vigencia: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {identificacion:'sdf', Usuario: 'Hydrogen', nacimiento: '1.0079', declaracion: 'H',Vigencia:'H'},
];

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  displayedColumns: string[] = ['identificacion', 'Usuario', 'nacimiento', 'declaracion', 'Vigencia'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
