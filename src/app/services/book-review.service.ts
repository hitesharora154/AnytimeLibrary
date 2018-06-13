import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BookReview } from '../models/book-review';
import { environment } from '../../environments/environment';

@Injectable()
export class BookReviewService {

    constructor(private http: HttpClient) { }

    addReview(review: BookReview) {
        return this.http.post(environment.apiUrl + 'bookReview', review);
    }

}
