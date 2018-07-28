import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookComponent } from './add-book.component';
import { BookService } from '../services/book.service';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
