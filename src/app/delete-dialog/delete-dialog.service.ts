import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

import { DeleteDialogComponent } from './delete-dialog.component';

@Injectable()
export class DeleteDialogService {

    constructor(private dialog: MatDialog) { }

    confirm(title: string, message: string): Observable<boolean> {
        let dialogRef: MatDialogRef<DeleteDialogComponent>;

        dialogRef = this.dialog.open(DeleteDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
