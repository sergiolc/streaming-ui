import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

const serverUrl = 'http://localhost:8080';


@Injectable()
export class SocketService {

    private socket;


    initSocket() {
        this.socket = socketIo(serverUrl);
    }

    onMessage(): Observable<any> {

        return new Observable<any>(observer => {

            this.socket.on('message', (data: any) => observer.next(data));
        });
    }

}
