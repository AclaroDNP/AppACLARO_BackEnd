import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SaveTextService {

  private textSource = new BehaviorSubject<string>("");
  currentMessage = this.textSource.asObservable();
  
  constructor() {
   }

  changeText(message: string){
    this.textSource.next(message)
  }
}
