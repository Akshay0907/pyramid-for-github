import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConveyanceRoutingModule } from './conveyance-routing.module';
import { ConveyancePageComponent } from './conveyance-page/conveyance-page.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import {  DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    ConveyancePageComponent
  ],
  imports: [
    CommonModule,
    ConveyanceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ToastModule,
    CalendarModule,
    ToolbarModule,
    InputTextModule,
    CardModule,
    HttpClientModule,
    DialogModule,
    FileUploadModule,
    InputTextareaModule,
    RippleModule,
    PaginatorModule,
    DropdownModule,
    ImageModule,
    MultiSelectModule,
    TooltipModule

  ]
})
export class ConveyanceModule { }
