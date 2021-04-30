import { PublicConfig } from './../../../models/modules.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicConfigService } from 'src/app/modules/public/services/public.service';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';

@Component({
  selector: 'octo-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent {

  constructor(private router: Router, public publicConfigService: PublicConfigService, private app: ApplicationConfigService) {
    this.publicConfigService.$config.subscribe(
      (res: any) => {
        if (res) {
          this.router.navigateByUrl(res.defaultRoute);
        }
      }
    );
  }
}
