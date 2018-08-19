import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { SocialUser, AuthService } from 'angular-6-social-login';
import { User } from '../models/user';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginDialogService } from '../login/login-dialog.service';
import { Router } from '@angular/router';
import { MatBottomSheet, MatSnackBar, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

const socialUser: SocialUser = {
    id: '34e',
    name: 'huihui',
    email: 'efsef',
    image: 'fefesf',
    provider: 'google'
};

const userArray: User[] = [
    {
        id: socialUser.id,
        name: socialUser.name,
        email: socialUser.email,
        imageUrl: socialUser.image
    }
];

class MockSocialAuthService {
    signIn(providerId): Promise<SocialUser> {
        return Promise.resolve(socialUser);
    }
}

class MockUserService {
    getUsers(): Observable<User[]> {
        return Observable.of(new Array<User>());
    }
    addUser(user: User): Observable<any> {
        return Observable.of({ message: 'Done' });
    }
}

class MockSnackBar {
    open(message, action, config?) { }
}

class MockLoginDialogService {
    login(): Observable<any> {
        return Observable.of({ message: 'Welcome' });
    }
}

class MockRouter {
    navigate(commands, extras?) { }
}

class MockBottomSheet {
    open(component) { }
}

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;
    let mockAuthSerive: MockSocialAuthService;
    let mockUserService: MockUserService;
    let mockSnackBar: MockSnackBar;
    let mockLoginDialogService: MockLoginDialogService;
    let mockRouter: MockRouter;
    let mockBottomSheet: MockBottomSheet;

    beforeEach(async(() => {
        mockAuthSerive = new MockSocialAuthService();
        mockUserService = new MockUserService();
        mockSnackBar = new MockSnackBar();
        mockLoginDialogService = new MockLoginDialogService();
        mockRouter = new MockRouter();
        mockBottomSheet = new MockBottomSheet();

        TestBed.configureTestingModule({
            imports: [
                MatToolbarModule,
                MatButtonModule,
                MatMenuModule,
                MatIconModule,
                BrowserAnimationsModule
            ],
            declarations: [NavigationComponent],
            providers: [
                { provide: AuthService, useValue: mockAuthSerive },
                { provide: UserService, useValue: mockUserService },
                { provide: MatSnackBar, useValue: mockSnackBar },
                { provide: LoginDialogService, useValue: mockLoginDialogService },
                { provide: Router, useValue: mockRouter },
                { provide: MatBottomSheet, useValue: mockBottomSheet }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirectToHomePage for admin', () => {
        sessionStorage.setItem('role', 'admin');
        const spy = spyOn(mockRouter, 'navigate');
        component.redirectToHomePage();
        expect(spy.calls.first().args[0][0]).toBe('admin');
        sessionStorage.clear();
        component.redirectToHomePage();
    });

    it('should redirectHomePage for customer', () => {
        const spy = spyOn(mockRouter, 'navigate');
        sessionStorage.setItem('role', 'customer');
        component.redirectToHomePage();
        expect(spy.calls.first().args[0][0]).toBe('customer');
    });

    it('should do admin signIn', () => {
        component.adminSignIn();
        expect(sessionStorage.getItem('role')).toBe('admin');
    });

    it('should be able to signIn with social for new user', () => {
        component.signIn();
        expect(sessionStorage.getItem('role')).not.toBeNull();
    });

    it('should be able to signIn with social for existing user', () => {
        spyOn(mockUserService, 'getUsers').and.returnValue(Observable.of(userArray));
        component.signIn();
        expect(sessionStorage.getItem('role')).not.toBeNull();
    });
});
