import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterRegularComponent } from './footer-regular.component';

describe('FooterRegularComponent', () => {
  let component: FooterRegularComponent;
  let fixture: ComponentFixture<FooterRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterRegularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
