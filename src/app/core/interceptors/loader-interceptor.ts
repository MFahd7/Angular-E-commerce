import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GLoaderService } from '../services/g-loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes('/cart')) {
    return next(req); // no loader
  }

  const loaderService = inject(GLoaderService)
  loaderService.showloader()

  return next(req).pipe(
    finalize(()=>{
      loaderService.hideloader()
    })
  );
};
