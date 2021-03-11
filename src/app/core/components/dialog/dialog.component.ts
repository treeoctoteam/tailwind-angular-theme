import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { TODialogOptions } from '@treeocto/ui-kit/dist/types/components/to-dialog/to-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogService } from '../../services/dialog.service';

const initDialogOptions = (): TODialogOptions => {
  return {
    hasBackdrop: true,
    hasCustomTemplate: true,
    showDismissButton: false,
    showCancelButton: true,
    showConfirmlButton: true,
    dialogType: 'info',
    dialogTitle: '',
    dialogContentMessage: ''
  };
}

@Component({
  selector: 'octo-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit, OnDestroy {

  $unsubscribe = new Subject<void>();
  opened = false;
  customTemplate: TemplateRef<any> | undefined;
  options: Partial<TODialogOptions> = initDialogOptions();

  constructor(private dialogService: DialogService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dialogService.$triggerDialog.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe(({options, customTemplate}) => {
      this.options = {...this.options, ...options};
      this.customTemplate = customTemplate;
      this.opened = true;
      this.changeDetector.markForCheck();
    })
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
  }

  dialogConfirm(value: any): void {
    this.dialogService.$afterClosed.next(value);
    this.opened = false;
  }

  dialogCancel(value: any): void {
    this.dialogService.$afterClosed.next(value);
    this.opened = false;
  }
}

@Component({
  selector: 'octo-custom-dialog-template',
  template: `<ng-container *ngIf="templateRef" [ngTemplateOutlet]="templateRef"></ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDialogTemplateComponent {

  templateRef: TemplateRef<any> | undefined = undefined;
  @Input()
  set customTemplate(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.templateRef = templateRef;
    }
  }
}
