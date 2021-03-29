import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfReaderComponent } from './pdf-reader.component';
import { PdfHeaderComponent } from './components/pdf-header/pdf-header.component';
import { PdfActionsComponent } from './components/pdf-actions/pdf-actions.component';
import { PdfSidebarComponent } from './components/pdf-sidebar/pdf-sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { EuronovateSidebarModule, EnFileUploaderModule } from '@euronovate-theme/components';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DossierListComponent } from './components/dossier-list/dossier-list.component';
import { DossierCardComponent } from './components/dossier-card/dossier-card.component';
import { DossierService } from './services/dossier.service';
import { DossierConfiguratorComponent } from './components/dossier-configurator/dossier-configurator.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRippleModule } from '@angular/material/core';
import { EnRigthClickTriggerDirective } from './directives/en-rigth-click-trigger.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { DossierTableComponent } from './components/dossier-table/dossier-table.component';
import { MatTableModule } from '@angular/material/table';
import { DocumentDetailComponent } from './components/document-detail/document-detail.component';
import { DialogActionsComponent } from './components/pdf-actions/dialog-actions/dialog-actions.component';
import { MatMenuModule } from '@angular/material/menu';
import { ENPdfManagerModule } from '@euronovate-pdf-manager/en-pdf-manager.module';

const routes: Routes = [
  {
    path: 'dossier',
    component: DossierListComponent
  },
  {
    path: 'dossier/:dossierGuid',
    component: PdfReaderComponent
  },
  {
    path: '**',
    redirectTo: 'dossier'
  }
];

@NgModule({
  declarations: [
    PdfReaderComponent,
    PdfHeaderComponent,
    PdfActionsComponent,
    PdfSidebarComponent,
    DossierListComponent,
    DossierCardComponent,
    DossierConfiguratorComponent,
    EnRigthClickTriggerDirective,
    DossierTableComponent,
    DocumentDetailComponent,
    DialogActionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    TranslateModule,
    EuronovateSidebarModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    EnFileUploaderModule,
    MatSelectModule,
    MatSlideToggleModule,
    DragDropModule,
    MatRippleModule,
    OverlayModule,
    MatTableModule,
    MatMenuModule,
    ENPdfManagerModule
  ],
  providers: [
    DossierService
  ]
})
export class PdfReaderModule {}
