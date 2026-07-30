import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLoans } from './current-loans';

describe('CurrentLoans', () => {
  let component: CurrentLoans;
  let fixture: ComponentFixture<CurrentLoans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentLoans],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentLoans);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
