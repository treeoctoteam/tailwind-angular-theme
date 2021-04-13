import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() { }

  public logToDo(message: any, title?: string) {
    const backgroundColor = '##D1CB75';
    if (title) {
      console.debug('%c%s', 'background-color: ' + backgroundColor + '; color: #ffffff; padding: 10px 10px', message);
    }
    console.debug('%c%s', 'background-color: ' + backgroundColor + '; color: #ffffff; padding: 3px 3px', message);
  }
  public logDebug(message: any, backgroundColor: string, title?: string) {
    if (title) {
      console.debug('%c%s', 'background-color: ' + backgroundColor + '; color: #ffffff; padding: 10px 10px', message);
    }
    console.debug('%c%s', 'background-color: ' + backgroundColor + '; color: #ffffff; padding: 15px 15px', message);
  }
  public logError(message: any, title?: string) {
    const backgroundColor = '#C14452';
    if (title) {
      console.debug('%c%s', 'background-color: ' + backgroundColor + '; color: #ffffff; padding: 10px 10px', message);
    }
    console.debug(
      '%c%s',
      'background-color: ' + backgroundColor + '; color: #ffffff; padding: 5px 5px; font-weight: bold;',
      message
    );
  }
  public logInfo(message: any, object?: any, title?: string) {
    const backgroundColor = '#5780C7';
    if (title) {
      console.debug('%c%s', 'background-color: ' + backgroundColor + '; color: #ffffff; padding: 10px 10px', message, object);
    }
    console.debug('%c%s', 'background-color: ' + backgroundColor + '; color: #ffffff; padding: 10px 10px', message, );
  }
  public logSystem(message: any, title?: string) {
    const backgroundColor = '#6f42c1';
    if (title) {
      console.debug('%c%s', 'background-color: ' + backgroundColor + '; color: #ffffff; padding: 10px 10px', message);
    }
    console.debug('%c%s', 'background-color: ' + backgroundColor + '; color: #ffffff; padding: 10px 10px', message);
  }
}
