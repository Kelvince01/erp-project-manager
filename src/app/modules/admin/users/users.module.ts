import { SharedModule } from './../../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [ListComponent, UpsertComponent, UsersComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
