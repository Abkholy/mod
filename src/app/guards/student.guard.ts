import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../modules/users/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private usersService: UserService,
    private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var token = localStorage.getItem('token');
    var userId = localStorage.getItem('userId') 
   
    return this.usersService.getIfStuddent(userId).pipe(map((data) => {
      if (data == true) {
        return true;
      } else {
        this.router.navigate(['/login'])
        return false;
      }
    }))
  }
}
