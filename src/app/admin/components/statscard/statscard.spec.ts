import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statscard } from './statscard';

describe('Statscard', () => {
  let component: Statscard;
  let fixture: ComponentFixture<Statscard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statscard],
    }).compileComponents();

    fixture = TestBed.createComponent(Statscard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
