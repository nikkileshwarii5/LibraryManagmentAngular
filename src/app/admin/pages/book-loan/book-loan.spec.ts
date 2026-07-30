import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLoan } from './book-loan';

describe('BookLoan', () => {
  let component: BookLoan;
  let fixture: ComponentFixture<BookLoan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookLoan],
    }).compileComponents();

    fixture = TestBed.createComponent(BookLoan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
