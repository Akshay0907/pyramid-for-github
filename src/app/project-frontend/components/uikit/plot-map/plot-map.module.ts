import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PlotMapComponent } from './plot-map.component';



@NgModule({
  declarations: [PlotMapComponent],
  imports: [
    CommonModule,
   // DynamicDialogModule,
    LeafletModule,
  ]
})
export class PlotMapModule { }
