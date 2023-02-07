import { ProjectsService } from './../../../../data/services/projects.service';
import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-programs',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  programs?: any[];

  constructor(private programService: ProjectsService) {}

  ngOnInit() {
    this.programService
      .get()
      .pipe(first())
      .subscribe((users) => (this.programs = users.data));
  }

  deleteUser(id: number) {
    const user = this.programs!.find((x) => x.id === id);
    user.isDeleting = true;
    this.programService
      .delete(id)
      .pipe(first())
      .subscribe(
        () => (this.programs = this.programs!.filter((x) => x.id !== id))
      );
  }
}
