import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookComponent } from './add-book.component';
import { BookService } from '../services/book.service';
import { Observable } from 'rxjs';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookComponent],
      providers: [BookService]
    });
  });

  fixture = TestBed.createComponent(AddBookComponent);
  component = fixture.componentInstance;
  bookService = TestBed.get(BookService);

  it('should submit', () => {
    spyOn(bookService, 'addBook').and.returnValue(Observable.from({message: 'Done!'}));
  });
});
