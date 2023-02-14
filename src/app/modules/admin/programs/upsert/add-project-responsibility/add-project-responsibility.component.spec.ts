import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectResponsibilityComponent } from './add-project-responsibility.component';

describe('AddProjectResponsibilityComponent', () => {
  let component: AddProjectResponsibilityComponent;
  let fixture: ComponentFixture<AddProjectResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectResponsibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProjectResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
