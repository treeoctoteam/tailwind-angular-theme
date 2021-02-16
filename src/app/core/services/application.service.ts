import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  config: any;
  configSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private _http: HttpClient) { }




}
