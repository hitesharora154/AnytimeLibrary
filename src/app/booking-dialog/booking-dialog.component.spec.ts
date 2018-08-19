import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDialogComponent } from './booking-dialog.component';
import { MatDialogRef, MatButtonModule, MatFormFieldModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockMatDialogRef {
    close(dialogResult) { }
}

describe('BookingDialogComponent', () => {
    let component: BookingDialogComponent;
    let fixture: ComponentFixture<BookingDialogComponent>;
    let mockMatDialogRef: MockMatDialogRef;

    beforeEach(async(() => {
        mockMatDialogRef = new MockMatDialogRef();
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatInputModule,
                BrowserAnimationsModule
            ],
            declarations: [BookingDialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockMatDialogRef }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
