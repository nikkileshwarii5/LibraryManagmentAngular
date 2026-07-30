import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFineStats } from './my-fine-stats';

describe('MyFineStats', () => {
  let component: MyFineStats;
  let fixture: ComponentFixture<MyFineStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFineStats],
    }).compileComponents();

    fixture = TestBed.createComponent(MyFineStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
