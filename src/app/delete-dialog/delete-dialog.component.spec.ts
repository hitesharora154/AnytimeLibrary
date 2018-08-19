import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from './delete-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule, MatDialogRef } from '@angular/material';

class MockMatDialogRef {
    close(dialogResult) { }
}

describe('DeleteDialogComponent', () => {
    let component: DeleteDialogComponent;
    let fixture: ComponentFixture<DeleteDialogComponent>;
    let mockMatDialogRef: MockMatDialogRef;

    beforeEach(async(() => {
        mockMatDialogRef = new MockMatDialogRef();
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                MatDialogModule,
                MatButtonModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: mockMatDialogRef }
            ],
            declarations: [DeleteDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
