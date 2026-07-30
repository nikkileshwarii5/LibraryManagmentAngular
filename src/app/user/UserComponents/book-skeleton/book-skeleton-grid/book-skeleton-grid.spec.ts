import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSkeletonGrid } from './book-skeleton-grid';

describe('BookSkeletonGrid', () => {
  let component: BookSkeletonGrid;
  let fixture: ComponentFixture<BookSkeletonGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSkeletonGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(BookSkeletonGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
