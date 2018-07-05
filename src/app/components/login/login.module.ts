import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: []
})
export class LoginModule { }
