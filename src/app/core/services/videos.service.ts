import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable()
export class VideosService {

    constructor(
        protected httpClient: HttpClient,
        protected configService: ConfigService) {

    }

    list() {
        return this.httpClient.get<Array<any>>(this.configService.apiUrl + `/videos`);
    }

    requestStream(id: string, userId: string) {
        return this.httpClient.get<any>(this.configService.apiUrl + `/videos/${id}/request/?user=${userId}`);
    }

    stopStream(id: string, userId: string) {
        return this.httpClient.get<any>(this.configService.apiUrl + `/videos/${id}/stop/?user=${userId}`);
    }

    stopAllStreams(userId: string) {
        return this.httpClient.get<any>(this.configService.apiUrl + `/videos/stop/?user=${userId}`);
    }

}
