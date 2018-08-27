import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(private snackBar: MatSnackBar) { }

    handleError(error: any): void {
        if (error instanceof HttpErrorResponse) {
            const httpError = error as HttpErrorResponse;
            if (httpError.status === 0 && !error.ok) {
                this.snackBar.open('Can\'t peform the action in offline mode', 'Aww :(', {
                    duration: 5000
                });
            }
            console.error(error);
        } else {
            console.error(error);
        }
    }

}
