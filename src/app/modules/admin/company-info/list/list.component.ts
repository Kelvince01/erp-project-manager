import { Appstate } from 'src/app/data/stores/appstate';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCompanyInfos } from '@company-store/company-info.selector';

@Component({
  selector: 'app-list-company-info',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  first = 0;
  rows = 10;

  constructor(private store: Store, private appStore: Store<Appstate>) {}

  companyInfo$ = this.store.pipe(select(selectCompanyInfos));

  //****************PrimeNG DataTable Pagination method Start*********************** */
  //***************Reference: https://primefaces.org/primeng/showcase/#/table/page********** */
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
    // return this.companyInfo$
    //   ? this.first === this.companyInfo$.length - this.rows
    //   : true;
    return true;
  }
  isFirstPage(): boolean {
    return this.companyInfo$ ? this.first === 0 : true;
  }
  //****************PrimeNG DataTable Pagination Method End*********************** */
  // ********************CompanyInfo To Remove CompanyInfo from CompanyInfo List*************************/
  remove(id: number) {
    // this.companyInfoService.removeCompanyInfo(id);
    // this.companyInfo$ = this.companyInfoService.getCompanyInfos();
  }
}
