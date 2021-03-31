import { Injectable } from '@angular/core';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subject } from 'rxjs';
import { CanvasActions, ElementDimension, ENDocumentField } from '../models/canvas-drawer.model';
import { getElementDimensions } from '../utils/common-functions';

const enum ElementStatus {
  off = 0,
  resize = 1,
  move = 2
}

@Injectable()
export class CanvasDrawerService {

  layers: HTMLDivElement[] = [];
  pageElement: HTMLElement;
  activeElement: HTMLElement;
  defaultDimension = { width: 250, height: 150 };
  enableHandTool = true;
  elementStatus: ElementStatus = ElementStatus.off;
  private $unsubscribe = new Subject<void>();
  $imageData = new Subject<string>();
  $elementClickEvent = new Subject<HTMLElement>();
  $elementRightClickEvent = new Subject<HTMLElement>();
  $handleActionButtons = new Subject<{ disableEditField?: boolean; disableField?: boolean }>();
  $updateFieldPosition = new Subject<{fieldName: string; dimensions: ElementDimension}>();
  $addDocumentField = new Subject<Partial<ENDocumentField>>();

  constructor() {
    window.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).parentElement.className === "active-sign-field") {
        return;
      } else {
        const disableEditField = true;
        this.$handleActionButtons.next({disableEditField});
        this.removeElementClass(this.activeElement);
      }
    });
  }

  createCanvasWrapper() {
    const parentContainer = document.getElementById('mainContainer');
    parentContainer.style.overflow = 'hidden';
    const viewer = (document.getElementById('viewer') as HTMLDivElement);
    const canvasContainer = document.createElement('div') as HTMLDivElement;
    const canvas = document.createElement('canvas') as HTMLCanvasElement;

    canvasContainer.id = 'canvasDrawContainer';
    canvasContainer.style.position = 'relative';
    canvasContainer.style.top = (viewer.parentElement.scrollTop * -1) + 'px';
    canvasContainer.style.height = viewer.clientHeight + 'px';
    canvasContainer.style.width = '100%';
    canvasContainer.style.display = 'flex';
    canvasContainer.style.overflow = 'hidden';
    canvasContainer.style.justifyContent = 'center';
    canvasContainer.style.zIndex = '10';

    canvas.style.position = 'absolute';
    canvas.width = this.pageElement.clientWidth;
    canvas.height = this.pageElement.clientHeight;
    canvas.style.paddingRight = '16px';
    canvas.style.cursor = "crosshair";
    canvas.style.top = this.pageElement.offsetTop + 'px';
    canvasContainer.appendChild(canvas);
    parentContainer.appendChild(canvasContainer);
    this.drawingField(canvas);
  }

  drawInputElement(documentField: Partial<ENDocumentField>, isDefault: boolean): void {
    this.removeExistingElement(documentField.fieldName);
    let resizeElement: HTMLElement;
    let inputElement: HTMLElement;
    let containerElement = this.createInputContainer(documentField, isDefault);
    if (documentField?.backgroundImage) {
      this.setBackgroundImage(containerElement, documentField.backgroundImage);
    }
    resizeElement = this.createResizeButton(containerElement);
    inputElement = this.createInputElement();
    containerElement.setAttribute("page-number", documentField.pageNumber.toString())
    containerElement.appendChild(inputElement);
    const pageElement = this.getPdfPageElement(documentField.pageNumber);
    pageElement.appendChild(containerElement);
    if (this.activeElement?.id === containerElement?.id) {
      this.setActiveElementClass(containerElement);
    }
    this.triggerElementRightClick(containerElement);
    this.triggerElementClick(containerElement);
    this.onSignatureFieldSelected(containerElement, resizeElement);
  }

  removeExistingElement(fieldName: string): void {
    const input = document.getElementById(fieldName);
    if (input) {
      input.remove();
    }
  }

  scrollToElement(id: string, i = 0): void {
    setTimeout(() => {
      const element = document.getElementById(id) as HTMLInputElement;
      if (element) {
        element.scrollIntoView({ block: 'center' });
      } else {
        i++;
        if (i < 100) {
          this.scrollToElement(id, i);
        }
      }
    }, 100);
  }

  captureEvents(canvas: HTMLCanvasElement, actionType: CanvasActions): Observable<any> {
    const startEvent = this.setStartEvent(canvas);
    const moveEvent = this.setMoveEvent(canvas);
    const endEvent = this.setEndEvent(canvas);

    if (actionType === 'freeHand') {
      return startEvent.pipe(
        switchMap(() => moveEvent.pipe(
          takeUntil(endEvent),
          pairwise()
        ))
      );
    } else if (actionType === 'Field') {
      return merge(
        startEvent,
        moveEvent,
        endEvent
      ).pipe(takeUntil(this.$unsubscribe));
    } else if (actionType === 'Image') {
      return of(null);
    }
  }

  drawingFreeHand(canvas: HTMLCanvasElement, $unsubscribe: Subject<void>) {
    let x1, y1, x2, y2 = 0;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    console.log(rect)

    this.captureEvents(canvas, 'freeHand')
      .pipe(takeUntil($unsubscribe))
      .subscribe((res: [MouseEvent | TouchEvent, MouseEvent | TouchEvent]) => {

        x1 = this.getClientXY(res[0]).clientX;
        y1 = this.getClientXY(res[0]).clientY;
        x2 = this.getClientXY(res[1]).clientX;
        y2 = this.getClientXY(res[1]).clientY;

        console.log(x1, y1);
        // previous and current position with the offset
        let prevPos = {
          x: x1 - rect.left,
          y: y1 - rect.top
        };

        const currentPos = {
          x: x2 - rect.left,
          y: y2 - rect.top
        };

        // start our drawing path
        ctx.beginPath();
        // we're drawing lines so we need a previous position
        if (prevPos) {
          // sets the start point
          ctx.moveTo(prevPos.x, prevPos.y); // from
          // draws a line from the start pos until the current position
          ctx.lineTo(currentPos.x, currentPos.y);
          // strokes the current path with the styles we set earlier
          ctx.stroke();
        }
        this.$imageData.next(canvas.toDataURL());
    });
  }

  drawingField(canvas: HTMLCanvasElement) {
		let drag = false;
		const rect = {
			startX: 0,
			startY: 0,
			w: 0,
			h: 0
    };
    let documentField: Partial<ENDocumentField> = {
      dimensions: {
        x: rect.startX,
        y: rect.startY,
        w: rect.w,
        h: rect.h
      },
      fieldName: new Date().getTime().toString(),
      pageNumber: this.pageNumber
    }

    this.captureEvents(canvas, 'Field').subscribe((res: MouseEvent | TouchEvent) => {
      const ctx = canvas.getContext('2d');
      const draw = () => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#99042f";
        ctx.rect(rect.startX, rect.startY, rect.w, rect.h);
        ctx.stroke();
      }

      const clearCanvasRect = (): void => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      if (res instanceof MouseEvent) {
        if (res.type === 'mousedown') {
          rect.startX = res.offsetX;
          rect.startY = res.offsetY;
          drag = true;
        }

        if (res.type === 'mousemove') {
          if (drag) {
            rect.w = res.offsetX - rect.startX;
            rect.h = res.offsetY - rect.startY;
            clearCanvasRect();
            draw();
          }
        }

        if (res.type === 'mouseup' || res.type === 'mouseleave') {
          drag = false;
          const signFieldDimension: any = {
            x: rect.startX,
            y: rect.startY,
            w: rect.w,
            h: rect.h
          };
          documentField.dimensions = signFieldDimension;
          clearCanvasRect();
          this.removeExistingElement('canvasDrawContainer');
          this.drawInputElement(documentField, false);
          this.$addDocumentField.next(documentField);
          const disableField = false;
          const disableEditField = true;
          this.$handleActionButtons.next({ disableField, disableEditField});
          this.$unsubscribe.next();
        }
      }
    });
  }

  createFieldMobile(documentField: Partial<ENDocumentField>) {
    documentField.pageNumber = this.pageNumber;
    this.drawInputElement(documentField, true);
    this.$addDocumentField.next(documentField);
  }

  private createInputContainer({ fieldName, dimensions }: Partial<ENDocumentField>, isDefault: boolean): HTMLDivElement {
    const inputContainer = document.createElement('div');
    inputContainer.id = fieldName;
    inputContainer.setAttribute("type","signatureField");
    inputContainer.style.position = 'absolute';
    inputContainer.style.height = isDefault ? `${this.defaultDimension.height}px` : `${dimensions.h}px`;
    inputContainer.style.width = isDefault ? `${this.defaultDimension.width}px` : `${dimensions.w}px`;
    inputContainer.style.left = isDefault ? '100px' : dimensions.x + 'px';
    inputContainer.style.top = isDefault ? '100px' : dimensions.y + 'px';
    inputContainer.style.border = '2px solid #99042f';
    inputContainer.style.backgroundColor = 'transparent';
    inputContainer.style.zIndex = '100';
    return inputContainer;
  }

  private setBackgroundImage(input: HTMLElement, url: string): void {
    input.style.backgroundImage = `url(${url})`;
    input.style.backgroundSize = 'contain';
    input.style.backgroundRepeat = 'no-repeat';
  }

  private createResizeButton(parentElement: HTMLDivElement): HTMLButtonElement {
    const resizeBtn = document.createElement('button');
    resizeBtn.id = parentElement.id;
    resizeBtn.style.position = "absolute";
    resizeBtn.style.cursor = "nwse-resize"
    resizeBtn.style.left = "100%";
    resizeBtn.style.top = "100%";
    resizeBtn.style.transform = "translate3d(-50%,-50%,0) rotateZ(45deg)";
    resizeBtn.style.borderStyle = "solid";
		resizeBtn.style.borderWidth = "12px";
    resizeBtn.style.borderColor = "transparent transparent transparent #99042f";
    resizeBtn.style.backgroundColor = "transparent"
    resizeBtn.style.outline = "none"
    resizeBtn.style.zIndex = '40';
    parentElement.appendChild(resizeBtn);
    return resizeBtn;
  }

  private createInputElement(): HTMLElement {
    const input = document.createElement('input') as HTMLInputElement;
    input.style.width = "100%";
    input.style.height = "100%";
    input.style.backgroundColor = "transparent";
    input.style.cursor = "move"
    input.style.border = 'none';
    input.autocomplete = "no";
    return input;
  }

  get pageNumber(): number {
    const pageNumber = this.pageElement.getAttribute('data-page-number');
    return +pageNumber;
  }

  private getPdfPageElement(id: number): HTMLElement {
    const pageElement = document.getElementsByClassName('page')[id - 1] as HTMLElement;
    return pageElement;
  }

  private setStartEvent(element: any): Observable<any> {
    return merge(
      fromEvent(element, 'mousedown'),
      fromEvent(element, 'touchstart')
    )
  }

  private setMoveEvent(element: HTMLElement | Document | Window): Observable<any> {
    return merge(
      fromEvent(element, 'mousemove'),
      fromEvent(element, 'touchmove')
    )
  }

  private setEndEvent(element: HTMLElement | Document | Window): Observable<any> {
    return merge(
      fromEvent(element, 'mouseup'),
      fromEvent(element, 'touchend')
    )
  }

  private onSignatureFieldSelected(element: HTMLElement, resizeElement: HTMLElement): void {
    this.setStartEvent(element).subscribe((event) => {
      this.setStatus(event.target, ElementStatus.move);
    });
    this.setEndEvent(element).subscribe((event) => {
      this.setStatus(event.target, ElementStatus.off);
    });
    if (resizeElement) {
      this.setStartEvent(resizeElement).subscribe((event) => {
        event.stopPropagation();
        this.setStatus(resizeElement, ElementStatus.resize);
      });
    }
  }

  private setStatus(element: HTMLElement, status: number) {
    if (status === ElementStatus.resize) {
      this.enableHandTool = false;
      this.resizeElement(element.parentElement)
    } else if (status === ElementStatus.move) {
      this.enableHandTool = false;
      this.moveElement(element.parentElement);
    } else {
      this.enableHandTool = true;
    }
    this.elementStatus = status;
  }

  private moveElement(element: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const dragMouseDown = (e) => {
      e = e || window.event;
      // e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = this.getClientXY(e).clientX;
      pos4 = this.getClientXY(e).clientY;

      this.setEndEvent(document).pipe(
        takeUntil(this.$unsubscribe)
      ).subscribe(closeDragElement);

      this.setMoveEvent(document).pipe(
        takeUntil(this.$unsubscribe)
      ).subscribe(elementDrag);
    }

    const elementDrag = (e) => {
      e = e || window.event;
      // e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - this.getClientXY(e).clientX;
      pos2 = pos4 - this.getClientXY(e).clientY;
      pos3 =  this.getClientXY(e).clientX;
      pos4 =  this.getClientXY(e).clientY;
      // set the element's new position:

      parseInt(element.style.top) < 0 ? element.style.top = 0 + "px" : element.style.top = +(element.offsetTop - pos2) + "px";
      parseInt(element.style.left) < 0 ? element.style.left = 0 + "px" : element.style.left = +(element.offsetLeft - pos1) + "px";
      if (parseInt(element.style.left) + element.clientWidth > element.parentElement.clientWidth) {
        element.style.left = (element.parentElement.clientWidth - element.clientWidth) + "px"
      }
      if (parseInt(element.style.top) + element.clientHeight > element.parentElement.clientHeight) {
        element.style.top = (element.parentElement.clientHeight - element.clientHeight) - 1 + "px"
      }
      this.$updateFieldPosition.next({fieldName: element.id, dimensions: getElementDimensions(element)});
    }


    const closeDragElement = () => {
      // stop moving when mouse button is released:
      document.onmousedown = null;
      document.ontouchstart = null;
      this.$unsubscribe.next();
    }
    document.onmousedown = dragMouseDown;
    document.ontouchstart = dragMouseDown;
  }

  private resizeElement(element: HTMLElement) {
    const resize = (e) => {
      e.preventDefault();
      const offsetLeft = element.offsetLeft + this.pageElement.getBoundingClientRect().left;
      const offsetTop = element.offsetTop + this.pageElement.getBoundingClientRect().top;
      element.style.width = this.getClientXY(e).clientX - offsetLeft + "px";
      element.style.height = this.getClientXY(e).clientY - offsetTop + "px";
      const parentElement = document.getElementById(element.id).parentElement;

      if(element.clientWidth < 30) {
        element.style.width = '30px'
      }
      if (parseInt(element.style.height) < 30) {
        element.style.height = '30px'
      }
      if (parseInt(element.style.left) + parseInt(element.style.width) > parseInt(parentElement.style.width)) {
        element.style.width = parseInt(parentElement.style.width) - element.offsetLeft + 'px';
      }
      if (parseInt(element.style.top) + parseInt(element.style.height) > parseInt(parentElement.style.height)) {
        element.style.height = parseInt(parentElement.style.height) - element.offsetTop + 'px';
      }

      this.$updateFieldPosition.next({fieldName: element.id, dimensions: getElementDimensions(element)});
    }

    const stopResizeElement = () => {
      this.$unsubscribe.next();
    }

    this.setEndEvent(window).pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe(stopResizeElement);

    this.setMoveEvent(window).pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe(resize);
  }

  private getClientXY(event: MouseEvent | TouchEvent): { clientX: number, clientY: number } {
    if (event instanceof MouseEvent) {
      return {
        clientX: event.clientX,
        clientY: event.clientY,
      }
    } else {
      return {
        clientX: event.targetTouches[0].clientX,
        clientY:  event.targetTouches[0].clientY
      }
    }
  }

  private triggerElementRightClick(element: HTMLElement) {
    if (element) {
      const $rightClickEvent = fromEvent(element, 'contextmenu');
      $rightClickEvent.subscribe((event: MouseEvent) => {
        event.preventDefault();
        this.handleElementCLick(element);
        this.$elementRightClickEvent.next(element);
        return false;
      });
    }
  }

  private triggerElementClick(element: HTMLElement) {
    if (element) {
      const $elementClickEvent = this.setStartEvent(element);
      $elementClickEvent.subscribe((event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        // left mouse click
        if ( ((event instanceof MouseEvent) && event.buttons === 1) || (event instanceof TouchEvent)) {
          this.handleElementCLick(element);
          this.$elementClickEvent.next(element);
          return false;
        }
      });
    }
  }

  private handleElementCLick(element: HTMLElement) {
    if (this.activeElement?.id !== element.id) {
      this.removeElementClass(this.activeElement);
    }
    this.activeElement = element;
    setTimeout(() => {
      this.setActiveElementClass(element);
    });
  }


  private setActiveElementClass(element: HTMLElement) {
    if (element) {
      element.className = 'active-sign-field';
    }
  }

  private removeElementClass(element: HTMLElement) {
    if (element) {
      element.classList.remove('active-sign-field');
      this.activeElement = null;
    }
  }
}


