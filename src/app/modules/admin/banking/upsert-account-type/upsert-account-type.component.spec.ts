import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertAccountTypeComponent } from './upsert-account-type.component';

describe('UpsertAccountTypeComponent', () => {
  let component: UpsertAccountTypeComponent;
  let fixture: ComponentFixture<UpsertAccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertAccountTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
