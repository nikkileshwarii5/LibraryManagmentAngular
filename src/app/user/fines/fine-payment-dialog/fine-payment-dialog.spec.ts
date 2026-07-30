import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinePaymentDialog } from './fine-payment-dialog';

describe('FinePaymentDialog', () => {
  let component: FinePaymentDialog;
  let fixture: ComponentFixture<FinePaymentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinePaymentDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(FinePaymentDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
