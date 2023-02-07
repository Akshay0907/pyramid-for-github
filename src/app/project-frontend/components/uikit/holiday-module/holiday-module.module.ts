import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayModuleRoutingModule } from './holiday-module-routing.module';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
//import { DatePipe } from '@angular/common'
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CardModule} from 'primeng/card';
import { MessageService } from "primeng/api";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
import {CalendarModule} from 'primeng/calendar';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
//import {Validators} from '@angular/forms'




@NgModule({
  declarations: [
    HolidayListComponent
  ],
  imports: [
    CommonModule,
    HolidayModuleRoutingModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    // MatDatepickerModule,
    // MatFormFieldModule,
    // MatInputModule,
    CalendarModule,
    //BrowserAnimationsModule
    ReactiveFormsModule,
    //Validators,
    TooltipModule

  ],
  providers: [MessageService]
})
export class HolidayModuleModule { }
