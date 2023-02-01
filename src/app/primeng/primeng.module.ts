import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
import { MenuItem } from 'primeng/api'; //api

@NgModule({
  declarations: [],
  imports: [CommonModule, AccordionModule],
  exports: [AccordionModule],
})
export class PrimengModule {}
