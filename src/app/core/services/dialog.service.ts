import { Injectable, TemplateRef } from '@angular/core';
import { TODialogOptions } from '@treeocto/ui-kit/dist/types/components/to-dialog/to-dialog';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  $triggerDialog = new Subject<{options: Partial<TODialogOptions>, customTemplate: TemplateRef<any> | undefined}>();
  $afterClosed = new Subject<unknown>();

  constructor() { }

  open(options: Partial<TODialogOptions>, customTemplate: TemplateRef<any> | undefined = undefined): Observable<any> {
    this.$triggerDialog.next({options, customTemplate});
    return this.$afterClosed.asObservable();
  }
}
