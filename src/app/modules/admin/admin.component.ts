import { Component, EventEmitter, Output } from '@angular/core';
import { IUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { ConfigService } from '@services/config.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  visibleSidebar1: any;
  items: MenuItem[] = [];
  user?: IUser | null;
  // @Input() visibleSidebar1: boolean = false;
  // @Output() visibleSidebar1 = new EventEmitter<any>();

  constructor(
    private config: ConfigService,
    private accountService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    // this.visibleSidebar1 = config.showSideBar;
    this.user = this.accountService.userValue as any;
  }

  // fwdMsgToSib2($event: any) {
  //   this.visibleSidebar1 = $event;
  // }

  ngOnInit(): void {
    // console.log(this.visibleSidebar1);
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
    this.visibleSidebar1 = true;
    // this.config.toggleSidebar(this.visibleSidebar1);
    // this.visibleSidebar1.emit(true);
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
