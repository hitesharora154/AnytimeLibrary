import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    addUser(user: User) {
        return this.http.post(environment.apiUrl + 'user', user);

    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + 'user')
            .pipe(map((usersArray: Array<any>) => {
                const usersResult: Array<User> = [];
                if (usersArray) {
                    usersArray.forEach((user) => {
                        usersResult.push(new User(
                            user.id,
                            user.name,
                            user.email,
                            user.imageUrl
                        ));
                    });
                }
                return usersResult;
            }));
    }
}
