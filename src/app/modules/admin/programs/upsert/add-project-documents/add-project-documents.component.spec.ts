import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectDocumentsComponent } from './add-project-documents.component';

describe('AddProjectDocumentsComponent', () => {
  let component: AddProjectDocumentsComponent;
  let fixture: ComponentFixture<AddProjectDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProjectDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
