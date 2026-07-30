import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStats } from './reservation-stats';

describe('ReservationStats', () => {
  let component: ReservationStats;
  let fixture: ComponentFixture<ReservationStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationStats],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
