import { NgModule } from '@angular/core';
import { ENActionsButtonsComponent } from './components/actions-buttons/actions-buttons.component';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SignatureDialogComponent } from './components/signature-dialog/signature-dialog.component';
import { CommonModule } from '@angular/common';
import { OverlayMenuService } from './services/overlay-menu.service';
import { FieldProprietiesMenuComponent } from './components/field-proprieties-menu/field-proprieties-menu.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material/input';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfManagerComponent } from './containers/pdf-manager/pdf-manager.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ENCanvasDrawerService } from '../../projects/canvas-drawer/src/lib/en-canvas-drawer.service';
import { ENImageCropperModule } from '@euronovate-theme/components/image-cropper/en-image-cropper.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ENActionsButtonsComponent,
    SignatureDialogComponent,
    FieldProprietiesMenuComponent,
    PdfViewerComponent,
    PdfManagerComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DragDropModule,
    OverlayModule,
    MatInputModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    ENImageCropperModule
  ],
  exports: [
    PdfManagerComponent
  ],
  providers : [
    ENCanvasDrawerService,
    OverlayMenuService
  ]
})
export class ENPdfManagerModule { }
