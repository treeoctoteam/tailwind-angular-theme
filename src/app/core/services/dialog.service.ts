import { Injectable, TemplateRef } from '@angular/core';
import { TODialogOptions } from '@treeocto/ui-kit/dist/types/components/to-dialog/to-dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface Dialog {
  dialogId: string;
  options: Partial<TODialogOptions>;
  opened: boolean;
  customTemplate: TemplateRef<any> | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogList: Dialog[] = [];
  $dialogs = new BehaviorSubject<Dialog[]>([]);
  $triggerOpenDialog = new Subject<Dialog>();
  $triggerCloseDialog = new Subject<string | undefined>();
  $afterClosed = new Subject<unknown>();

  constructor() { }

  open(options: Partial<TODialogOptions>, dialogId: string | undefined = undefined, customTemplate: TemplateRef<any> | undefined = undefined): Observable<any> {
    const newDialog: Dialog = {
      dialogId: dialogId ? dialogId : new Date().getMilliseconds().toString(),
      options,
      customTemplate,
      opened: true
    };
    this.dialogList = [...this.dialogList, newDialog];
    this.$dialogs.next(this.dialogList);
    this.$triggerOpenDialog.next(newDialog);
    return this.$afterClosed.asObservable();
  }

  close(dialogId: string) {
    this.$triggerCloseDialog.next(dialogId);
  }

  closeAll() {
    this.$triggerCloseDialog.next();
  }
}
