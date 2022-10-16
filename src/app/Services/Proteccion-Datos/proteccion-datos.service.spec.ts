import { TestBed } from '@angular/core/testing';

import { ProteccionDatosService } from '../Proteccion-Datos/proteccion-datos.service';

describe('ProteccionDatosService', () => {
  let service: ProteccionDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProteccionDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
