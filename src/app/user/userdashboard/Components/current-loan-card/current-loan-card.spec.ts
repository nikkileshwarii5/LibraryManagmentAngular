import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLoanCard } from './current-loan-card';

describe('CurrentLoanCard', () => {
  let component: CurrentLoanCard;
  let fixture: ComponentFixture<CurrentLoanCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentLoanCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentLoanCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
