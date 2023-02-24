import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public showSideBar: boolean = false;

  constructor() {
    // console.log(this.showSideBar);
  }

  public toggleSidebar(status?: boolean) {
    return status;
    // this.showSideBar = status;
    // console.log(status);
  }
}
