import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

describe('UserService', () => {
    let injector: TestBed;
    let service: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        injector = getTestBed();
        service = injector.get(UserService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('#addUsers', () => {
        it('should return a message done', () => {
            const dummyResult = {
                message: 'Done!'
            };
            service.addUser(
                new User('100009911',
                    'Hitesh',
                    'hitesh@gmail.com',
                    null)).subscribe(result => {
                        expect(result).toEqual(dummyResult);
                    });

            const req = httpMock.expectOne(environment.apiUrl + 'user');
            expect(req.request.method).toBe('POST');
            req.flush(dummyResult);
        });
    });

    describe('#getUsers', () => {
        it('should return an Observable<User[]>', () => {
            const dummyUsers: User[] = [
                new User(
                    '108912031135016035154',
                    'hitesh arora',
                    'hitesh.arora154@gmail.com',
                    'https://lh4.googleusercontent.com/-qMY5n-ROlZk/AAAAAAAAAAI/AAAAAAAAK-4/cRvSrqnySBA/s96-c/photo.jpg'
                )
            ];

            service.getUsers().subscribe(users => {
                expect(users.length).toBe(1);
                expect(users).toEqual(dummyUsers);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'user');
            expect(req.request.method).toBe('GET');
            req.flush(dummyUsers);
        });
    });
});
