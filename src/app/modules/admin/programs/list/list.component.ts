import { Component, ElementRef, ViewChild } from '@angular/core';
import { IProject } from '@models/project.model';
import { ProjectsService } from '@services/projects.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

// import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-list-programs',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;
  programs!: IProject[];
  isDeleting = false;

  constructor(
    private programService: ProjectsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}
