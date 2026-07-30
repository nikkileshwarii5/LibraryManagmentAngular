import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDrawer } from './sidebar-drawer';

describe('SidebarDrawer', () => {
  let component: SidebarDrawer;
  let fixture: ComponentFixture<SidebarDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarDrawer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
