import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MatProgressBarModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BookDashboardComponent } from './book-dashboard.component';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { BookCategory } from '../models/book-category';

class MockBookService {
    constructor() { }

    getBooks() { }

    getBookCategories() { }
}

const bookArray: Book[] = [
    new Book(2323, 'the title', 3, 'eafaf', 10)
];

const bookCategoryArray: BookCategory[] = [
    new BookCategory(3, 'the category')
];

describe('BookDashboardComponent', () => {
    let component: BookDashboardComponent;
    let fixture: ComponentFixture<BookDashboardComponent>;
    let mockBookService: MockBookService;

    beforeEach(async(() => {
        mockBookService = new MockBookService();
        TestBed.configureTestingModule({
            imports: [
                MatProgressBarModule,
                MatFormFieldModule,
                ReactiveFormsModule,
                FormsModule,
                MatSelectModule
            ],
            declarations: [BookDashboardComponent],
            providers: [
                { provide: BookService, useValue: mockBookService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookDashboardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to select category', () => {
        spyOn(mockBookService, 'getBooks').and.returnValue(Observable.of(bookArray));
        spyOn(mockBookService, 'getBookCategories').and.returnValue(Observable.of(bookCategoryArray));
        component.categorySelected(3);
        expect(component.books.length).toBe(1);
    });

    it('should be able to enter text', () => {
        spyOn(mockBookService, 'getBooks').and.returnValue(Observable.of(bookArray));
        spyOn(mockBookService, 'getBookCategories').and.returnValue(Observable.of(bookCategoryArray));
        component.textEntered('the');
        expect(component.books.length).toBe(1);
    });

    it('should be able to enter text and select category', () => {
        spyOn(mockBookService, 'getBooks').and.returnValue(Observable.of(bookArray));
        spyOn(mockBookService, 'getBookCategories').and.returnValue(Observable.of(bookCategoryArray));
        component.categoryId = 3;
        component.textEntered('the');
        expect(component.books.length).toBe(1);
    });
});
