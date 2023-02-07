import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';
import { Pagination } from '../model/pagination';
import { Ride } from '../model/ride';

@Injectable({
  providedIn: 'root'
})
export class ConveyanceService {



  constructor(private httpClient : HttpClient) { }



  updateRide(id:number,ride:Ride):Observable<Ride>{
    return this.httpClient.put<Ride>(`/api/rides/update/${id}`,ride);
  }






  getRideListWithPagination(request:Pagination) :Observable<any>{

    console.log("coming in ride service");
    return this.httpClient.post<Ride[]>(`/getAll`,request)
    .pipe(map (res => res))

  }

  getRideWithSearchingAndFiltering(request:Pagination) :Observable<any>{

    return this.httpClient.post<Ride[]>(`/api/rides/searching`,request)
    .pipe(map (res => res))
  }

  getRideSummary(request:Pagination) :Observable<any>{

    return this.httpClient.post<Ride[]>(`/api/rides/summary`,request)
    .pipe(map (res => res))
  }

  getYesterdayReimbursement() :Observable<any>{

    return this.httpClient.get(`/api/rides/yestedayReimbursement`)
    .pipe(map (res => res))
  }

  getActiveRides() :Observable<any>{

    return this.httpClient.get(`/api/rides/activeRidesCount`)
    .pipe(map (res => res))
  }

  getSixMonthReimbursement() :Observable<any>{

    return this.httpClient.get(`/api/rides/sixMonthReimbursement`)
    .pipe(map (res => res))
  }

  getCurrentPetrolPrice() :Observable<any>{

    return this.httpClient.get(`https://mfapps.indiatimes.com/ET_Calculators/oilpricebycitystate.htm?type=state&callback=jQuery363030470549450459816_1674045942177&_=1674045942178`)
    .pipe(map (res => res))
  }

  getSixDaysRides() :Observable<any>{
    return this.httpClient.get(`/api/rides/sixDaysRides`)
    .pipe(map (res => res))
  }
}
