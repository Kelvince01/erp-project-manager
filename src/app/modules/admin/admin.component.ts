import { DataTableConstants } from './../../utilities/constants';
import { Component } from '@angular/core';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  visibleSidebar1;

  constructor(private config: ConfigService) {
    this.visibleSidebar1 = config.showSideBar;
  }

  ngOnInit(): void {
    console.log(this.visibleSidebar1);
  }
}
