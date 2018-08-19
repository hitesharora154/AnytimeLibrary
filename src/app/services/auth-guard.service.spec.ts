import { AuthGuard } from './auth-guard.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('Auth Guard Service', () => {
    let authGuard: AuthGuard;
    let fixture: ComponentFixture<AuthGuard>;
    const router = {
        navigate: jasmine.createSpy('navigate')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AuthGuard
            ],
            providers: [
                AuthGuard,
                { provide: Router, useValue: router }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthGuard);
        authGuard = fixture.componentInstance;
    });


    // it('should be able to allow access', () => {
    //     sessionStorage.setItem('role', 'customer');
    //     expect(authGuard.canActivate()).toBe(true);
    // });

    // it('should be able to deny acccess', () => {
    //     sessionStorage.clear();
    //     expect(authGuard.canActivate()).toBe(false);
    // });
});
