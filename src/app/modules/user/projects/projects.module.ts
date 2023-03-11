import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ListComponent } from './list/list.component';
import { SuppliersModule } from '../../admin/suppliers/suppliers.module';

@NgModule({
  declarations: [ProjectsComponent, ListComponent],
  imports: [CommonModule, ProjectsRoutingModule, SharedModule, SuppliersModule],
})
export class ProjectsModule {}
