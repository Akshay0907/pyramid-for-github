import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConveyancePageComponent } from './conveyance-page/conveyance-page.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ConveyancePageComponent }
])],
  exports: [RouterModule]
})
export class ConveyanceRoutingModule { }
