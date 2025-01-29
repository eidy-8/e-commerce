import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRegularComponent } from './header-regular.component';

describe('HeaderRegularComponent', () => {
  let component: HeaderRegularComponent;
  let fixture: ComponentFixture<HeaderRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderRegularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
