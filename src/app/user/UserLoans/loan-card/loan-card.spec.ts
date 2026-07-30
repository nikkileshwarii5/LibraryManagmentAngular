import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCard } from './loan-card';

describe('LoanCard', () => {
  let component: LoanCard;
  let fixture: ComponentFixture<LoanCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
