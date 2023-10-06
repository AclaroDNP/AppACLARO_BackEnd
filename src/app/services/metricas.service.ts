import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MetricasService {

  baseurl = "http://127.0.0.1:8000/metricas/"
  
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
