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
    MatTableModule,
    MatSortModule,
    MatSliderModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatBottomSheetModule
} from '@angular/material';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatTooltipModule } from '@angular/material/tooltip';

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
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSliderModule,
        MatTooltipModule,
        MatTabsModule,
        MatMenuModule,
        MatToolbarModule,
        MatBottomSheetModule
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
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSliderModule,
        MatTooltipModule,
        MatTabsModule,
        MatMenuModule,
        MatToolbarModule,
        MatBottomSheetModule
    ]
})
export class MaterialModule { }
