import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSkeleton } from './book-skeleton';

describe('BookSkeleton', () => {
  let component: BookSkeleton;
  let fixture: ComponentFixture<BookSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(BookSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
