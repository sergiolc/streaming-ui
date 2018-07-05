import { NgModule } from '@angular/core';
import { SessionService } from './session/session.service';
import { SocketService } from './socket/socket.service';
import { CanActivateAuthGuard } from './route.guard';
import { ConfigService } from './services/config.service';
import { UsersService } from './services/users.service';
import { VideosService } from './services/videos.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
    ],
    imports: [
        HttpClientModule
    ],
    providers: [
        ConfigService,
        UsersService,
        VideosService,
        SessionService,
        SocketService,
        CanActivateAuthGuard
    ]
})
export class CoreModule { }
