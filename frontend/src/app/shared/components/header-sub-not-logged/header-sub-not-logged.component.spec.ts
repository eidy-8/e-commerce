import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSubNotLoggedComponent } from './header-sub-not-logged.component';

describe('HeaderSubNotLoggedComponent', () => {
  let component: HeaderSubNotLoggedComponent;
  let fixture: ComponentFixture<HeaderSubNotLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderSubNotLoggedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderSubNotLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
