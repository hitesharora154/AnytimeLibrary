import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashboardComponent } from './customer-dashboard.component';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBookingsComponent } from '../view-bookings/view-bookings.component';

@Component({
    selector: 'app-view-bookings',
    template: ''
})

class MockViewBookingComponent {
    sortChanged = jasmine.createSpy('sortChanged').and.returnValue(null);
}

describe('CustomerDashboardComponent', () => {
    let component: CustomerDashboardComponent;
    let fixture: ComponentFixture<CustomerDashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatTabsModule,
                BrowserAnimationsModule
            ],
            declarations: [
                CustomerDashboardComponent,
                MockViewBookingComponent
            ],
            providers: [
                { provide: ViewBookingsComponent, useValue: MockViewBookingComponent }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load Bookings', () => {
        component.loadBookings();
        expect(component.bookingComponent.sortChanged).toHaveBeenCalled();
    });
});
