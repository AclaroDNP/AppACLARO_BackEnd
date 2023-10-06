import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class MT5Service {

  baseurl = "http://127.0.0.1:8000/predict-mT5/"
  
  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getTexto(textoC: any): Observable<any> {
    return this.http.post(
      this.baseurl, 
    JSON.stringify(textoC), 
      this.httpOptions);
  }
  
}
