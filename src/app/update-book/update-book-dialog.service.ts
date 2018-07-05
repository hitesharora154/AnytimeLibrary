import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UpdateBookComponent } from './update-book.component';
import { Observable } from 'rxjs/Observable';

import { Book } from '../models/book';
import { BookCategory } from '../models/book-category';

@Injectable()
export class UpdateBookDialogService {

    constructor(private dialog: MatDialog) { }

    update(book: Book, bookCategory: BookCategory[]): Observable<Book> {
        let dialogRef: MatDialogRef<UpdateBookComponent>;

        dialogRef = this.dialog.open(UpdateBookComponent);
        dialogRef.componentInstance.book = book;
        dialogRef.componentInstance.bookCategories = bookCategory;

        return dialogRef.afterClosed();
    }

}
