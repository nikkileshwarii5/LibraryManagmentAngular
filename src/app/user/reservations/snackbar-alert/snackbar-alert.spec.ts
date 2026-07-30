import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarAlert } from './snackbar-alert';

describe('SnackbarAlert', () => {
  let component: SnackbarAlert;
  let fixture: ComponentFixture<SnackbarAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarAlert],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarAlert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
