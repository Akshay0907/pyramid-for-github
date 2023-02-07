import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchModuleRoutingModule } from './branch-module-routing.module';
import { BranchListComponent } from './branch-list/branch-list.component';
// import { CreateBranchComponent } from './create-branch/create-branch.component';
// import { UpdateBranchComponent } from './update-branch/update-branch.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule} from '@angular/material/button';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
import {CardModule} from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClientModule } from '@angular/common/http';
import {MessageService} from 'primeng/api';
// import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
// import csc from 'country-state-city';
// import { Country, State, City }  from 'country-state-city';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations:
    [
      BranchListComponent,
    //   CreateBranchComponent,
    //   UpdateBranchComponent,
     ],
  imports: [
    CommonModule,
   // BrowserModule,
    TableModule ,
    BranchModuleRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    // MatButtonModule,
    // MatMenuModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatCardModule,
    CardModule,
    FileUploadModule,
    ToastModule,
    ToolbarModule,
    HttpClientModule,
    // MatDialogModule,
    ConfirmDialogModule,
    DialogModule,
    // MatDatepickerModule,
    ReactiveFormsModule,
    DropdownModule,
    TooltipModule

  ],
  providers: [MessageService]
})
export class BranchModuleModule { }
