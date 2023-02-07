import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConveyanceSummaryComponent } from './conveyance-summary.component';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ConveyanceSummaryComponent }
    ])],
  exports: [RouterModule]
})
export class ConveyanceSummaryRoutingModule { }
