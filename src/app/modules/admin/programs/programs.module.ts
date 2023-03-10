import { SharedModule } from '@shared/shared.module';
import { MilestonesListComponent } from './milestones-list/milestones-list.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { UpsertComponent } from './upsert/upsert.component';
import { ListComponent } from './list/list.component';
import { AddProjectResponsibilityComponent } from './upsert/add-project-responsibility/add-project-responsibility.component';
import { AddProjectDocumentsComponent } from './upsert/add-project-documents/add-project-documents.component';

@NgModule({
  declarations: [
    ProgramsComponent,
    ActivitiesListComponent,
    UpsertComponent,
    ListComponent,
    MilestonesListComponent,
    AddProjectResponsibilityComponent,
    AddProjectDocumentsComponent,
  ],
  imports: [CommonModule, ProgramsRoutingModule, SharedModule],
})
export class ProgramsModule {}
