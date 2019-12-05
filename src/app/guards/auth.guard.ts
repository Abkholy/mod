import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../modules/users/user.service';
import { users } from '../shared/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var token = localStorage.getItem('token');
      var userId = localStorage.getItem('userId') 


      if(token && userId){
        return true;
      } else{
        this.router.navigate(['/login'])
        return false;
      }
  }
}
