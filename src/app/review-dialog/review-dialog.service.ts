import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

import { ReviewDialogComponent } from './review-dialog.component';
import { BookReview } from '../models/book-review';

@Injectable()
export class ReviewDialogService {

    constructor(private dialog: MatDialog) { }

    submitReview(title: string, bookId, userId, bookingId): Observable<BookReview> {
        let dialogRef: MatDialogRef<ReviewDialogComponent>;

        dialogRef = this.dialog.open(ReviewDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.bookId = bookId;
        dialogRef.componentInstance.userId = userId;
        dialogRef.componentInstance.bookingId = bookingId;

        return dialogRef.afterClosed();
    }
}
