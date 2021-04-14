import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from 'src/app/core/guards/navigation.guard';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '/:id',
    component: WorkflowComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/pages.module').then((m) => m.PagesModule),
        canActivateChild: [NavigationGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    WorkflowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkflowModule { }
