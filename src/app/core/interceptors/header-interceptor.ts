import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  const cookies = inject(CookieService)
  const token = cookies.get('token')

  if(token){
    req = req.clone({
      setHeaders: {
        token: token,
      },
    })
  }

  // console.log('Token from cookies:', token);

  return next(req);
};
