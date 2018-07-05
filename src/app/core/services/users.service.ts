import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class UsersService {

    constructor(
        protected httpClient: HttpClient,
        protected configService: ConfigService) {

    }

    get(id: string) {
        return this.httpClient.get<any>(this.configService.apiUrl + `/users/${id}`);
    }

    getByName(name: string) {
        return this.httpClient.get<any>(this.configService.apiUrl + `/users/?name=${name}`);
    }

    streams(id: string) {
        return this.httpClient.get<Array<any>>(this.configService.apiUrl + `/users/${id}/streams`);
    }

}
