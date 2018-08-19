import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

 describe('AuthService', () => {
    let injector: TestBed;
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
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

        const req = httpMock.expectOne(environment.apiUrl + 'auth');
        expect(req.request.method).toBe('POST');
        req.flush(dummyResponse);
    });
 });
