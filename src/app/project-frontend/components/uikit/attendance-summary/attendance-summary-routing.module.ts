import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceSummaryComponent } from './attendance-summary.component';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AttendanceSummaryComponent }
    ])],
  exports: [RouterModule]
})
export class AttendanceSummaryRoutingModule { }
