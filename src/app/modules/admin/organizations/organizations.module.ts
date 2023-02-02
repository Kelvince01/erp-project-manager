import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';


@NgModule({
  declarations: [
    OrganizationsComponent,
    ListComponent,
    UpsertComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule
  ]
})
export class OrganizationsModule { }
