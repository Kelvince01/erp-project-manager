import { IUser } from '@models/user.model';
import { UserService } from 'src/app/data/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, first } from 'rxjs';
import { selectAppState } from 'src/app/data/selectors/app.selector';
import { setAPIStatus } from 'src/app/data/stores/app.action';
import { Appstate } from 'src/app/data/stores/appstate';
import { selectUsers } from 'src/app/data/users/user.selector';
import {
  invokeUsersAPI,
  invokeDeleteUserAPI,
} from 'src/app/data/users/users.action';
import { Paginated } from '@feathersjs/feathers';
import { ConfirmationService, MessageService } from 'primeng/api';

// declare var window: any;
@Component({
  selector: 'app-list-users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users$ = this.store.pipe(select(selectUsers))! as any;
  users: IUser[] = [];
  displayDialog: any;
  userForDialog: any;
  clonedUsers: { [s: string]: IUser } = {};

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private usersService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getUsers();

    this.store.dispatch(invokeUsersAPI());
    // console.log(globalThis);
  }

  getUsers() {
    this.usersService
      .users$()
      .pipe(
        first(),
        map((m: Paginated<any>) => m.data),
        map((m: Array<any>) => m.reverse())
      )
      .subscribe((res: any) => {
        this.users = res;
      });
  }

  saveUser() {}

  deleteUser(user: IUser) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.FirstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(
          invokeDeleteUserAPI({
            id: Number(user.UsersID),
          })
        );
        let apiStatus$ = this.appStore.pipe(select(selectAppState));
        apiStatus$.subscribe((apState) => {
          if (apState.apiStatus == 'success') {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: '' },
              })
            );
          }
        });
        this.getUsers();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Deleted',
          life: 3000,
        });
      },
    });
  }
}
