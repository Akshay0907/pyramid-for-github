import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceSummaryRoutingModule } from './attendance-summary-routing.module';
import { AttendanceSummaryComponent } from './attendance-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [AttendanceSummaryComponent],
  imports: [
    CommonModule,
    AttendanceSummaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CardModule,
    ToastModule,
    TableModule,
    CalendarModule,
    HttpClientModule,
    DialogModule,
    PaginatorModule,
    SelectButtonModule,
    ImageModule,
    MultiSelectModule,
    TooltipModule
  ]
})
export class AttendanceSummaryModule { }
