import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { BookReviewService } from './book-review.service';
import { BookReview } from '../models/book-review';
import { environment } from '../../environments/environment.prod';


describe('BookReviewService', () => {
    let injector: TestBed;
    let service: BookReviewService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookReviewService]
        });
        injector = getTestBed();
        service = injector.get(BookReviewService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('#addReview', () => {
        it('should return a response of message done', () => {
            const dummyResponse = {
                message: 'Done!'
            };

            service.addReview(new BookReview()).subscribe(response => {
                expect(response).toEqual(dummyResponse);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'bookReview');
            expect(req.request.method).toBe('POST');
            req.flush(dummyResponse);
        });
    });
});
