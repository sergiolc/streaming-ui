import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { SocketService } from '../../../core/socket/socket.service';
import { SessionService } from '../../../core/session/session.service';
import { VideosService } from '../../../core/services/videos.service';
import { filter } from 'rxjs/operators';

export interface Message {
    status: string;
    data: any;
}

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

    @Input() video: any;

    statusChanged: EventEmitter<string> = new EventEmitter();
    feedback = '';

    constructor(
        protected sessionService: SessionService,
        protected socketService: SocketService,
        protected videosService: VideosService) {

    }

    ngOnInit() {

        this.updateFeedback(this.video.status);

        this.socketService.onMessage().pipe(
            filter(message => message.data.videoId === this.video.id)
        ).subscribe(message => {
            this.video.status = message.status;
            this.statusChanged.emit(this.video.status);
        });

        this.statusChanged.subscribe(status => {

            this.updateFeedback(status);

        });

    }

    start(video) {
        this.video.status = 'pending';
        this.statusChanged.emit(this.video.status);

        this.videosService.requestStream(video.id, this.sessionService.getUser().id).subscribe(result => {
            // console.log(result);
        });
    }

    stop(video) {
        this.videosService.stopStream(video.id, this.sessionService.getUser().id).subscribe(result => {
            this.video.status = 'stopped';
            this.statusChanged.emit(this.video.status);
        });
    }

    updateFeedback(status: string) {
        switch (status) {
            case 'allowed':
                this.feedback = 'Playing...';
                break;

            case 'denied':
                this.feedback = 'Limit exceeded.';
                break;

            case 'pending':
                this.feedback = 'Requesting...';
                break;

            default:
                this.feedback = '';
                break;

        }
    }

}
