import { Injectable } from '@angular/core';
//import { GlobalService } from '.././global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
//import { Pageable } from './../model/page.model';
import { EmployeeFilter } from '.././model/employee-filter.model';
import { Employee } from '../model/employee';
import { Pagination } from '../model/pagination';
import { EmployeeBirthday } from '../model/employeeBirthday';
import { CompOff } from '../model/compOff';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    [x: string]: any;
  //  private baseUrl = 'http://localhost:8090/api/employees';
  constructor(private http: HttpClient) { }

//   getEmployeesList(): Observable<any> {
//     return this.http.get(`${this.baseUrl}`);
//   }
  getAllEmployee(): Observable<any> {

    return this.http.get<Employee[]>('/api/employees/getnotdeletedlist');
    //   .pipe(
    //     map(res => res),
    //    // catchError(this.globalService.handleError)
    //   );
  }

//   getAll(filter?: EmployeeFilter, pageable = new Pageable()): Observable<any> {
//     const filterStr = `name=${filter.name}&sort=${filter.sort},asc`;
//     const params: any = !pageable ? new URLSearchParams() : pageable;
//     return this.http.get(`/employee/all?${filterStr}`, { params: params })
//     .pipe(map(res => res), catchError(this.globalService.handleError));
//   }
//   getAllTeacher(): Observable<any> {

//     return this.http.get('/employee/teacher')
//       .pipe(
//         map(res => res),
//         catchError(this.globalService.handleError)
//       );
//   }
//   getEmployeeProfile(employeeId): Observable<any> {

//     return this.http.get(`/employee/${employeeId.toString()}`)
//       .pipe(
//         map(res => res),
//         catchError(this.globalService.handleError)
//       );
//   }

  addEmployee(employee: Employee): Observable<any> {

    return this.http.post('/api/employees', employee)
      .pipe(
        map(res => res),
       // catchError(this.globalService.handleError)
      );
  }

  editEmployee(employee: Employee): Observable<any> {

    return this.http.put(`/api/employees/${employee.id}`, employee)
      .pipe(
        map(res => res),
       // catchError(this.globalService.handleError)
      );
  }

  deleteEmployee(ids:any): Observable<any> {
console.log(ids)
    return this.http.delete(`/api/employees/soft/${ids}`)
      .pipe(
        map(res => res)
        //catchError(this.globalService.handleError)
      );
  }
  getAllPaginatedEmployee(request:Pagination): Observable<any> {

    return this.http.post<Employee[]>(`/api/employees/pagination`,request)
       .pipe(
        map(res => res)
    //    // catchError(this.globalService.handleError)
       );
  }


  getSearchedAndFilteredEmployee(request:Pagination): Observable<any>{
    return this.http.post<Employee[]>(`/api/employees/searching`,request)
    .pipe(
     map(res => res));
  }


  unBlockEmployee(userName:any): Observable<any> {

    return this.http.get(`/api/employees/unBlock/${userName}`)
       .pipe(
        map(res => res)
    //    // catchError(this.globalService.handleError)
       );
  }

  getEmployeeCount(): Observable<any>{
    return this.http.get(`/api/employees/employeeCount`)
    .pipe(
     map(res => res));
  }

  getAppUserCount(): Observable<any>{
    return this.http.get(`/api/employees/appUser`)
    .pipe(
     map(res => res));
  }

  getCurrentMonthBirthEmployee(): Observable<any>{
    return this.http.get<EmployeeBirthday[]>(`/api/employees/currentMonthEmployee`)
    .pipe(
     map(res => res));
  }

  getCurrentMonthBirthEmployeeCSV(): Observable<Blob>{
    return this.http.get(`/api/employees/currentMonthEmployeeCsv`,{
        responseType: 'blob'
      });
  }

  getNonRejectedCompOffList(): Observable<any>{
    return this.http.get<CompOff[]>(`/api/CompOff/getAll`)
    .pipe(
     map(res => res));
  }

  acceptCompOff(id:any): Observable<any>{
    return this.http.get<CompOff[]>(`/api/CompOff/accept/${id}`)
    .pipe(
     map(res => res));
  }

  rejectCompOff(id:any): Observable<any>{
    return this.http.delete(`/api/CompOff/${id}`)

  }

  getAllRejectedCompOff(): Observable<any>{
    return this.http.get<CompOff[]>(`/api/CompOff/getAllDeleted`)
    .pipe(
     map(res => res));
  }

  deleteCompOff(id:any): Observable<any>{
    return this.http.get(`/api/CompOff/reject/${id}`)

  }
}
