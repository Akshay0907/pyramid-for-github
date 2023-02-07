import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Attendance } from '../model/attendance';
import { AttendanceSummary } from '../model/attendanceSummary';
import { Pagination } from '../model/pagination';



@Injectable({

  providedIn: 'root'

})

export class AttendenceService {




  constructor(private httpClient : HttpClient) { }












  updateAttendence(id:number,attendance:Attendance):Observable<Attendance>{
    return this.httpClient.put<Attendance>(`/api/attendances/${id}`,attendance);
  }

  getAttendenceListWithPagination(request:Pagination) :Observable<any>{

    console.log("coming in ride service");
    console.log(request)
    return this.httpClient.post<Attendance[]>(`/api/attendances/searching`,request)
    .pipe(map (res => res))
  }

  getPresentAbsentCount() :Observable<any>{
    return this.httpClient.get(`/api/attendances/yesterdayCount`)
    .pipe(map (res => res))

  }
  getAttendanceSummary(request:Pagination) :Observable<any>{

    return this.httpClient.post<AttendanceSummary[]>(`/api/attendances/summary`,request)
    .pipe(map (res => res))
  }

}
