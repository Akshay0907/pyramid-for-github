import { Injectable } from '@angular/core';
//import { GlobalService } from '.././global.service';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
//import { Pageable } from './../model/page.model';
import { EmployeeFilter } from '.././model/employee-filter.model';
import { Reimbursement } from '../model/reimbursement';


@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {
    [x: string]: any;
   // private baseUrl = 'http://localhost:8090/api/reimbursement';
  constructor(private http: HttpClient) { }


  getAllReimbursement(): Observable<any> {

    return this.http.get<Reimbursement[]>('/api/reimbursement')
       .pipe(
       map(res => res),);
    //    // catchError(this.globalService.handleError)
    //   );
  }

getTopReimbursement():Observable<any>{
    return this.http.get<Reimbursement>('/api/reimbursement/current') .pipe(
        map(res => res),);
}





  addReimbursement(reimbursement: Reimbursement): Observable<any> {

    return this.http.post('/api/reimbursement', reimbursement)
      .pipe(
        map(res => res),
       // catchError(this.globalService.handleError)
      );
  }


}
