import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogRef } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockMatDialogRef {
    close(dialogResult?) { }
}

class MockAuthService {
    authenticate(body) { }
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockDialog: MockMatDialogRef;
    let mockAuthService: MockAuthService;

    beforeEach(async(() => {
        mockDialog = new MockMatDialogRef();
        mockAuthService = new MockAuthService();
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatButtonModule,
                BrowserAnimationsModule
            ],
            declarations: [LoginComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockDialog },
                { provide: AuthService, useValue: mockAuthService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
