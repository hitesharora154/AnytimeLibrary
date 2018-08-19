import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddBookComponent } from './add-book.component';
import { BookService } from '../services/book.service';
import 'rxjs/add/observable/of';
import { MatSnackBar, MatSnackBarModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookCategory } from '../models/book-category';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

class MockBookService {
  constructor() { }

  addBook(book): Observable<any> {
    return Observable.of({ message: 'Done' });
  }

  getBookCategories(): Observable<BookCategory[]> {
    return Observable.of(bookCategories);
  }
}

class MockMatSnackBar {
  open(message, action?, config?) {

  }
}

describe('AddBookComponent', () => {

  let mockBookService: MockBookService;
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let mockSnackBar: MockMatSnackBar;

  beforeEach(async(() => {
    mockBookService = new MockBookService();
    mockSnackBar = new MockMatSnackBar();
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [AddBookComponent],
      providers: [
        { provide: BookService, useValue: mockBookService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should submit with new category', () => {
    component.ngOnInit();
    component.enterCategory();
    component.availabilityForm.value = 8;
    component.bookNameForm.value = 'Test Book';
    component.bookCategoryName.value = 'Test Category';
    component.isNewCategory = true;
    spyOn(mockSnackBar, 'open');
    component.submit();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('should submit with existing category', () => {
    component.ngOnInit();
    component.selectCategory();
    component.availabilityForm.value = 4;
    component.bookNameForm.value = 'Test Book';
    component.bookCategoryForm.value = 3;
    spyOn(mockSnackBar, 'open');
    component.submit();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

});
