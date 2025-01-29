import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSubLoggedComponent } from './header-sub-logged.component';

describe('HeaderSubLoggedComponent', () => {
  let component: HeaderSubLoggedComponent;
  let fixture: ComponentFixture<HeaderSubLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderSubLoggedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderSubLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
