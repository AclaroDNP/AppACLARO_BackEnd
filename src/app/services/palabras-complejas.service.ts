import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class PalabrasComplejasService {

  baseurl = "http://127.0.0.1:8000/palabrasComplejas/"
  
  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getText(textoC: any): Observable<any> {
    return this.http.post(
      this.baseurl, 
    JSON.stringify(textoC), 
      this.httpOptions);
  }

}
