import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../core/session/session.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(
        protected router: Router,
        protected formBuilder: FormBuilder,
        protected sessionService: SessionService) {

        this.loginForm = formBuilder.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    login() {
        const credentials = {
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value
        };

        this.sessionService.authenticate(credentials).subscribe(result => {
            if (result) {
                this.router.navigate(['home']);
            } else {
                this.loginForm.controls['password'].reset();
                this.loginForm.controls['password'].markAsTouched();
                this.loginForm.setErrors({ invalidPassword: true });
            }
        });
    }

}
