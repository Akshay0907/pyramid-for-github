import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConveyanceSummaryRoutingModule } from './conveyance-summary-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConveyanceSummaryComponent } from './conveyance-summary.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [ConveyanceSummaryComponent],
  imports: [
    CommonModule,
    ConveyanceSummaryRoutingModule,
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
export class ConveyanceSummaryModule { }
