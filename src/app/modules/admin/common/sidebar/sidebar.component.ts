import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input()
  visibleSidebar1: boolean = false;

  ngOnInit(): void {
    // console.log(this.visibleSidebar1);
  }
}
