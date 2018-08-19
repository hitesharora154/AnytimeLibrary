import { ComponentFixture, async, TestBed, getTestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material';

import { ReviewDialogService } from './review-dialog.service';
import { ReviewDialogComponent } from './review-dialog.component';

class MockDialog {
    open(component): MatDialogRef<ReviewDialogComponent> {
        return new MatDialogRef<ReviewDialogComponent>(null, null);
    }
}

describe('Review Dialog service', () => {
    // let injector: TestBed;
    let dialogService: ReviewDialogService;
    let fixture: ComponentFixture<ReviewDialogService>;
    let mockDialog: MockDialog;

    beforeEach(async(() => {
        mockDialog = new MockDialog();
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule
            ],
            providers: [
                ReviewDialogService,
                { provide: MatDialog, useValue: mockDialog }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        // injector = getTestBed();
        // dialogService = injector.get(ReviewDialogService);
        fixture = TestBed.createComponent(ReviewDialogService);
        dialogService = fixture.componentInstance;
    });

    // it('should be able to submit review', () => {
    //     dialogService.submitReview('the title', 32, 3232, 33);
    // });
});
