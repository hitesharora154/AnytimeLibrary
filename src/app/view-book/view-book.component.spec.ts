import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookComponent } from './view-book.component';
import {
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBar,
    Sort
} from '@angular/material';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { DeleteDialogService } from '../delete-dialog/delete-dialog.service';
import { UpdateBookDialogService } from '../update-book/update-book-dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookCategory } from '../models/book-category';

const bookCategories: BookCategory[] = [
    {
        id: 1,
        name: 'Philosophy'
    },
    {
        id: 2,
        name: 'Science'
    },
    {
        id: 3,
        name: 'Fiction'
    },
    {
        id: 4,
        name: 'Thriller'
    },
    {
        id: 5,
        name: 'Romantic'
    }
];

const books: Book[] = [
    new Book(1, 'Into the unknown Universe', 2, 'Stephen Hawking', 2),
    new Book(2, 'The monk who sold his ferrari', 1, 'Robin Singh', 3),
    new Book(3, 'The Soul of America: The Battle for Our Better Angels', 3, 'John Meacham', 7),
    new Book(4, 'PAX Indica', 3, 'Shashi Tharoor', 2),
    new Book(5, 'The Secret', 1, 'Dan Brown', 3),
    new Book(6, 'The Alchemist', 1, 'Paul Coelhelo', 9),
    new Book(7, 'Tell Me Your Dreams', 4, 'Sydney Sheldon', 7)
];

class MockBookService {
    getBooks(): Observable<Book[]> {
        return Observable.of(books);
    }

    deleteBook(bookId): Observable<any> {
        return Observable.of({ message: 'Done!' });
    }

    updateBook(book, bookId): Observable<any> {
        return Observable.of({ message: 'Done!' });
    }

    getBookCategories(): Observable<BookCategory[]> {
        return Observable.of(bookCategories);
    }
}

class MockDeleteDialogService {
    confirm(title, message): Observable<boolean> {
        return Observable.of(true);
    }
}

class MockSnackBar {
    open(message, action, config?) { }
}

const bookData = new Book(2, 'the book', 3, 'the author', 4);

class MockUpdateDialogService {
    update(book: Book, bookCategory: BookCategory[]): Observable<Book> {
        return Observable.of(bookData);
    }
}

describe('ViewBookComponent', () => {
    let component: ViewBookComponent;
    let fixture: ComponentFixture<ViewBookComponent>;
    let mockBookService: MockBookService;
    let mockDeleteDialogService: MockDeleteDialogService;
    let mockSnackBar: MockSnackBar;
    let mockUpdateDialogService: MockUpdateDialogService;

    beforeEach(async(() => {
        mockBookService = new MockBookService();
        mockDeleteDialogService = new MockDeleteDialogService();
        mockSnackBar = new MockSnackBar();
        mockUpdateDialogService = new MockUpdateDialogService();
        TestBed.configureTestingModule({
            imports: [
                MatTableModule,
                MatPaginatorModule,
                MatSortModule,
                MatButtonModule,
                MatProgressBarModule,
                BrowserAnimationsModule
            ],
            declarations: [ViewBookComponent],
            providers: [
                { provide: BookService, useValue: mockBookService },
                { provide: DeleteDialogService, useValue: mockDeleteDialogService },
                { provide: MatSnackBar, useValue: mockSnackBar },
                { provide: UpdateBookDialogService, useValue: mockUpdateDialogService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewBookComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update book', () => {
        spyOn(mockSnackBar, 'open');
        component.updateBook(bookData.id,
            bookData.title,
            bookData.categoryID,
            bookData.author,
            bookData.availability);
        expect(mockSnackBar.open).toHaveBeenCalled();
    });

    it('should delete book', () => {
        spyOn(mockSnackBar, 'open');
        component.deleteBook(bookData.id, bookData.title);
        expect(mockSnackBar.open).toHaveBeenCalled();
    });

    it('should work on sort change event', () => {
        const sortObjectArray: Sort[] = [
            {
                active: 'id',
                direction: 'asc'
            },
            {
                active: 'id',
                direction: 'desc'
            },
            {
                active: 'title',
                direction: 'asc'
            },
            {
                active: 'title',
                direction: 'desc'
            },
            {
                active: 'category',
                direction: 'asc'
            },
            {
                active: 'category',
                direction: 'desc'
            },
            {
                active: 'author',
                direction: 'asc'
            },
            {
                active: 'author',
                direction: 'desc'
            },
            {
                active: 'availability',
                direction: 'asc'
            },
            {
                active: 'availability',
                direction: 'desc'
            }
        ];
        sortObjectArray.forEach(sortData => {
            component.sortChanged(sortData);
            expect(component.books.length).toBe(books.length);
        });
    });
});
