import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public showSideBar: boolean = false;

  constructor() {
    console.log(this.showSideBar);
  }

  toggleSidebar(status: boolean) {
    this.showSideBar = status;
  }
}
