import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BookingDialogComponent } from './booking-dialog.component';

@Injectable()
export class BookingDialogService {

    constructor(private dialog: MatDialog) { }

    confirm(bookId, title): Observable<any> {
        let dialogRef: MatDialogRef<BookingDialogComponent>;

        dialogRef = this.dialog.open(BookingDialogComponent);
        dialogRef.componentInstance.bookId = bookId;
        dialogRef.componentInstance.title = title;

        return dialogRef.afterClosed();
    }
}
