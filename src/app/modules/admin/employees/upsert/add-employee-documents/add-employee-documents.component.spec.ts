import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeDocumentsComponent } from './add-employee-documents.component';

describe('AddEmployeeDocumentsComponent', () => {
  let component: AddEmployeeDocumentsComponent;
  let fixture: ComponentFixture<AddEmployeeDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
