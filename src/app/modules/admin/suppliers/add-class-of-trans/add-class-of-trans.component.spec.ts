import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassOfTransComponent } from './add-class-of-trans.component';

describe('AddClassOfTransComponent', () => {
  let component: AddClassOfTransComponent;
  let fixture: ComponentFixture<AddClassOfTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClassOfTransComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClassOfTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
