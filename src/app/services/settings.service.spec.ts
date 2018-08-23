import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { SettingsService } from './settings.service';
import { environment } from '../../environments/environment.prod';
import { ConfigModel } from '../models/config';

describe('SettingsService', () => {
    let injector: TestBed;
    let service: SettingsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SettingsService]
        });
        injector = getTestBed();
        service = injector.get(SettingsService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('#getSettings', () => {
        it('should return an Observable<Config[]>', () => {
            const dummySettings = [
                {
                    key: 'renewalDays',
                    value: 7,
                    label: 'Number of days for renewal interval'
                },
                {
                    key: 'issueLimit',
                    value: 3,
                    label: 'Maximum number of books issued by a user'
                }
            ];

            service.getConfig().subscribe(configs => {
                expect(configs.length).toBe(2);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'config');
            expect(req.request.method).toBe('GET');
            req.flush(dummySettings);
        });

        it('should return an empty array', () => {
            service.getConfig().subscribe(configs => {
                expect(configs.length).toBe(0);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'config');
            expect(req.request.method).toBe('GET');
            req.flush(null);
        });
    });

    describe('#changeSetting', () => {
        it('should return a done message', () => {
            const dummyRespone = {
                message: 'Done!'
            };

            const dummySettings: ConfigModel[] = [
                new ConfigModel(
                    'issueLimit',
                    3,
                    'Maximum number of books issued by a user'
                )
            ];

            service.updateConfig(dummySettings).subscribe(response => {
                expect(response).toEqual(dummyRespone);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'config');
            expect(req.request.method).toBe('PUT');
            req.flush(dummyRespone);
        });
    });
});
