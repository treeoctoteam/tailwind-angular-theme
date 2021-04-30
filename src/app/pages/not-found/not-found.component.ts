import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'octo-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotfoundComponent {

  constructor(private location:Location) {

    setTimeout(() => {
      this.location.back();
    }, 5000);
   }

}
