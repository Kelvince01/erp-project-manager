import { MilestonesListComponent } from './milestones-list/milestones-list.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { UpsertComponent } from './upsert/upsert.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ProgramsComponent,
    ActivitiesListComponent,
    UpsertComponent,
    ListComponent,
    MilestonesListComponent,
  ],
  imports: [CommonModule, ProgramsRoutingModule],
})
export class ProgramsModule {}
