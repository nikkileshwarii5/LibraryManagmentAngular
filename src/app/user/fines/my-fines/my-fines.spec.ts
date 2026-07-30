import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFines } from './my-fines';

describe('MyFines', () => {
  let component: MyFines;
  let fixture: ComponentFixture<MyFines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFines],
    }).compileComponents();

    fixture = TestBed.createComponent(MyFines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
