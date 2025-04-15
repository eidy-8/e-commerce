import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidableMenuComponent } from './slidable-menu.component';

describe('SlidableMenuComponent', () => {
  let component: SlidableMenuComponent;
  let fixture: ComponentFixture<SlidableMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlidableMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlidableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
