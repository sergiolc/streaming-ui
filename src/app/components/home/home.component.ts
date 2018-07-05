import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../core/socket/socket.service';
import { SessionService } from '../../core/session/session.service';
import { VideosService } from '../../core/services/videos.service';
import { UsersService } from '../../core/services/users.service';
import { mergeMap, tap, switchMap, map } from 'rxjs/operators';

export interface Message {
    status: string;
    data: any;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    user: any;
    videos: Array<any> = [];

    constructor(
        protected sessionService: SessionService,
        protected socketService: SocketService,
        protected videosService: VideosService,
        protected usersService: UsersService) {
        
    }

    ngOnInit() {
        this.user = this.sessionService.getUser();

        this.socketService.initSocket();

        this.videosService.list().pipe(
            switchMap(videos => {
                return this.usersService.streams(this.user.id).pipe(
                    map(streams => {
                        streams.forEach(stream => {
                            const video = videos.find(item => item.id === stream.videoId);
                            if (video) {
                                video.status = 'allowed';
                            }
                        });

                        return videos;
                    })
                );
            })
        ).subscribe(videos => {
            this.videos = videos;
        });

    }

    logout() {
        this.videosService.stopAllStreams(this.user.id).subscribe(result => {
            // console.log(result);
        });
        this.sessionService.logout();
    }

}
