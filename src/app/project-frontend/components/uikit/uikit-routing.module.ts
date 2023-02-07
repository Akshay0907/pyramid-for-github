import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeTableComponent } from './employeetable/employeetable.component';

@NgModule({
    imports: [RouterModule.forChild([
        {path:'liveTracking', loadChildren: ()=>import('./live-tracking/live-tracking.module').then(m=>m.LiveTrackingModule)},
        {path: 'employeetable', loadChildren: () => import('./employeetable/employeetable.module').then(m => m.EmployeeTableModule)},
        {path: 'reimbursement', loadChildren: () => import('./reimbursement/reimbursement.module').then(m => m.ReimbursementModule)},
        {path: 'leaveRule', loadChildren: () => import('./leave-rule/leave-rule.module').then(m => m.LeaveRuleModule)},
        {path:'branch', loadChildren: ()=> import('./branch-module/branch-module.module').then(m => m.BranchModuleModule)},
        {path:'holiday', loadChildren: ()=> import('./holiday-module/holiday-module.module').then(m => m.HolidayModuleModule)},
        {path:'testing', loadChildren: ()=> import('./testing/testing.module').then(m => m.TestingModule)},
        {path:'testing2', loadChildren: ()=> import('./conveyance/conveyance.module').then(m => m.ConveyanceModule)},
        {path:'attendanceSummary', loadChildren: ()=> import('./attendance-summary/attendance-summary.module').then(m => m.AttendanceSummaryModule)},
        {path:'conveyanceSummary', loadChildren: ()=> import('./conveyance-summary/conveyance-summary.module').then(m => m.ConveyanceSummaryModule)},
        {path:'rejectedCompOff', loadChildren: ()=> import('./rejected-comp-off/rejected-comp-off.module').then(m => m.RejectedCompOffModule)},
    ])],
    exports: [RouterModule]
})
export class UikitRoutingModule { }
