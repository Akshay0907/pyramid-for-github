import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './project-frontend/services/token-interceptor.service';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChipModule } from 'primeng/chip';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { MessageModule } from 'primeng/message';
import { AppLayoutModule } from './project-frontend/layout/app.layout.module';
import { LiveTrackingModule } from './project-frontend/components/uikit/live-tracking/live-tracking.module';



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        CardModule,
        KeyFilterModule,
        DropdownModule,
        MultiSelectModule,
        CommonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        BrowserModule,
        BrowserAnimationsModule,
        PasswordModule,
        HttpClientModule,
        BadgeModule,
        AvatarModule,
        ScrollPanelModule,
        TagModule,
        ChipModule,
        ButtonModule,
        SkeletonModule,
        AvatarGroupModule,
        ScrollTopModule,
        OverlayPanelModule,
        TableModule,
        ButtonModule,
        ToastModule,
        HttpClientModule,
        ToastModule,
        MessageModule



    ],
    providers: [[MessageService],
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },


    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
