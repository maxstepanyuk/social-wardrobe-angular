import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../servises/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authHeader = authService.getAuthorizationHeader();

  if (authHeader) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', authHeader)
    });
    return next(clonedRequest);
  }

  return next(req);
};
