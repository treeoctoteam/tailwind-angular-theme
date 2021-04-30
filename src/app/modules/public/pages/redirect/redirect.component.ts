import { takeUntil } from 'rxjs/operators';
import { PublicConfig } from './../../../models/modules.model';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PublicConfigService } from 'src/app/modules/public/services/public.service';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'octo-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnDestroy{
  private $unsubscribe = new Subject();
  constructor(private router: Router, public publicConfigService: PublicConfigService, private app: ApplicationConfigService) {
    this.publicConfigService.$config.pipe(takeUntil(this.$unsubscribe)).subscribe(
      (res: PublicConfig) => {
        if (res) {
          this.router.navigateByUrl(res.defaultRoute);
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
