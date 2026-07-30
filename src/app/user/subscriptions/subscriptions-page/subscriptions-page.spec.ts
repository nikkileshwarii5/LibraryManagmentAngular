import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsPage } from './subscriptions-page';

describe('SubscriptionsPage', () => {
  let component: SubscriptionsPage;
  let fixture: ComponentFixture<SubscriptionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
