import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { SessionService } from './session/session.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionService: SessionService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.sessionService.isAuthenticated().pipe(
            switchMap(authenticated => {

                if (!authenticated) {
                    this.router.navigate(['login']);
                }

                return of(authenticated);

            }),
            catchError(err => {
                this.router.navigate(['login']);
                return of(false);
            })
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

}
