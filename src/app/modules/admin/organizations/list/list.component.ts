import { ICompanyInfo } from '@models/company-info.model';
import { first, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { selectCompanyInfos } from '@company-store/company-info.selector';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/data/stores/appstate';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CompanyInfoService } from '@services/company-info.service';

@Component({
  selector: 'app-list-organizations',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  first = 0;
  rows = 10;
  organizations$!: ICompanyInfo[];
  isDeleting = false;

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private orgService: CompanyInfoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.getOrgs();
  }

  getOrgs() {
    return this.orgService
      .companies$()
      .pipe(first())
      .subscribe((res) => {
        this.organizations$ = res.data;
      });
  }

  // companyInfo$: Observable<any> = this.store.pipe(select(selectCompanyInfos));

  next() {
    this.first = this.first + this.rows;
  }
  prev() {
    this.first = this.first - this.rows;
  }
  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.organizations$
      ? this.first === this.organizations$.length - this.rows
      : true;
  }
  isFirstPage(): boolean {
    return this.organizations$ ? this.first === 0 : true;
  }

  remove(project: ICompanyInfo) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + project.CompanyName + ' company ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isDeleting = true;
        this.orgService.delete(project.CompanyID!).pipe(first()).subscribe();
        this.isDeleting = false;
        this.getOrgs();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Project Deleted',
          life: 3000,
        });
      },
    });
  }
}
