import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayListComponent } from './holiday-list/holiday-list.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: HolidayListComponent }
	])],
	exports: [RouterModule]
})
export class HolidayModuleRoutingModule { }
