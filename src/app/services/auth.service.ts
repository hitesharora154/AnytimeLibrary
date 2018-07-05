import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    authenticate(body) {
        return this.http.post(environment.apiUrl + 'auth', body);
    }
}
