import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertBankComponent } from './upsert-bank.component';

describe('UpsertBankComponent', () => {
  let component: UpsertBankComponent;
  let fixture: ComponentFixture<UpsertBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
