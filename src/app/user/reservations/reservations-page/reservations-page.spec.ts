import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsPage } from './reservations-page';

describe('ReservationsPage', () => {
  let component: ReservationsPage;
  let fixture: ComponentFixture<ReservationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
