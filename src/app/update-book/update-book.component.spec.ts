import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookComponent } from './update-book.component';
import { MatFormFieldModule, MatSelectModule, MatButtonModule, MatDialogRef, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../models/book';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockDialogRef {
    close(dialogResult) { }
}

describe('UpdateBookComponent', () => {
    let component: UpdateBookComponent;
    let fixture: ComponentFixture<UpdateBookComponent>;
    let mockDialogRef: MockDialogRef;

    beforeEach(async(() => {
        mockDialogRef = new MockDialogRef();
        TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                FormsModule,
                ReactiveFormsModule,
                MatSelectModule,
                MatButtonModule,
                MatInputModule,
                BrowserAnimationsModule
            ],
            declarations: [UpdateBookComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateBookComponent);
        component = fixture.componentInstance;
        component.book = new Book(1, 'The book', 3, 'some author', 10);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update', () => {
        component.ngOnInit();
        component.titleForm.value = 'the book';
        component.categoryForm.value = 3;
        component.authorForm.value = 'the author';
        component.availabilityForm.value = 3;
        spyOn(mockDialogRef, 'close');
        component.update();
        expect(mockDialogRef.close).toHaveBeenCalled();
    });
});
