import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { State } from '.././model/states.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class StateService {
    constructor(private http: HttpClient) { }
    getStateName(): Observable<any> {

        return this.http.get('assets/indianStates.json').pipe(map(res => res));
    }
}
