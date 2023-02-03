import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';

@NgModule({
  declarations: [ProjectsComponent, ListComponent, UpsertComponent],
  imports: [CommonModule, ProjectsRoutingModule, SharedModule],
})
export class ProjectsModule {}
