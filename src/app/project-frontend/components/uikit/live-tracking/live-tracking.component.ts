import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LeafletBaseLayersDirective } from '@asymmetrik/ngx-leaflet';
import { SelectItem } from 'primeng/api';
import { LiveTrackingDetails } from 'src/app/project-frontend/model/liveTrackingDetails';
import { LiveTrackingService } from 'src/app/project-frontend/services/liveTracking.service';
import * as leaflet from 'leaflet';
import * as L from 'leaflet';
import { LiveTrackingCoordinates } from 'src/app/project-frontend/model/liveTrackingCoordinates';
import { PlotMapComponent } from '../plot-map/plot-map.component';
import { Dialog } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-live-tracking',
  templateUrl: './live-tracking.component.html',
  providers: [DialogService],
  styles: [
    `  :host ::ng-deep .red{
        background-color:#F0F8FF;
    }
    :host ::ng-deep .p-toolbar {
    display: contents !important;

    }
    tr.OnLeave{
            color: #ff0000;

        }
        tr.Present{
            color: black;

        }
        :host ::ng-deep .map-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 30px;
}

:host ::ng-deep .map-frame {
  border: 2px solid black;
  height: 100%;
}

:host ::ng-deep #map {
  height: 100%;
}
    `
]
})
export class LiveTrackingComponent implements AfterViewInit{

    title = 'AngularOSM';

    @ViewChild(PlotMapComponent)
    private plotMapComponent!: PlotMapComponent;


    LiveTrackingDetails!: LiveTrackingDetails[];
    liveCoordinates!:LiveTrackingCoordinates[];
    public zoomSettings!: object;
    public centerPosition!: object;
    public markerSettings!: object;
    public navigationLineSettings!: object;
    public urlTemplate!: string;

    sortOptions!: SelectItem[];

    sortOrder!: number;

    sortField!: string;
    sortkey!:string;
    mapDialog=false
    latlngs!:any
    pointList:any=[];

    private map!:leaflet.Map;
    private markersLayer= leaflet.featureGroup();
    private routesMarkers=leaflet.featureGroup();
    private linesLayer=leaflet.featureGroup();
    @ViewChild('filter') filter!: ElementRef;
    private readonly mapOptions:leaflet.MapOptions={
       // fullscreenControl : true,
        center: [33.9998,-118.1552],
        zoom:8,
    };
    @ViewChild('map',{static:false})
    mapContainer!: ElementRef<HTMLDivElement>;
    options: leaflet.MapOptions = {};

    ref!: DynamicDialogRef;

    constructor(private liveTrackingService: LiveTrackingService,public dialogService: DialogService) { }
    ngAfterViewInit(): void {
        //   this.linesLayer.addTo(this.map);
    //   this.markersLayer.addTo(this.map);
    //   this.routesMarkers.addTo(this.map);
    }



    // ngAfterViewInit(): void {
    //   if(this.mapContainer===undefined){
    //     return;
    //   }
    //   this.map =leaflet.map(this.mapContainer.nativeElement,this.mapOptions);

    //   leaflet.tileLayer('https://{s}.tileopenstreetmap.org/{z}/{x}/{y}.png',{
    //     maxNativeZoom:20,
    //     maxZoom:19,
    //     attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //   })
    //   .addTo(this.map);
    //   this.linesLayer.addTo(this.map);
    //   this.markersLayer.addTo(this.map);
    //   this.routesMarkers.addTo(this.map);
    // }





    ngOnInit() {
        this.options=  {
            layers: onlyMapLayer(),
            zoom: 12,
            center: new leaflet.LatLng(26.9124, 75.7873)
          };

         this.liveTrackingService.getLiveTrackingList().subscribe(data => this.LiveTrackingDetails = data);

        this.sortOptions = [
            {label: 'Descending', value: '!startTime'},
            {label: 'Ascending', value: 'startTime'}
        ];


    }

    onSortChange(event:any) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onGlobalFilter(table: DataView, event: Event) {
        table.filter((event.target as HTMLInputElement).value, 'contains');
    }
    onMapReady(map: L.Map) {
        setTimeout(() => {
          map.invalidateSize();
        }, 0);
     }

     onResized() {
        if (this.map) {
          this.map.invalidateSize();
        }
      }

     hideDialog(){
        this.liveCoordinates=[]
        console.log("on hide",this.liveCoordinates)
       // this.plotMapComponent.destroyData()

     }
mapOpen(id:any){
   //this.liveCoordinates = []
    this.liveTrackingService.getLiveTrackingCoordinates(id).subscribe(data => {

        this.liveCoordinates = data
        console.log("dataaaa-->",data)


            this.ref = this.dialogService.open(PlotMapComponent, {
                header: 'Choose a Product',
                width: '70%',
                contentStyle: {"overflow": "auto"},
                baseZIndex: 10000,
                maximizable: true,
                data: {
                    data:this.liveCoordinates
                }

            });

        });
        //this.mapDialog=true
       // Dialog.(PlotMapComponent,{  });

// setTimeout(() => {
//     console.log(this.liveCoordinates)
//     this.liveCoordinates.forEach(c=>{
//         var a=new L.LatLng(c.latitude,c.longitude);

//         this.pointList.push(a);
//         // var latlngs = [ [38.91,-77.07], [37.77, -79.43], [39.04, -85.2]];
//         setTimeout(()=>{
//            // var polyline = L.polyline(this.pointList, {color: 'red'}).addTo(this.map);



//         },1000)

// // Creating multi polylines


    // })
    //this.map.addLayer(this.pointList.polyline)
// var polyline=new L.Polyline(this.pointList,{
//     color:'red',
//     weight:3,
//     opacity:0.5,
//     smoothFactor:1
// });

console.log(this.pointList)
//L.polyline(this.pointList, {color:"red"}).addTo(this.map);
    // console.log(polyline)
   // polyline.addTo(this.map)

// }, 10000);


   // L.polyline(this.latlngs, {color:"red"}).addTo(this.map);
}
}



  export const getLayers = (coordinate:any): leaflet.Layer[] => {
    return [
        new leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                     attribution: '&copy; OpenStreetMap contributors'
                   } as leaflet.TileLayerOptions),
...getRoutes(coordinate)
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

  export const onlyMapLayer = (): leaflet.Layer[] => {
    return [
        new leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                     attribution: '&copy; OpenStreetMap contributors'
                   } as leaflet.TileLayerOptions),

    ] as leaflet.Layer[];
  };
