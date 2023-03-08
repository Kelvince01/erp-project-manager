import { IUser } from '@models/user.model';
import { UserService } from 'src/app/data/services/user.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, first } from 'rxjs';
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

declare var window: any;
@Component({
  selector: 'app-list-users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  users$ = this.store.pipe(select(selectUsers))! as any;
  users: IUser[] = [];
  // users: IUser[] = [];
  // messages$: Observable<any[]>;
  // users2$!: Observable<any[]>;
  displayDialog: any;
  userForDialog: any;
  // clonedUsers: { [s: string]: IUser } = {};

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private usersService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    // // get messages from data service
    // this.messages$ = usersService.messages$().pipe(
    //   // our data is paginated, so map to .data
    //   map((m: Paginated<any>) => m.data),
    //   // reverse the messages array, to have the most recent message at the end
    //   // necessary because we get a descendingly sorted array from the data service
    //   map((m: Array<any>) => m.reverse()),
    // );
    // get users from data service
    // this.users$ = usersService.users$().pipe(
    // this.users$ = usersService.users$().subscribe(
    //   // our data is paginated, so map to .data
    //   map((u: Paginated<any>) => u.data)
    // );
  }

  ngOnInit(): void {
    this.getUsers();

    this.store.dispatch(invokeUsersAPI());
    // console.log(globalThis);
    // console.log(this.users);
  }

  getUsers() {
    this.usersService
      .users$()
      .pipe(first())
      .subscribe((res: any) => {
        this.users = res.data;
        // console.log(this.users);
      });
  }

  onUserAdd() {}
  onRowEditInit(data: any) {
    // this.clonedUsers[data.name] = { ...data };
  }
  onRowEditSave(data: any) {
    // this.usersService.update(data).subscribe((data) => {
    //   this.ngOnInit();
    //   alert('User Updated successfully.');
    // });
  }
  onRowEditCancel(data: any) {
    // this.users$[index] = this.clonedUsers[data.name];
    // delete this.clonedUsers[data.name];
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
