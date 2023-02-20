import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveRefundComponent } from './receive-refund.component';

describe('ReceiveRefundComponent', () => {
  let component: ReceiveRefundComponent;
  let fixture: ComponentFixture<ReceiveRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
