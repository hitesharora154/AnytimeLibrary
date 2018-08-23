import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

class MockHttp {
    post(url, body, options?): Observable<any> {
        return Observable.of({ message: 'Welcome' });
    }
}

describe('AuthService', () => {
    let injector: TestBed;
    let service: AuthService;
    let httpMock: HttpTestingController;
    let mockHttp: MockHttp;

    beforeEach(() => {
        mockHttp = new MockHttp();
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService,
                { provide: HttpClient, useValue: mockHttp }]
        });
        injector = getTestBed();
        service = injector.get(AuthService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should authenticate and return welcome message', () => {
        const dummyResponse = {
            message: 'Welcome'
        };

        service.authenticate(null).subscribe(response => {
            expect(response).toEqual(dummyResponse);
        });
    });
});
