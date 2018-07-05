import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { LoginComponent } from './login.component';

@Injectable()
export class LoginDialogService {

    constructor(private dialog: MatDialog) { }

    login(): Observable<string> {
        let dialogRef: MatDialogRef<LoginComponent>;
        dialogRef = this.dialog.open(LoginComponent);

        return dialogRef.afterClosed();
    }

}
