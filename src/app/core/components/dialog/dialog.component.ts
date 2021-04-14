import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Dialog, DialogService } from '../../services/dialog.service';

@Component({
  selector: 'octo-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit, OnDestroy {

  $unsubscribe = new Subject<void>();
  dialogs: Dialog[] = [];

  constructor(private dialogService: DialogService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dialogService.$triggerOpenDialog.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe((dialog: Dialog) => {
      this.dialogs = [...this.dialogs, dialog];
      this.changeDetector.markForCheck();
    });

    this.dialogService.$triggerCloseDialog.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe((dialogId: string | undefined) => {
      if (dialogId !== undefined) {
        this.dialogs = this.dialogs.filter(d => d.dialogId !== dialogId);
      } else {
        this.dialogs = [];
      }
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
  }

  dialogConfirm(dialog: Dialog): void {
    const result: {dialogId: string; success: boolean; value: any } = {
      dialogId: dialog.dialogId,
      success: true,
      value: 'Dialog Confirmed'
    };
    this.dialogs = this.dialogs.filter(d => d !== dialog);
    this.dialogService.$afterClosed.next(result);
  }

  dialogCancel(dialog: Dialog): void {
    const result: {dialogId: string; success: boolean; value: any} = {
      dialogId: dialog.dialogId,
      success: false,
      value: 'Dialog Closed'
    };
    this.dialogs = this.dialogs.filter(d => d !== dialog);
    this.dialogService.$afterClosed.next(result);
  }
}

@Component({
  selector: 'octo-custom-dialog-template',
  template: `<ng-container *ngIf="templateRef" [ngTemplateOutlet]="templateRef"></ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDialogTemplateComponent {

  templateRef: TemplateRef<any> | undefined;
  @Input()
  set customTemplate(templateRef: TemplateRef<any> | undefined) {
    if (templateRef) {
      this.templateRef = templateRef;
    }
  }
}
