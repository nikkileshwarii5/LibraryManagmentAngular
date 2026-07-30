import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addtestimonals } from './addtestimonals';

describe('Addtestimonals', () => {
  let component: Addtestimonals;
  let fixture: ComponentFixture<Addtestimonals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addtestimonals],
    }).compileComponents();

    fixture = TestBed.createComponent(Addtestimonals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
