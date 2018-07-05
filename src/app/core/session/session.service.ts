import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class SessionService {

    private user: any;


    constructor(
        protected router: Router,
        protected usersService: UsersService) {

        const user = sessionStorage.getItem('user');

        if (user) {
            this.user = JSON.parse(user);
        }

    }

    authenticate(credentials: { username: string, password: string }): Observable<boolean> {

        return this.usersService.getByName(credentials.username).pipe(
            switchMap(user => {
                const result = user && credentials.username === credentials.password;

                this.user = result ? user : null;
                sessionStorage.setItem('user', JSON.stringify(this.user));

                return of(result);
            })
        );
    }

    isAuthenticated(): Observable<boolean> {
        return of(!!this.user);
    }

    getUser() {
        return this.user;
    }

    logout() {
        this.user = null;
        sessionStorage.removeItem('user');

        this.router.navigate(['/login']);
    }
}
