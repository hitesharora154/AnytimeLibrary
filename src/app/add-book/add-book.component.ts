import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { BookService } from '../services/book.service';
import { BookCategory } from '../models/book-category';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  availabilityForm: any;
  bookCategoryForm: any;
  bookCategoryName: any;
  bookNameForm: any;
  authorForm: any;
  isNewCategory = false;
  bookCategories: BookCategory[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBookCategories().subscribe(data => {
      this.bookCategories = data;
    });

    this.availabilityForm = new FormControl('', [Validators.required]);
    this.bookCategoryForm = new FormControl('', [Validators.required]);
    this.bookNameForm = new FormControl('', [Validators.required]);
    this.authorForm = new FormControl('', [Validators.required]);
  }

  enterCategory() {
    this.isNewCategory = true;
    this.bookCategoryName = new FormControl('', [Validators.required]);
    this.bookCategoryForm = new FormControl('');
  }

}
