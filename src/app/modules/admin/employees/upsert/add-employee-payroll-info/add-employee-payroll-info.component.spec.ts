import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePayrollInfoComponent } from './add-employee-payroll-info.component';

describe('AddEmployeePayrollInfoComponent', () => {
  let component: AddEmployeePayrollInfoComponent;
  let fixture: ComponentFixture<AddEmployeePayrollInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeePayrollInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeePayrollInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
