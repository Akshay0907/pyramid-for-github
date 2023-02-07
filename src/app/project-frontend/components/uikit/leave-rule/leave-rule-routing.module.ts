import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeaveRuleComponent } from './leave-rule.component';




@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LeaveRuleComponent },

    ])],
    exports: [RouterModule]
})
export class LeaveRuleRoutingModule { }
