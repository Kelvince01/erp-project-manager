import { Component } from '@angular/core';
import { IUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-navbar',
  template: `
    <nav
      class="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top"
    >
      <h4 class="ml-4">Onster Group ERP PM</h4>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a routerLink="/user/projects" class="nav-link">Projects</a>
        </li>
        <li class="nav-item">
          <a routerLink="/user/suppliers" class="nav-link">Create Expense</a>
        </li>
        <li class="nav-item">
          <a routerLink="/user/suppliers" class="nav-link">Pay Bill</a>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            type="button"
            pButton
            (click)="menu.toggle($event)"
          >
            <img
              class="img-profile rounded-circle"
              src="assets/images/boy.png"
              style="max-width: 60px"
            />
            <span class="ml-2 d-none d-lg-inline text-white small"
              >{{ user?.FirstName }} {{ user?.Surname }}</span
            >
          </button>
          <p-menu
            #menu
            [popup]="true"
            [model]="items"
            class="shadow animated--grow-in"
          >
          </p-menu>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items: MenuItem[] = [];
  user?: IUser | null;

  constructor(
    private accountService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.user = this.accountService.userValue as any;
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.logOut();
        },
      },
    ];
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
