import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSubscriptionCard } from './active-subscription-card';

describe('ActiveSubscriptionCard', () => {
  let component: ActiveSubscriptionCard;
  let fixture: ComponentFixture<ActiveSubscriptionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveSubscriptionCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveSubscriptionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
