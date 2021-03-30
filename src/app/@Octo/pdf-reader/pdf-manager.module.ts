import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ActionsButtonsComponent } from './components/actions-buttons/actions-buttons.component';
import { SignatureDialogComponent } from './components/signature-dialog/signature-dialog.component';
import { CommonModule } from '@angular/common';
import { OverlayMenuService } from './services/overlay-menu.service';
import { FieldProprietiesMenuComponent } from './components/field-proprieties-menu/field-proprieties-menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfManagerComponent } from './containers/pdf-manager/pdf-manager.component';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { UploadImageDialogComponent } from './components/upload-image-dialog/upload-image-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PdfReaderComponent } from './pages/pdf-reader/pdf-reader.component';
import { CanvasDrawerService } from './services/canvas-drawer.service';
import { OctoFormModule } from '../form/octo-form.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: PdfReaderComponent }
];

@NgModule({
  declarations: [
    ActionsButtonsComponent,
    SignatureDialogComponent,
    FieldProprietiesMenuComponent,
    PdfViewerComponent,
    PdfManagerComponent,
    ImageCropperComponent,
    UploadImageDialogComponent,
    PdfReaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DragDropModule,
    OverlayModule,
    OctoFormModule,
    NgxExtendedPdfViewerModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PdfManagerComponent
  ],
  providers : [
    CanvasDrawerService,
    OverlayMenuService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PdfManagerModule { }
