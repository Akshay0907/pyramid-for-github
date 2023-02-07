import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RejectedCompOffRoutingModule } from './rejected-comp-off-routing.module';
import { RejectedCompOffComponent } from './rejected-comp-off.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [RejectedCompOffComponent],
  imports: [
    CommonModule,
    RejectedCompOffRoutingModule,
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
export class RejectedCompOffModule { }
