import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:AuthService,private route:Router){

  }
  canActivate(){
    console.log("dbfsffbslfbf");
    if(this.service.IsLoggedIn()){
        console.log("dbfsffbslfbf");
    return true;
    }else{
        console.log("dbfsffbslfbf");
      this.route.navigate(['auth/login'])
      return false;
    }
  }

}
