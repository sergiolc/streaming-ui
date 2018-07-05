import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { CanActivateAuthGuard } from './core/route.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: MainComponent,
                children: [

                    { path: '', redirectTo: 'home', pathMatch: 'full' },

                    {
                        path: 'home',
                        canActivate: [CanActivateAuthGuard],
                        loadChildren: './components/home/home.module#HomeModule'
                    }
                ]
            },

            {
                path: '',
                children: [
                    {
                        path: 'login', loadChildren: './components/login/login.module#LoginModule'
                    }
                ]
            },
        ],
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
