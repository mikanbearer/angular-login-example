import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = localStorage.getItem('user')
    if (token) {
      return this.authService.tryloggedIn(token).toPromise()
      .then(()=>{
        return true;
      })
      .catch(()=>{
        this.router.navigateByUrl('/login');
        return false;
      });
    }else{
      this.router.navigateByUrl('/login')
      return false;
    }
  }
  
}