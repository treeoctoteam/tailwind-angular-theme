import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  INITIALIZE(config: any) {
    console.log(config);
  }

}
