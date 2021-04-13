import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private router: Router, private _logger: LoggerService) { }

  getSessionId() {
    this._logger.logSystem('GET SESSIONID');
    return sessionStorage.getItem('sessionId');
  }
  setSessionId(sessionId: any) {
    this._logger.logSystem('SET SESSIONID => ' + sessionId);

    sessionStorage.setItem('sessionId', sessionId);
  }
  removeSessionId() {
    this._logger.logSystem('DELETE SESSIONID');
    sessionStorage.removeItem('sessionId');
  }
  getUserId() {
    this._logger.logSystem('GET USERID');
    return sessionStorage.getItem('userId');
  }
  setUserId(userid: any) {
    this._logger.logSystem('SET USERID => ' + userid);
    sessionStorage.setItem('userId', userid);
  }
  removeUserId() {
    this._logger.logSystem('DELETE USERID');
    sessionStorage.removeItem('userId');
  }
}
