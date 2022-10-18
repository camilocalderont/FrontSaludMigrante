import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProtectRequestDate, ResponseMessage } from 'src/app/Models/ProtectDate';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ProteccionDatosService {
  url: string = environment.baseUrlSeguridad;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL3NhbHVkY2FwaXRhbGIyYy5iMmNsb2dpbi5jb20vOGM2MTFhMGQtY2RlZS00YWI4LThjMTMtOTlhMjIzZmM0ZjM1L3YyLjAvIiwiZXhwIjoxNjY2MTE5OTU1LCJuYmYiOjE2NjYxMTYzNTUsImF1ZCI6ImYzZTU4ZDY0LWExMmEtNGRiMC1iOTgyLWI4MzdmNGM4MzI1ZCIsImlkcCI6ImxpdmUuY29tIiwibmFtZSI6IkFuZHJlcyBWZWxleiIsIm9pZCI6ImM2MzNmZmUwLTczN2ItNDViYy1hNDZiLWMxNTcyYWU5MjExMCIsInN1YiI6ImM2MzNmZmUwLTczN2ItNDViYy1hNDZiLWMxNTcyYWU5MjExMCIsImdpdmVuX25hbWUiOiJBbmRyZXMgRmVsaXBlIiwiZmFtaWx5X25hbWUiOiJWZWxleiBSdWl6IiwiZW1haWxzIjpbImFuZHIzczI2MDhAaG90bWFpbC5lcyJdLCJ0ZnAiOiJCMkNfMV9JbmljaW9TZXNpb25Db25SZWdpc3RybyIsIm5vbmNlIjoiYWI4MzYyZDYtMzdkYi00NzgwLWIwMTUtZDI2MzljZWM4ZDkzIiwic2NwIjoiQ2l1ZGFkYW5vLlJlYWQiLCJhenAiOiJmM2U1OGQ2NC1hMTJhLTRkYjAtYjk4Mi1iODM3ZjRjODMyNWQiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2NjYxMTYzNTV9.dMzSSeOcU1GdWrQnC7a6WmVYUOjUCBanYwmAo-IRt4dreuV0VYJBuFgvZaC9ou1VNc7Gi4BQWtcqaqgX6LZ1aim5AX35cKWNrvrN82c7o6qnjAhDFl3rMeIYfEq3AYUbVuSDh9ULf4EwaW_Dguly15P-qBWj0v7bcg6FT2VjqZ9Zf5e0xBBFo25hWV4LjwMpQc22JNlz5VwJPbPVw2-b55OPkK1_mYg38B7efCJLXKSUky2FLFDwZMrYHP-tMF9jWyUT8RqBprpJpt3A5cPdgCxkZMtjeJNsadW6jOFLWHUoa6OBvq4op0rm8GuMlH0OY_gHp3K9YdO4By_47Y0x7g',
      /*'Access-Control-Allow-Origin':'*',
      'Connection': 'keep-alive',
      'Host': 'apm-aeu-sds-dev-shared.azure-api.net',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
      'Origin': 'https://calm-sea-0f6c3a00f.1.azurestaticapps.net',
      'Referer': 'https://calm-sea-0f6c3a00f.1.azurestaticapps.net/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',*/

    })
  };
  constructor(private http: HttpClient) {}


  PostSeguridad(postdata: ProtectRequestDate): Observable<ResponseMessage>{
    let dir = this.url + "PoliticaSeguridad/AddPoliticaSeguridad";
    //this.http.post<ResponseMessage>(
    return this.http.post<ResponseMessage>(dir,postdata,this.httpOptions);
  }


  GetSeguridad(idUsuario: string): Observable<ResponseMessage>{
    let dir = this.url + "PoliticaSeguridad/GetPoliticaSeguridad/" + idUsuario;
    return this.http.get<ResponseMessage>(dir,this.httpOptions);
  }

}
