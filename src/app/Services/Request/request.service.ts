import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { locationI } from 'src/app/Models/location.interface';
import { migrantsAcreditadomI } from 'src/app/Models/migrantsAcreditadom.interface';
import { formUpdateI, migrantsStatementsI, ResponseStatamentsI } from 'src/app/Models/migrantsStatements.interface';
import { validationRequestI, ResponseI } from 'src/app/Models/Request.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  requestPost(form: validationRequestI): Observable<ResponseI> {
    let dir = this.url + "MigrantValidationsControllers/Validate";
    return this.http.post<ResponseI>(dir, form);
  }

  getNucleoBySisben(idSisben: string): Observable<migrantsAcreditadomI> {
    let dir = this.url + "MigrantValidationsControllers/Nucleo/" + idSisben;
    return this.http.get<migrantsAcreditadomI>(dir);
  }

  getMigrationStatement(idSisben: string): Observable<ResponseStatamentsI> {
    let dir = this.url + "MigrantsStataments/Statement/" + idSisben;
    return this.http.get<ResponseStatamentsI>(dir);
  }

  getlocation(): Observable<locationI> {
    let dir = this.url + "Location";
    return this.http.get<locationI>(dir);
  }
  
  updateMigrationStatement( form: formUpdateI): Observable<ResponseStatamentsI> {
    let dir = this.url + "MigrantsStataments/UpdateDataStataments/"+ form.dataSISBEN;
    return this.http.put<ResponseStatamentsI>(dir, form);
  }

}
