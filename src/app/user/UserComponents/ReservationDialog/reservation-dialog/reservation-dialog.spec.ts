import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDialog } from './reservation-dialog';

describe('ReservationDialog', () => {
  let component: ReservationDialog;
  let fixture: ComponentFixture<ReservationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
