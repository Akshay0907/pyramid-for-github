import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReimbursementComponent } from './reimbursement.component';



@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReimbursementComponent },

    ])],
    exports: [RouterModule]
})
export class ReimbursementRoutingModule { }
