import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePayrollDependantsComponent } from './add-employee-payroll-dependants.component';

describe('AddEmployeePayrollDependantsComponent', () => {
  let component: AddEmployeePayrollDependantsComponent;
  let fixture: ComponentFixture<AddEmployeePayrollDependantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeePayrollDependantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeePayrollDependantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
