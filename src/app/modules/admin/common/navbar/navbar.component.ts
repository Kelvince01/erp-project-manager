import { DataTableConstants } from './../../../../utilities/constants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

// import * as $ from 'jquery';
import { IUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { ConfigService } from '@services/config.service';

// window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  user?: IUser | null;
  // @Input() visibleSidebar1: boolean = false;
  @Output() visibleSidebar1 = new EventEmitter<any>();

  constructor(
    private accountService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private config: ConfigService
  ) {
    this.user = this.accountService.userValue as any;

    // this.visibleSidebar1 = config.showSideBar;
  }

  ngOnInit(): void {
    // DataTableConstants.showSideBar = this.visibleSidebar1;
    this.items = [
      // {
      //   label: 'Profile',
      //   icon: 'pi pi-fw pi-profile',
      //   url: 'http://angular.io',
      // },
      // {
      //   label: 'Settings',
      //   icon: 'pi pi-fw pi-settings',
      //   url: 'http://angular.io',
      // },
      // {
      //   label: 'Activity Log',
      //   icon: 'pi pi-fw pi-list',
      //   url: 'http://angular.io',
      // },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.logOut();
        },
      },
    ];
  }

  toggleSidebar() {
    // this.visibleSidebar1 = true;
    // this.config.toggleSidebar(this.visibleSidebar1);
    this.visibleSidebar1.emit(true);
    // console.log(this.visibleSidebar1);
  }

  logOut() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to logout? ',
      header: 'Ohh No!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.logOut();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Logged Out',
          life: 3000,
        });
      },
    });
  }
}

/*
<a class="dropdown-item" href="#">
            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Profile
          </a>
          <a class="dropdown-item" href="#">
            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
            Settings
          </a>
          <a class="dropdown-item" href="#">
            <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
            Activity Log
          </a>
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            href="javascript:void(0);"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>*/
