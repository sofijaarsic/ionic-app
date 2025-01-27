// import { Injectable } from '@angular/core';
// import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
// import { Observable } from 'rxjs';
// import {AuthService} from "./auth.service";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanLoad {
//
//   constructor(private authService: AuthService, private router: Router) {
//   }
//   canLoad(
//     route: Route,
//     segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//
//     if(!this.authService.isUserAuthenticated) {
//       this.router.navigateByUrl('/log-in');
//     }
//
//     return this.authService.isUserAuthenticated;
//   }
// }

import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isUserAuthenticated) {
      router.navigateByUrl('/log-in');
  }

  return authService.isUserAuthenticated;
}
