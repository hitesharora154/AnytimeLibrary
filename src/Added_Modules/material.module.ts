import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatCardModule,
        MatProgressBarModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatTableModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatCardModule,
        MatProgressBarModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatTableModule
    ]
})
export class MaterialModule { }
