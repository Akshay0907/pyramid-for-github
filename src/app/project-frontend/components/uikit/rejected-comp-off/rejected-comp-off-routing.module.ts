import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RejectedCompOffComponent } from './rejected-comp-off.component';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RejectedCompOffComponent },

    ])],
  exports: [RouterModule]
})
export class RejectedCompOffRoutingModule { }
