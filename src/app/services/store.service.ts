import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public testService :Subject<string>;

  constructor() { 
    this.testService = new Subject<string>();
  }

  getServiceName():Observable<string>{
   return this.testService.asObservable();

  }
  postServiceName(serveName):void{
    
    this.testService.next(serveName);
  }

}
