import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = await authService.isAuthenticated();
  if (!isAuth) {
    router.navigate(['auth/login']);
    return false;
  }
  return true;
};
