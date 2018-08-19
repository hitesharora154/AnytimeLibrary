import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { BookingDialogService } from '../booking-dialog/booking-dialog.service';
import { BookService } from '../services/book.service';
import { MatSnackBarModule, MatSnackBar, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

class MockBookingDialogService {
    confirm(bookId, bookTitle): Observable<any> {
        return Observable.of({ bookId: 3, title: '34334' });
    }
}

class MockBookService {
    addBookIssue(bookIssued): Observable<any> {
        return Observable.of({ message: 'Done!' });
    }
}

class MockSnackBar {
    open(message, action?, config?) {

    }
}

describe('BookComponent', () => {
    let component: BookComponent;
    let fixture: ComponentFixture<BookComponent>;
    let mockBookingDialogService: MockBookingDialogService;
    let mockBookService: MockBookService;
    let mockSnackBar: MockSnackBar;

    beforeEach(async(() => {
        mockBookingDialogService = new MockBookingDialogService();
        mockBookService = new MockBookService();
        mockSnackBar = new MockSnackBar();
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                MatCardModule,
                BrowserAnimationsModule
            ],
            declarations: [BookComponent],
            providers: [
                { provide: BookingDialogService, useValue: mockBookingDialogService },
                { provide: BookService, useValue: mockBookService },
                { provide: MatSnackBar, useValue: mockSnackBar }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should issue Book successfully', () => {
        spyOn(mockSnackBar, 'open');
        component.book = new Book(1, '3223', 2, 'fsef', 10);
        component.bookIssue(1, 'efewf', 4);
        expect(mockSnackBar.open).toHaveBeenCalled();
    });

    it('should have problem in issue book', () => {
        spyOn(mockSnackBar, 'open');
        spyOn(mockBookService, 'addBookIssue').and.returnValue(Observable.of({ message: 'User Limit Reached' }));
        spyOn(mockBookingDialogService, 'confirm').and.returnValue(Observable.of({ bookId: 3, title: '34334' }));
        component.book = new Book(1, '3223', 2, 'fsef', 10);
        component.bookIssue(1, 'efewf', 4);
        expect(mockSnackBar.open).toHaveBeenCalled();
    });
});
