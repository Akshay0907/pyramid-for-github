import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UikitRoutingModule } from './uikit-routing.module';
import { ReimbursementComponent } from './reimbursement/reimbursement.component';
import { LeaveRuleComponent } from './leave-rule/leave-rule.component';
import { LiveTrackingComponent } from './live-tracking/live-tracking.component';
import { PlotMapComponent } from './plot-map/plot-map.component';
import { AttendanceSummaryComponent } from './attendance-summary/attendance-summary.component';
import { ConveyanceSummaryComponent } from './conveyance-summary/conveyance-summary.component';
import { RejectedCompOffComponent } from './rejected-comp-off/rejected-comp-off.component';




@NgModule({
    imports: [
        CommonModule,
        UikitRoutingModule
    ],

    declarations: [
  
  ]

})
export class UikitModule { }
