import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api'; //api
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { AutoFocusModule } from 'primeng/autofocus';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChartModule } from 'primeng/chart';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
// import { EditorModule } from 'primeng/editor';
import { StepsModule } from 'primeng/steps';
import { BadgeModule } from 'primeng/badge';
import { FieldsetModule } from 'primeng/fieldset';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [],
  providers: [ConfirmationService, MessageService, DialogService],
  imports: [
    CommonModule,
    AccordionModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CheckboxModule,
    MenuModule,
    TabViewModule,
    SidebarModule,
    AutoFocusModule,
    DividerModule,
    RippleModule,
    InputSwitchModule,
    AutoCompleteModule,
    ChartModule,
    StyleClassModule,
    PanelMenuModule,
    // EditorModule,
    StepsModule,
    BadgeModule,
    FieldsetModule,
    BlockUIModule,
    PanelModule,
  ],
  exports: [
    AccordionModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CheckboxModule,
    MenuModule,
    TabViewModule,
    SidebarModule,
    AutoFocusModule,
    DividerModule,
    RippleModule,
    InputSwitchModule,
    AutoCompleteModule,
    ChartModule,
    StyleClassModule,
    PanelMenuModule,
    // EditorModule,
    StepsModule,
    BadgeModule,
    FieldsetModule,
    BlockUIModule,
    PanelModule,
  ],
})
export class PrimengModule {}
