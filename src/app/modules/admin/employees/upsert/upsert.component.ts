import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '@models/employee.model';
import { EmployeesService } from '@services/employees.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  product: IEmployee = {};
  submitted: boolean = false;
  statuses: any[] = [];
  title!: string;
  form!: FormGroup;
  id?: string;
  loading = false;
  submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: EmployeesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.title = 'Add Employee';

    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
    });

    if (this.id) {
      // edit mode
      this.title = 'Edit User';
      this.loading = true;
      this.productService
        .getById(Number(this.id))
        .then(first())
        .then((x) => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.FirstName!.trim()) {
      if (this.product.EmployeeID) {
        //
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        // this.product.id = this.createId();
        // this.product.image = 'product-placeholder.svg';
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }
    }
  }

  Cancel() {}

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
