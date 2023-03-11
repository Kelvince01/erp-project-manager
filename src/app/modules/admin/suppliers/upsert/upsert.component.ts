import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ISupplier } from '@models/supplier.model';
import { ITitle } from '@models/title.model';
import { EmployeesService } from '@services/employees.service';
import { TitlesService } from '@services/titles.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  titles!: ITitle[];
  supplier: ISupplier;
  submitted: boolean = false;

  constructor(
    private titlesService: TitlesService,
    private supplierService: EmployeesService,
    private messageService: MessageService
  ) {
    this.supplier = {} as ISupplier;
    this.supplier.isSupplier = true;
  }

  ngOnInit(): void {
    this.getTitles();
  }

  saveSupplier(form: NgForm) {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.supplierService
      .create(this.supplier)
      .pipe(first())
      .subscribe((res: any) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Supplier Saved!',
        });
      });
  }

  getTitles() {
    return this.titlesService
      .titles$()
      .pipe(first())
      .subscribe((res) => {
        this.titles = res.data;
      });
  }
}
