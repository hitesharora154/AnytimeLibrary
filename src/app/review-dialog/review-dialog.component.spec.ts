import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDialogComponent } from './review-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatSliderModule, MatDialogRef } from '@angular/material';

class MockDialogRef {
    close(dialogResult) { }
}

describe('ReviewDialogComponent', () => {
    let component: ReviewDialogComponent;
    let fixture: ComponentFixture<ReviewDialogComponent>;
    let mockDialogRef: MockDialogRef;

    beforeEach(async(() => {
        mockDialogRef = new MockDialogRef();
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatButtonModule,
                MatInputModule,
                MatFormFieldModule,
                MatDialogModule,
                MatSliderModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef }
            ],
            declarations: [ReviewDialogComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReviewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
