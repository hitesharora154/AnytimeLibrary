import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigModel } from '../models/config';
import { environment } from '../../environments/environment';

@Injectable()
export class SettingsService {

    constructor(private http: HttpClient) { }

    getConfig(): Observable<ConfigModel[]> {
        return this.http.get<ConfigModel[]>(environment.apiUrl + 'config')
            .pipe(map((configArray: Array<any>) => {
                const configsResult: Array<ConfigModel> = [];
                if (configArray) {
                    configArray.forEach((config) => {
                        configsResult.push(new ConfigModel(
                            config.key,
                            config.value,
                            config.label
                        ));
                    });
                }
                return configsResult;
            }));
    }

    updateConfig(configs: ConfigModel[]) {
        return this.http.put(environment.apiUrl + 'config', configs);
    }

}
