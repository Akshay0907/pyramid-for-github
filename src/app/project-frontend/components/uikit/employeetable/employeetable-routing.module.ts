import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeTableComponent } from './employeetable.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EmployeeTableComponent },

    ])],
    exports: [RouterModule]
})
export class EmployeeTableRoutingModule { }
