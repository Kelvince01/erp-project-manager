import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveDebitNoteComponent } from './receive-debit-note.component';

describe('ReceiveDebitNoteComponent', () => {
  let component: ReceiveDebitNoteComponent;
  let fixture: ComponentFixture<ReceiveDebitNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveDebitNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveDebitNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
