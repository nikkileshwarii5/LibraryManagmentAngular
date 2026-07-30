import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFineCard } from './my-fine-card';

describe('MyFineCard', () => {
  let component: MyFineCard;
  let fixture: ComponentFixture<MyFineCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFineCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MyFineCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
