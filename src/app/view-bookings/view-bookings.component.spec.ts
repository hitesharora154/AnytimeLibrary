import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingsComponent } from './view-bookings.component';
import {
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonToggle,
    MatProgressBarModule,
    MatSnackBar,
    Sort
} from '@angular/material';
import { BookIssued } from '../models/book-issued';
import { Observable } from 'rxjs';
import { BookReview } from '../models/book-review';
import { ReviewDialogService } from '../review-dialog/review-dialog.service';
import { BookService } from '../services/book.service';
import { BookReviewService } from '../services/book-review.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const bookIssued: BookIssued[] = [

    {
        id: 1,
        userId: '108912031135016035154',
        userName: 'Hitesh',
        bookId: 6,
        bookTitle: 'ufesif',
        bookAuthor: 'HUIhuiefh',
        issueDate: '2018-07-26T18:30:00.000Z',
        returnDate: '2018-07-25T18:30:00.000Z'
    },
    {
        id: 2,
        userId: '108912031135016035154',
        userName: 'Hitesh',
        bookId: 3,
        bookTitle: 'ufesif',
        bookAuthor: 'HUIhuiefh',
        issueDate: '2018-07-26T18:30:00.000Z',
        returnDate: '2018-07-25T18:30:00.000Z'
    },
    {
        id: 3,
        userId: '108912031135016035154',
        userName: 'Hitesh',
        bookId: 7,
        bookTitle: 'ufesif',
        bookAuthor: 'HUIhuiefh',
        issueDate: '2018-07-26T18:30:00.000Z',
        returnDate: '2018-07-25T18:30:00.000Z'
    }
];

class MockBookService {
    getIssuedBooks(userId?): Observable<BookIssued[]> {
        return Observable.of(bookIssued);
    }
}

class MockDialogService {
    submitReview(title: string, bookId, userId, bookingId): Observable<BookReview> {
        return Observable.of(new BookReview());
    }
}

class MockBookReviewService {
    addReview(review): Observable<any> {
        return Observable.of({ message: 'Done!' });
    }
}

class MockSnackBar {
    open(message, action, config?) { }
}

describe('ViewBookingsComponent', () => {
    let component: ViewBookingsComponent;
    let fixture: ComponentFixture<ViewBookingsComponent>;
    let mockBookService: MockBookService;
    let mockDialogService: MockDialogService;
    let mockBookReviewService: MockBookReviewService;
    let mockSnackBar: MockSnackBar;

    beforeEach(async(() => {
        mockBookService = new MockBookService();
        mockDialogService = new MockDialogService();
        mockBookReviewService = new MockBookReviewService();
        mockSnackBar = new MockSnackBar();
        TestBed.configureTestingModule({
            imports: [
                MatTableModule,
                MatSortModule,
                MatPaginatorModule,
                MatProgressBarModule,
                BrowserAnimationsModule
            ],
            declarations: [ViewBookingsComponent, MatButtonToggle],
            providers: [
                { provide: BookService, useValue: mockBookService },
                { provide: ReviewDialogService, useValue: mockDialogService },
                { provide: BookReviewService, useValue: mockBookReviewService },
                { provide: MatSnackBar, useValue: mockSnackBar }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewBookingsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return book', () => {
        spyOn(mockSnackBar, 'open');
        component.returnBook('wer', 3, '234234', 3);
        expect(mockSnackBar.open).toHaveBeenCalled();
    });

    it('should be able to change sort data', () => {
        const sortObjectArray: Sort[] = [
            {
                active: 'userName',
                direction: 'asc'
            },
            {
                active: 'userName',
                direction: 'desc'
            },
            {
                active: 'bookTitle',
                direction: 'asc'
            },
            {
                active: 'bookTitle',
                direction: 'desc'
            },
            {
                active: 'bookAuthor',
                direction: 'asc'
            },
            {
                active: 'bookAuthor',
                direction: 'desc'
            },
            {
                active: 'issueDate',
                direction: 'asc'
            },
            {
                active: 'issueDate',
                direction: 'desc'
            },
            {
                active: 'returnDate',
                direction: 'asc'
            },
            {
                active: 'returnDate',
                direction: 'desc'
            }
        ];
        sortObjectArray.forEach((sortData) => {
            component.sortChanged(sortData);
        });
        expect(component.BooksIssued.length).toBe(bookIssued.length);
    });
});
