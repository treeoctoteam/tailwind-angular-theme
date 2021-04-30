import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { PublicConfig } from '../../models/modules.model';
const CONFIG_PATH = 'assets/config/public-config.json';

@Injectable({
  providedIn: 'root'
})
export class PublicConfigService {
  config: PublicConfig;
  public $config = new BehaviorSubject<PublicConfig>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.$config.subscribe(res => {
      if (res) {
        console.log("CHANGE PUBlIC CONFIG", res)
        this.config = res;
      }
    })
  }

  initConfig(): Observable<PublicConfig> {
    const $req = this.http.get<PublicConfig>(CONFIG_PATH).pipe(share());
    $req.subscribe((response: PublicConfig) => {
      if (response) {
        this.$config.next(response);
      } else {
        console.log("PUBLIC CONFIG NOT FOUND!!")
      }
    });
    return $req;
  }
}
