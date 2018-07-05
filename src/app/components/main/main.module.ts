import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        SharedModule
    ],
    providers: []
})
export class MainModule { }
