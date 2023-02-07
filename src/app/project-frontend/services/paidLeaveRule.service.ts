import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { PaidLeaveRule } from "../model/paid-leave-rule";

@Injectable({
    providedIn: 'root'
  })
  export class PaidLeaveRuleService {
      [x: string]: any;
    //  private baseUrl = 'http://localhost:8090/api/employees';
    constructor(private http: HttpClient) { }

  //   getEmployeesList(): Observable<any> {
  //     return this.http.get(`${this.baseUrl}`);
  //   }
    getPaidLeaveRule(): Observable<any> {

      return this.http.get<PaidLeaveRule>('/api/paidLeaveRules/current');
      //   .pipe(
      //     map(res => res),
      //    // catchError(this.globalService.handleError)
      //   );
    }

    addPaidLeaveRule(paidLeaveRule: PaidLeaveRule): Observable<any> {

        return this.http.post('/api/paidLeaveRules', paidLeaveRule)
          .pipe(
            map(res => res),
           // catchError(this.globalService.handleError)
          );
      }

  }
