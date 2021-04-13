import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

@Injectable()
export class OverlayMenuService {

  private $unsubcribeAll: Subject<void> = new Subject<void>();
  private overlayRef: OverlayRef | null;

  constructor(private overlay: Overlay,
    private viewContainerRef: ViewContainerRef) { }

  open({ x, y }: MouseEvent, data: any, templateRef: TemplateRef<any>) {
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top'
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(templateRef, this.viewContainerRef, {
      $implicit: data
    }));

    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        takeUntil(this.$unsubcribeAll),
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe();
  }

  close() {
    this.$unsubcribeAll.next();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
