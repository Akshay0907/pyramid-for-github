import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { RatingModule } from "primeng/rating";
import { AppCodeModule } from "src/app/project-frontend/demo/components/code/code.component";
import { LiveTrackingComponent } from "./live-tracking.component";
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from "primeng/card";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogModule } from "primeng/dialog";
import { RippleModule } from "primeng/ripple";
import { LiveTrackingRoutingModule } from "./live-tracking-routing.module";
import { ImageModule } from "primeng/image";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { PlotMapModule } from "../plot-map/plot-map.module";
import { PlotMapComponent } from "../plot-map/plot-map.component";
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from "primeng/tooltip";




@NgModule({
    declarations: [LiveTrackingComponent],
    imports: [
        LiveTrackingRoutingModule,
        CommonModule,
        DataViewModule,
        PanelModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        HttpClientModule,
        RatingModule,
        FormsModule,
        ImageModule,
        DataViewModule,
        PanelModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        HttpClientModule,
        RatingModule,
        FormsModule,
        DialogModule,
        LeafletModule,
        DialogModule,
        DynamicDialogModule,
        TooltipModule
    ]
})
export class LiveTrackingModule { }
