import { Component } from '@angular/core';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  visibleSidebar1: any;

  constructor(private config: ConfigService) {
    // this.visibleSidebar1 = config.showSideBar;
  }

  fwdMsgToSib2($event: any) {
    this.visibleSidebar1 = $event;
  }

  ngOnInit(): void {
    // console.log(this.visibleSidebar1);
  }
}
