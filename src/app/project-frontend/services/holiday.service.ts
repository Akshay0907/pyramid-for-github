import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { Holiday } from '../model/holiday';
import { environment } from 'src/environments/environment';

//const baseURL = environment.base_url + "/api/holidays";

@Injectable({
  providedIn: 'root'
})
export class HolidayService {


  constructor(private http:HttpClient) { }

  getHolidayList(): Observable<Holiday[]>{
    return this.http.get<Holiday[]>(`/api/holidays`)
    .pipe(
        map(res => res)
     //    // catchError(this.globalService.handleError)
       );
  }


createHoliday(holiday:Holiday):Observable<Object>{
  return this.http.post(`/api/holidays`,holiday);
}


updateHoliday(id:number,holiday:Holiday):Observable<Holiday>{
  return this.http.put<Holiday>(`/api/holidays/${id}`,holiday)
  .pipe(
    map(res => res)
 //    // catchError(this.globalService.handleError)
   );
}


deleteHolidays(id:any):Observable<Object>{
  return this.http.delete(`/api/holidays/${id}`)
  .pipe(
    map(res => res)
 //    // catchError(this.globalService.handleError)
   );
}
}
