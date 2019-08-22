import { Injectable } from "@angular/core";
import { Settings } from "../model/settings";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: true
  };
  constructor() {}

  getSettings(): Settings {
    return this.settings;
  }
}
