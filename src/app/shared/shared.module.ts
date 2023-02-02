import { PrimengModule } from './../primeng/primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    HttpClientModule,
    StoreModule,
    EffectsModule,
  ],
  exports: [
    PageNotFoundComponent,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    HttpClientModule,
    StoreModule,
    EffectsModule,
  ],
})
export class SharedModule {}
