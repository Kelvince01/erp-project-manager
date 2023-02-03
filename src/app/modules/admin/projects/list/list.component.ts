import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  users?: any[];

  constructor(private accountService: AuthService) {}

  ngOnInit() {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }

  deleteUser(id: number) {
    const user = this.users!.find((x) => x.id === id);
    user.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.users = this.users!.filter((x) => x.id !== id)));
  }
}
