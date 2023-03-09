import { SharedModule } from './../../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { UsersComponent } from './users.component';
// import { StoreModule } from '@ngrx/store';
// import { userReducer } from 'src/app/data/users/users.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { UsersEffect } from 'src/app/data/users/user.effect';

@NgModule({
  declarations: [ListComponent, UpsertComponent, UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    // StoreModule.forFeature('users', userReducer),
    // EffectsModule.forFeature([UsersEffect]),
  ],
})
export class UsersModule {}
