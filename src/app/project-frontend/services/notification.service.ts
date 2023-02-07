import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Employee } from "../model/employee";
import { Pagination } from "../model/pagination";

@Injectable({
    providedIn: 'root'
  })
  export class NotificationService {


    constructor(private http: HttpClient) { }


    getAllNotifications(): Observable<any> {

      return this.http.get<Notification[]>('/api/notification')
        .pipe(
          map(res => res),
         // catchError(this.globalService.handleError)
        );
    }

    getUnreadNotifications(): Observable<any> {

        return this.http.get<Notification[]>('/api/notification/unReadNotifications')
          .pipe(
            map(res => res),
           // catchError(this.globalService.handleError)
          );
      }

      markNotificationsAsRead(ids:any): Observable<any> {

        return this.http.delete(`/api/notification/markTrue/${ids}`)
          .pipe(
            map(res => res),
           // catchError(this.globalService.handleError)
          );
      }


  }
