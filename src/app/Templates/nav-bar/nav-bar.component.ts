import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
value = 'primary';
  constructor() { }

  ngOnInit(): void {
  }

  test(a: any) {
    console.log(a.index)
  }
  subjects = [
    { name: 'wow', index: '<app-initiation></app-initiation>' },
    { name: 'wow1' },
    { name: 'wow2' },
    { name: 'wow3' },
  ]
}
