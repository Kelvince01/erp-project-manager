import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';



@NgModule({
  declarations: [
    ListComponent,
    UpsertComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
