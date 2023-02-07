import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationRequest } from '.././model/authenticationRequest';
import { catchError, map, tap } from 'rxjs/operators';
import { Branch } from '../model/branch';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginData: AuthenticationRequest): Observable<any> {
    return this.http.post(`/authenticate`, loginData).pipe(map(res => res));
  }

  forgotPassword(userName:any,newPassword:any): Observable<any> {
    return this.http.get(`/api/users/forgotPassword/${userName}/${newPassword}`).pipe(map(res => res));
  }
//   branchChange(branch: Branch): Observable<any> {
//     return this.http.post('/user/switch', branch).pipe(map(res => res), catchError(this.globalService.handleError));
//   }
//   forgotPassword(formData: AuthenticationRequest): Observable<any> {
//     return this.http.post('/auth/forgotPassword', formData).pipe(map(res => res), catchError(this.globalService.handleError));
//   }
//   sendOTP(userName: string): Observable<any> {
//     return this.http.get(`/auth/sendOTP/${userName}`).pipe(map(res => res), catchError(this.globalService.handleError));
//   }


}
