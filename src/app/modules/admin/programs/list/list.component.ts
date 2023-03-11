import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IProject } from '@models/project.model';
import { FilesService } from '@services/files.service';
import { ProjectsService } from '@services/projects.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-programs',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  programs!: IProject[];
  isDeleting = false;

  constructor(
    private programService: ProjectsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileService: FilesService
  ) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    return this.programService
      .projects$()
      .pipe(first())
      .subscribe((programs: any) => (this.programs = programs.data));
  }

  deleteProject(project: IProject) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + project.ProjectName + ' project ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isDeleting = true;
        this.programService
          .delete(project.ProjectID!)
          .pipe(first())
          .subscribe();
        this.isDeleting = false;
        this.getPrograms();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Project Deleted',
          life: 3000,
        });
      },
    });
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('pdfTable');

    this.fileService.openPdf(DATA, 'Programs List');
  }
}
