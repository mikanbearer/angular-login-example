import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const baseUrl: string = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(username, password) {
    return this.http.post(`${baseUrl}api-token-auth/`, { username: username, password: password })
    .subscribe((response: any) => {
      if (response.token !== undefined) {
        this.token = response.token;
        this.loggedIn.next(true);
        localStorage.setItem('user', this.token);
        this.router.navigateByUrl('');
      }
    })
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigateByUrl('/login');
  }

  tryloggedIn(token) {
      return this.http.post<any>(`${baseUrl}api-token-verify/`, {token: token})
      .pipe(map(
        response=>{
          if (response.token === token) {
            this.loggedIn.next(true);
          }
        }
      ));
  }

}
