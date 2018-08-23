import { AuthGuard } from './auth-guard.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

class MockRouter {
    navigate(commands: any[], extras?) {

    }
}

describe('Auth Guard Service', () => {
    let authGuard: AuthGuard;
    let fixture: ComponentFixture<AuthGuard>;
    let mockRouter: MockRouter;

    beforeEach(async(() => {
        mockRouter = new MockRouter();
        TestBed.configureTestingModule({
            imports: [
                RouterModule
            ],
            declarations: [
                AuthGuard
            ],
            providers: [
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthGuard);
        authGuard = fixture.componentInstance;
    });


    // it('should be able to allow access', () => {
    //     sessionStorage.setItem('role', 'customer');
    //     authGuard.canActivate();
    // });

    // it('should be able to deny acccess', () => {
    //     sessionStorage.clear();
    //     authGuard.canActivate();
    // });
});
