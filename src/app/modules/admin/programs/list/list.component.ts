import { Component } from '@angular/core';
import { IProject } from '@models/project.model';
import { AuthService } from '@services/auth.service';
import { ProjectsService } from '@services/projects.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-programs',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  programs: IProject[] = [];
  isDeleting = false;

  constructor(private programService: ProjectsService) {}

  ngOnInit() {
    this.programService
      .get()
      .pipe(first())
      .subscribe((programs) => (this.programs = programs.data));
  }

  deleteUser(id: number) {
    const program = this.programs!.find((x) => x.ProjectID === id);
    this.isDeleting = true;
    this.programService
      .delete(id)
      .pipe(first())
      .subscribe(
        () => (this.programs = this.programs!.filter((x) => x.ProjectID !== id))
      );
    this.isDeleting = false;
  }
}
