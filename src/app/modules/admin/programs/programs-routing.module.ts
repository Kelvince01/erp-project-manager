import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { MilestonesListComponent } from './milestones-list/milestones-list.component';
import { ProgramsComponent } from './programs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramsComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'add',
        component: UpsertComponent,
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
      },
      {
        path: 'milestones',
        component: MilestonesListComponent,
      },
      {
        path: 'activities',
        component: ActivitiesListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramsRoutingModule {}
