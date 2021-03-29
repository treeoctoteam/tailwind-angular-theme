import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appRigthClickTrigger]'
})
export class EnRigthClickTriggerDirective implements OnInit {

  @Output() rightClick = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const $rightClickEvent = fromEvent(this.elementRef.nativeElement, 'contextmenu');
    $rightClickEvent.subscribe((event: MouseEvent) => {
      event.preventDefault();
      this.rightClick.emit(event);
      return false;
    });
  }

}
