import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTabs } from './reservation-tabs';

describe('ReservationTabs', () => {
  let component: ReservationTabs;
  let fixture: ComponentFixture<ReservationTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
