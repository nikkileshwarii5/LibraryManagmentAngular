import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSubscriptionDialog } from './cancel-subscription-dialog';

describe('CancelSubscriptionDialog', () => {
  let component: CancelSubscriptionDialog;
  let fixture: ComponentFixture<CancelSubscriptionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelSubscriptionDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelSubscriptionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
