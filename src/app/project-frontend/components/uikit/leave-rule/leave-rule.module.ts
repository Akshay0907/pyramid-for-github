import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';

import { CalendarModule } from 'primeng/calendar';


import { TimelineModule } from 'primeng/timeline';
import { MathjaxModule } from 'mathjax-angular';
import { LeaveRuleComponent } from './leave-rule.component';
import { LeaveRuleRoutingModule } from './leave-rule-routing.module';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
    imports: [
        CommonModule,
        LeaveRuleRoutingModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        ToolbarModule,
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        CalendarModule,
        TimelineModule,
        MathjaxModule.forRoot(),
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        CalendarModule,
        TimelineModule,
InputTextModule,
FormsModule,
ReactiveFormsModule,
KeyFilterModule

    ],
    declarations: [LeaveRuleComponent]
})
export class LeaveRuleModule { }
