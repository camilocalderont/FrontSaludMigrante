import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProtectRequestDate, ResponseMessage } from 'src/app/Models/ProtectDate';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ProteccionDatosService {
  url: string = environment.baseUrlSeguridad;
  constructor(private http: HttpClient) {}


  PostSeguridad(postdata: ProtectRequestDate): Observable<ResponseMessage>{
    let dir = this.url + "PoliticaSeguridad/AddPoliticaSeguridad";
    return this.http.post<ResponseMessage>(dir,postdata);
  }


  GetSeguridad(idUsuario: string): Observable<ResponseMessage>{
    let dir = this.url + "PoliticaSeguridad/GetPoliticaSeguridad/" + idUsuario;
    return this.http.get<ResponseMessage>(dir);
  }

}
