import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { share } from 'rxjs/operators';
import { SessionService } from "./session.service";
import { RouteParam } from "../../models/route-param.model";
import { ApplicationConfigService } from "src/app/core/services/application-config.service";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private http: HttpClient, private conf: ApplicationConfigService, private session: SessionService) { }

  getSteps(payload: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow`,
      payload
    ).pipe(share());
  }

  moveToStep(id: string) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow/move?id=${id}`
    );
  }

  nextStep(params: RouteParam[]) {
    if (!params) {
      return this.http.get(
        `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow/next`
      );
    } else {
      return this.http.get(
        `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow/next?${params[0].key
        }=${params[0].value}`
      );
    }
  }

  validateStep(hashemail: string, token: string, certficiateRequestId?: any): any {
    if (!certficiateRequestId && hashemail && token) {
      return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/user/${hashemail}/${token}`);
    }
    if (certficiateRequestId && hashemail && token) {
      return this.http.get(
        `${this.conf.appConfig.network.hostApiV3}/api/user/${hashemail}/${token}/${certficiateRequestId}`
      );
    }
    if (!certficiateRequestId && !hashemail && token) {
      return this.http.get(
        `${this.conf.appConfig.network.hostApiV3}/api/agent/${token}`
      );
    }
  }

}
