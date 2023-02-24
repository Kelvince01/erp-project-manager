import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertTitleComponent } from './upsert-title.component';

describe('UpsertTitleComponent', () => {
  let component: UpsertTitleComponent;
  let fixture: ComponentFixture<UpsertTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
