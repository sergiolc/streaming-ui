import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

import { ConfigService } from '../services/config.service';


@Injectable()
export class SocketService {

    private socket;

    constructor(protected configService: ConfigService) {

    }


    initSocket() {
        this.socket = socketIo(this.configService.apiUrl);
    }

    onMessage(): Observable<any> {

        return new Observable<any>(observer => {

            this.socket.on('message', (data: any) => observer.next(data));
        });
    }

}
