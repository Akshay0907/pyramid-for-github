import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Holiday } from "../model/holiday";
import { LiveTrackingCoordinates } from "../model/liveTrackingCoordinates";
import { LiveTrackingDetails } from "../model/liveTrackingDetails";

@Injectable({
    providedIn: 'root'
  })
  export class LiveTrackingService {


    constructor(private http:HttpClient) { }

    getLiveTrackingList(): Observable<LiveTrackingDetails[]>{
      return this.http.get<LiveTrackingDetails[]>(`/api/rides/liveTrack`)
      .pipe(
          map(res => res)
       //    // catchError(this.globalService.handleError)
         );
    }

    getLiveTrackingCoordinates(rideId :any): Observable<LiveTrackingCoordinates[]>{
        return this.http.get<LiveTrackingCoordinates[]>(`/api/rideLocations/rideLocations/${rideId}`)
        .pipe(
            map(res => res)
         //    // catchError(this.globalService.handleError)
           );
      }
  }
