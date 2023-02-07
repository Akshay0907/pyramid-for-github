import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LiveTrackingComponent } from './live-tracking.component';





@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LiveTrackingComponent },

    ])],
    exports: [RouterModule]
})
export class LiveTrackingRoutingModule { }
