import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeDialog } from './subscribe-dialog';

describe('SubscribeDialog', () => {
  let component: SubscribeDialog;
  let fixture: ComponentFixture<SubscribeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribeDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
