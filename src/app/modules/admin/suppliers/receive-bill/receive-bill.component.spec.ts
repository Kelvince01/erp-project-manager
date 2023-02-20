import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveBillComponent } from './receive-bill.component';

describe('ReceiveBillComponent', () => {
  let component: ReceiveBillComponent;
  let fixture: ComponentFixture<ReceiveBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
