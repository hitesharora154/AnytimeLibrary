import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingComponent } from './setting.component';
import { MatBottomSheetRef, MatSnackBar, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { SettingsService } from '../services/settings.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfigModel } from '../models/config';
import { Observable } from 'rxjs';

const settingsArray: ConfigModel[] = [
    new ConfigModel(
        'users can issue',
        '2',
        ''
    )
];

class MockBottomSheetRef {
    dismiss() { }
}

class MockSettingsService {
    updateConfig(config): Observable<any> {
        return Observable.of({ message: 'Done!' });
    }
    getConfig(): Observable<ConfigModel[]> {
        return Observable.of(new Array<ConfigModel>());
    }
}

class MockSnackBar {
    open(message, action, config?) { }
}

describe('SettingComponent', () => {
    let component: SettingComponent;
    let fixture: ComponentFixture<SettingComponent>;
    let mockBottomSheetRef: MockBottomSheetRef;
    let mockSettingsService: MockSettingsService;
    let mockSnackBar: MockSnackBar;

    beforeEach(async(() => {
        mockBottomSheetRef = new MockBottomSheetRef();
        mockSettingsService = new MockSettingsService();
        mockSnackBar = new MockSnackBar();
        TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                MatButtonModule,
                MatInputModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
                { provide: SettingsService, useValue: mockSettingsService },
                { provide: MatSnackBar, useValue: mockSnackBar }
            ],
            declarations: [SettingComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        mockSettingsService.getConfig().subscribe(result => {
            expect(component).toBeTruthy();
        });
    });

    it('should Save Settings', () => {
        const spy = spyOn(mockSnackBar, 'open');
        component.saveSettings();
        expect(spy.calls.first().args[0]).toBe('Done!');
    });

    it('should change Config', () => {
        spyOn(mockSettingsService, 'getConfig').and.returnValue(Observable.of(settingsArray));
        component.ngOnInit();
        component.changeConfig(settingsArray[0].key, '4');
        expect(component.configs[0].value).toBe('4');
    });

    it('should cancel changes', () => {
        spyOn(mockBottomSheetRef, 'dismiss');
        component.cancelChanges();
        expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
    });
});
