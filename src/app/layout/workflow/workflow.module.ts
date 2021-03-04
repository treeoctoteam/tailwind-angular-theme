import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow.component';
import { LayoutComponentsModule } from 'src/app/shared/components/layout-components.module';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from 'src/app/core/guards/navigation.guard';

const routes: Routes = [
  {
    path: '',
    component: WorkflowComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("../../pages/pages.module").then((m) => m.PagesModule),
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
    LayoutComponentsModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkflowModule { }
