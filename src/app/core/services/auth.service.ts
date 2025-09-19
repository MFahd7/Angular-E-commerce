import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

export interface UserData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface UserDataLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private cookieService: CookieService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const Token = localStorage.getItem('token');
      if (Token) {
        this.decodedToken(Token);
      }
    }
  }

  userData = new BehaviorSubject<boolean>(false);

  register(data: UserData): Observable<any> {
    return this.http.post(`${environment.BaseURL}/auth/signup`, data);
  }

  Login(data: UserDataLogin): Observable<any> {
    return this.http.post(`${environment.BaseURL}/auth/signin`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.cookieService.set('token', token, {
      path: '/',
      sameSite: 'Lax',
    });

    this.decodedToken(token);
  }

  forgetPassword(data: { email: string }): Observable<any> {
    return this.http.post(`${environment.BaseURL}/auth/forgotPasswords`, data);
  }

  verifyCode(data: { resetCode: string }): Observable<any> {
    return this.http.post(`${environment.BaseURL}/auth/verifyResetCode`, data);
  }

  resetPassword(data: { email: string; newPassword: string }): Observable<any> {
    return this.http.put(`${environment.BaseURL}/auth/resetPassword`, data);
  }

  decodedToken(token: string) {
    this.cookieService.set('token', token);
    const decoded = jwtDecode(token);
    if ((decoded as any).id) {
      this.userData.next(true);
    }

  }

  logout() {
    // if (isPlatformBrowser(this.platformId)) {
    //   localStorage.removeItem('token');
    //   this.userData.next(false);
    //   this.router.navigate(['/login']);
    // }
    localStorage.removeItem('token');
    this.cookieService.delete('token', '/');

    this.userData.next(false);
    this.router.navigate(['/login']);
  }

  getCookieValue(cname: string, cookies: string) {
    let name = cname + '=';
    let ca = cookies.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  getUserIdFromToken(): string | null {
    const token = this.cookieService.get('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
  
}
