import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { migrantsAcreditadomI } from 'src/app/Models/migrantsAcreditadom.interface';
import { validationRequestI, ResponseI } from 'src/app/Models/Request.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  requestPost(form: validationRequestI): Observable<ResponseI> {
    let dir = this.url + "Validate";
    return this.http.post<ResponseI>(dir, form);
  }

  getNucleoBySisben(idSisben: string): Observable<migrantsAcreditadomI> {
    let dir = this.url + "Nucleo/" + idSisben;
    return this.http.get<migrantsAcreditadomI>(dir);
  }
}
