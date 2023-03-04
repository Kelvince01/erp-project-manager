import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { ConfigService } from '@services/config.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() visibleSidebar1: boolean = true;
  // @Input() visibleSidebar1: any;
  user?: IUser | null;

  constructor(
    private accountService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private config: ConfigService
  ) {
    this.user = this.accountService.userValue as any;

    // this.visibleSidebar1 = config.toggleSidebar()!;
  }

  ngOnInit(): void {
    // console.log(this.visibleSidebar1);
  }
}
