import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatSnackBar } from '@angular/material';

import { SettingsService } from '../services/settings.service';
import { ConfigModel } from '../models/config';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  configs: ConfigModel[];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<SettingComponent>,
    private settingService: SettingsService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.settingService.getConfig().subscribe(configData => {
      this.configs = configData;
    });
  }

  saveSettings() {
    this.settingService.updateConfig(this.configs).subscribe((res: any) => {
      if (res.message === 'Done!') {
        this.bottomSheetRef.dismiss();
        this.snackBar.open(res.message, 'Yayy! :D', {
          duration: 3000
        });
      }
    });
  }

  changeConfig(configKey, configValue) {
    const configToBeChanged = this.configs.find(c => c.key === configKey);
    const newConfig = configToBeChanged;
    newConfig.value = configValue;
    const indexOfConfig = this.configs.indexOf(configToBeChanged);
    this.configs[indexOfConfig] = newConfig;
  }

  cancelChanges() {
    this.bottomSheetRef.dismiss();
  }

}
