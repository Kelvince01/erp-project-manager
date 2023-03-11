import { PrimengModule } from '@primeng/primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonFunctionalityComponent } from './components/common-functionality/common-functionality.component';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';

@NgModule({
  declarations: [
    CommonFunctionalityComponent,
    MatchPasswordDirective,
    ValidateUserNameDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    HttpClientModule,
    StoreModule,
    EffectsModule.forRoot([]),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    HttpClientModule,
    StoreModule,
    EffectsModule,
  ],
})
export class SharedModule {}
