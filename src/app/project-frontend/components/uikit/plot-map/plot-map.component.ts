import { AfterViewInit, Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as leaflet from 'leaflet';
import * as L from 'leaflet';

import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-plot-map',
  templateUrl: './plot-map.component.html',
  providers: [DialogService],
  styleUrls: ['./plot-map.component.scss']
})

export class PlotMapComponent implements OnInit {
    title = 'AngularOSM';
    options: leaflet.MapOptions = {};
    private map!:leaflet.Map;
    lastPoint:any
 data:any=[]

  constructor(
    public ref: DynamicDialogRef, public config: DynamicDialogConfig
    ) { }
    // ngOnChanges(changes: SimpleChanges): void {
    //    console.log("child data on change",this.data)
    //   // this.options.layers=getLayers(this.data,this.lastPoint)
    //  this.options

    //   setTimeout(() => {
    //     this.ngOnInit()


    //   }, 1000);




  // }


  ngOnInit(): void {
this.data=this.config.data.data


    console.log("datat on inti----",this.data)
  console.log(this.config.data)
    if( this.data.length!=0){
        console.log("child on init")
    this.lastPoint=this.data[this.data.length-1]
    this.options=  {
        layers: getLayers(this.data,this.lastPoint),
        zoom: 18,
        center: new leaflet.LatLng(this.lastPoint.latitude, this.lastPoint.longitude)
      };}
    //   else{
    //     this.map.getRenderer
    //   }
  }

destroyData(){
    this.data=[]
}



}




export const getLayers = (coordinate:any,lastPoint:any): leaflet.Layer[] => {
    return [
        new leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                     attribution: '&copy; OpenStreetMap contributors'
                   } as leaflet.TileLayerOptions),
...getRoutes(coordinate),
...getMarkers(lastPoint)
    ] as leaflet.Layer[];
  };




  export const getRoutes = (coordinates:any[]): leaflet.Polyline[] => {

    console.log("coordinates",coordinates)

    let points :any []= [];
coordinates.forEach(e=>{
    points.push( new leaflet.LatLng(e.latitude,e.longitude))
})

    return [
       new leaflet.Polyline(
        points
      , {
        color: '#0d9148'
      } as leaflet.PolylineOptions)

    ] as leaflet.Polyline[];
  };


  export const getMarkers = (lastPoint:any): leaflet.Marker[] => {
    return [
      new leaflet.Marker(new leaflet.LatLng(lastPoint.latitude, lastPoint.longitude), {
        icon: new leaflet.Icon({
          iconSize: [50, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/blue-marker.svg',
        }),
        title: 'Current Location'
      } as leaflet.MarkerOptions),

    ] as leaflet.Marker[];
  };
