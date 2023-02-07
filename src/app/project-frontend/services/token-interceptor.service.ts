import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',


})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject:Injector,private authservices:AuthService,private router: Router,private messageService: MessageService ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ url: this.interceptUrl(req.url) });
    let authservice=this.inject.get(AuthService);

    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer '+authservice.GetToken()
      }

    });
    return next.handle(jwtToken).pipe(
        map(response => {
          const modifiedRes: any = response;
          if (response instanceof HttpResponse) {
          }


          return modifiedRes;
        }),
        catchError(err => {
            if (err.status === 401 && this.authservices.IsLoggedIn()){
                //alert("TIME OUT, LOGIN AGAIN");
                this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Timed Out, Login again', life: 1000 });
                this.router.navigate(['auth/login']);
            }
          // we are forcing typecast even though the _throw(err) is of type Observable<HttpEvent<any>>
          return throwError(err) as Observable<HttpEvent<any>>;
        })
      );;
  }

private interceptUrl(url: string): string {
    const baseURL = environment.BASE_URL;
    // only append when there is no base url
    url = url.startsWith('/') ? `${baseURL}${url}` : url;
    return url;}
}
