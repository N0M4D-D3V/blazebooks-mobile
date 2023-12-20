import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '@services/user.service';
import { RoutePath } from '@interfaces/route.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService
      .getUser()
      .pipe(map((auth) => auth || this.router.parseUrl(RoutePath.Login)));
  }
}
