import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Employee } from "../model/employee";
import { Pagination } from "../model/pagination";

@Injectable({
    providedIn: 'root'
  })
  export class FileService {
    [x: string]: any;

  constructor(private http: HttpClient) { }



  addFile(file: File): Observable<any> {
    console.log(file)
    let data: FormData = new FormData();
    data.append('file', file);
console.log(data);
    return this.http.post('/api/employees/csvFile/upload', data)
      .pipe(
        map(res => res),
       // catchError(this.globalService.handleError)
      );
  }

  downloadEmployees(request:Pagination): Observable<Blob> {
    return this.http.post(`/api/employees/download`,request,{
      responseType: 'blob'
    });
  }

  downloadRides(request:Pagination): Observable<Blob> {
    return this.http.post(`/api/rides/download`,request,{
      responseType: 'blob'
    });
  }


  downloadAttendances(request:Pagination): Observable<Blob> {
    return this.http.post(`/api/attendances/download`,request,{
      responseType: 'blob'
    });
  }

  downloadAttendanceSummaryCsv(request:Pagination): Observable<Blob> {
    return this.http.post(`/api/attendances/downloadAttendanceSummaryCsv`,request,{
      responseType: 'blob'
    });
  }

  downloadRidesSummaryCsv(request:Pagination): Observable<Blob> {
    return this.http.post(`/api/rides/downloadConveyanceSummaryCsv`,request,{
      responseType: 'blob'
    });
  }
}
