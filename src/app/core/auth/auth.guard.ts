import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// вариант, как в уроке
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stateRoute: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true; // если возвращаем true, то мы разрешаем открыть пользователю этот URL-адрес
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
// в консоли ошибка Error: Uncaught (in promise): TypeError: Class constructor AuthGuard cannot be invoked without 'new'
// TypeError: Class constructor AuthGuard cannot be invoked without 'new'

// мой вариант (по дефолту создается не класс, а переменная)
// export const AuthGuard: CanActivateFn = (route, state) => {
//     const router = inject(Router);
//     const authService = inject(AuthService);
//     if (authService.isLoggedIn()) {
//       return true; // если возвращаем true, то мы разрешаем открыть пользователю этот URL-адрес
//     } else {
//       router.navigate(['/']);
//       return false;
//     }
// }
