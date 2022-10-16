import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPoliticaComponent } from './alert-politica.component';

describe('AlertPoliticaComponent', () => {
  let component: AlertPoliticaComponent;
  let fixture: ComponentFixture<AlertPoliticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertPoliticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertPoliticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
